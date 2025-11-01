import NextAuth, { type NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { env } from '@/env';

const verifyPassword = async (input: string, secret: string) => {
  if (secret.startsWith('$2')) {
    return bcrypt.compare(input, secret);
  }
  return input === secret;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const emailInput = credentials?.email?.trim().toLowerCase();
        const passwordInput = credentials?.password ?? '';

        if (!emailInput || !passwordInput) {
          return null;
        }

        if (emailInput !== env.ADMIN_EMAIL.toLowerCase()) {
          return null;
        }

        const isValid = await verifyPassword(passwordInput, env.ADMIN_PASSWORD);
        if (!isValid) {
          return null;
        }

        return {
          id: 'admin',
          email: env.ADMIN_EMAIL,
          name: 'Administrator'
        };
      }
    })
  ],
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = 'admin';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string | undefined;
        session.user.email = env.ADMIN_EMAIL;
        session.user.name = 'Administrator';
      }
      return session;
    }
  },
  pages: {
    signIn: '/admin/login'
  }
};

export const auth = () => getServerSession(authOptions);

export const { handlers: authHandlers, signIn, signOut } = NextAuth(authOptions);
