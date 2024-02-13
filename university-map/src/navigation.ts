import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { supportedLocales } from './i18n';

export const localePrefix = 'always';

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  '/': '/',
  '/university/[country]/[university]': {
    'en': '/university/[country]/[university]',
    'zh-TW': '/university/[country]/[university]'
  }
};

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales: supportedLocales,
    pathnames,
    localePrefix
  });
