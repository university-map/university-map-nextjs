import createMiddleware from 'next-intl/middleware';
import { supportedLocales } from './i18n';

export default createMiddleware({
  locales: supportedLocales,
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/', '/(en|zh-TW)/:path*']
};
