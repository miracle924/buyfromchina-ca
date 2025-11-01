'use client';

import { useState, useTransition } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
};

export function AdminLoginForm() {
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams?.get('email') ?? '';
  const externalError = searchParams?.get('error');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState<Record<string, unknown> | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      email: emailFromQuery
    }
  });

  const onSubmit = handleSubmit((data) => {
    setError(null);
    setDebug(null);

    startTransition(async () => {
      try {
        const result = await signIn('credentials', {
          ...data,
          redirect: false,
          callbackUrl: '/admin/quotes'
        });

        setDebug({ result });

        if (result?.error) {
          setError(result.error);
          return;
        }

        const destination =
          result?.url && result.url.startsWith('http')
            ? new URL(result.url).pathname + new URL(result.url).search
            : result?.url ?? '/admin/quotes';

        router.replace(destination);
      } catch (err) {
        console.error(err);
        setDebug({ error: err });
        setError('Unable to sign in. Please try again.');
      }
    });
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit();
      }}
      className="space-y-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Admin email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email', { required: 'Email is required.' })}
          className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          required
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register('password', { required: 'Password is required.' })}
          className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          required
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
      </div>
      <button type="submit" className="btn-primary w-full" disabled={isPending}>
        {isPending ? 'Signing in…' : 'Sign in'}
      </button>
      <p className="text-xs text-gray-500">
        Authorized use only. Contact the site owner if you need administrative access.
      </p>
      {(error ?? externalError) && (
        <p className="text-sm text-red-600">{error ?? 'Incorrect email or password.'}</p>
      )}
      {debug && process.env.NODE_ENV !== 'production' && (
        <pre className="rounded bg-gray-100 p-3 text-left text-xs text-gray-600">
          {JSON.stringify(debug, null, 2)}
        </pre>
      )}
    </form>
  );
}
