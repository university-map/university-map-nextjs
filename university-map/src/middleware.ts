import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['en', 'zh-TW'],
  defaultLocale: 'en'
});
 
export const config = {
  matcher: ['/', '/(en|zh-TW)/:path*']
};