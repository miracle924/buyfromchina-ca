import Link from 'next/link';
import { getDictionary } from '@/lib/i18n';

export default function NotFound() {
  const copy = getDictionary().notFound;

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-2">
        <p className="text-sm font-medium text-primary">404</p>
        <h1 className="text-3xl font-semibold text-gray-900">{copy.title}</h1>
        <p className="text-sm text-gray-600">{copy.description}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          {copy.home}
        </Link>
        <Link
          href="/admin"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {copy.admin}
        </Link>
      </div>
    </main>
  );
}
