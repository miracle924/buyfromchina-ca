import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AdminLoginForm } from '@/components/admin-login-form';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Admin sign in | BuyFromChina.ca'
};

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect('/admin/quotes');
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <Link href="/" className="text-lg font-semibold text-gray-900">
            BuyFromChina.ca
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-gray-900">Admin sign in</h1>
          <p className="mt-1 text-sm text-gray-600">Enter the credentials provided to you.</p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
