import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const supportedLocales = ['en', 'zh-TW'];
export const languages: { [locale: string]: string; } = {
  'en': 'English',
  'zh-TW': '正體中文'
};

export default getRequestConfig(async ({ locale }) => {
  if (!supportedLocales.includes(locale as any)) {
    notFound();
  }

  return {
    messages: (await import(`@/locales/${locale}.json`)).default
  };
});
