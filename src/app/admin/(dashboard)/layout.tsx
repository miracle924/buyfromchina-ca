import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

const navLinks = [
  { href: '/admin/quotes', label: 'Quotes' },
  { href: '/admin/orders', label: 'Orders' }
];

export default async function AdminDashboardLayout({ children }: PropsWithChildren) {
  const session = await auth();
  if (!session?.user) {
    redirect('/admin/login');
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-lg font-semibold text-gray-900">
            BuyFromChina.ca Admin
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium text-gray-600">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-primary">
                {link.label}
              </Link>
            ))}
          </nav>
          <form action="/api/auth/signout" method="post">
            <input type="hidden" name="callbackUrl" value="/admin/login" />
            <button
              type="submit"
              className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {children}
      </main>
    </div>
  );
}
