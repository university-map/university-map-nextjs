import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Select } from '@mantine/core';
import { usePathname, useRouter } from '@/navigation';
import { languages } from '@/i18n';

const LanguagePicker: React.FC = () => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const updateLanguage = async (language: string): Promise<void> => {
    const newLocale = Object.keys(languages).find((key) => languages[key] === language);
    if (pathname !== '/university/[country]/[university]') {
      // For routes with parametes:
      // router.replace({pathname, params: params as any}, {locale: newLocale});
      router.replace(pathname, {locale: newLocale});
      return;
    }

    // '', 'en', 'university', '[country]', '[university]'
    const segments = decodeURI(window.location.pathname).split('/');
    router.replace({pathname, params: {country: segments[3], university: segments[4] }}, {locale: newLocale});
  };

  return (
    <Select
      comboboxProps={{ withinPortal: false, offset: 0, }}
      radius='xs'
      checkIconPosition='left'
      maxDropdownHeight={150}
      data={Object.values(languages)}
      dropdownOpened
      placeholder=''
      defaultValue={languages[locale as string]}
      onChange={(value) => updateLanguage(value as string)}
    />
  );
};

export default LanguagePicker;
