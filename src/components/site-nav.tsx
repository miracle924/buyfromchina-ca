'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useLanguage } from '@/components/language-provider';

type NavItem = {
  href: string;
  label: string;
  variant?: 'primary' | 'default' | 'ghost';
};

const matchPath = (pathname: string, href: string) => {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
};

const highlightByVariant: Record<NonNullable<NavItem['variant']>, string> = {
  primary: 'bg-gradient-to-r from-primary to-rose-500 shadow-sm shadow-primary/40',
  default: 'bg-gray-900/90 shadow-sm shadow-gray-900/20',
  ghost: ''
};

const inactiveTextByVariant: Record<NonNullable<NavItem['variant']>, string> = {
  primary: 'text-primary group-hover:text-white',
  default: 'text-gray-800 group-hover:text-white',
  ghost: 'text-gray-700 group-hover:text-primary'
};

const activeTextByVariant: Record<NonNullable<NavItem['variant']>, string> = {
  primary: 'text-white drop-shadow-sm',
  default: 'text-white drop-shadow-sm',
  ghost: 'text-primary'
};

const linkBaseClasses =
  'group relative inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

export function SiteNav() {
  const pathname = usePathname();
  const { dictionary } = useLanguage();
  const { nav } = dictionary;
  const navItems = useMemo<NavItem[]>(
    () => [
      { href: '/quote', label: nav.quote, variant: 'primary' },
      { href: '/about', label: nav.about },
      { href: '/faq', label: nav.faq },
      { href: '/contact', label: nav.contact }
    ],
    [nav]
  );

  return (
    <nav
      className="flex items-center gap-1.5 rounded-full border border-white/60 bg-white/80 px-2 py-1 shadow-lg shadow-gray-900/5 backdrop-blur supports-[backdrop-filter]:bg-white/60"
      aria-label="Primary"
    >
      {navItems.map(({ href, label, variant = 'default' }) => {
        const active = matchPath(pathname ?? '/', href);
        const highlight = highlightByVariant[variant] ?? highlightByVariant.default;
        const textClasses = clsx(
          'relative z-10 flex items-center gap-1.5',
          inactiveTextByVariant[variant] ?? inactiveTextByVariant.default,
          active ? activeTextByVariant[variant] ?? activeTextByVariant.default : null
        );

        return (
          <Link
            key={href}
            href={href}
            className={clsx(
              linkBaseClasses,
              active
                ? 'shadow-inner shadow-black/5'
                : 'hover:-translate-y-0.5 hover:shadow-md hover:shadow-gray-900/10'
            )}
            aria-current={active ? 'page' : undefined}
          >
            {highlight ? (
              <span
                aria-hidden
                className={clsx(
                  'absolute inset-0 rounded-full transition duration-300 ease-out',
                  highlight,
                  active ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                )}
              />
            ) : null}
            <span className={textClasses}>
              {label}
              {active ? <span className="h-1.5 w-1.5 rounded-full bg-white/80" aria-hidden /> : null}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
