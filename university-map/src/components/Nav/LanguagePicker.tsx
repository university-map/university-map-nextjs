import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Paper, Select } from '@mantine/core';
import { usePathname, useRouter } from '@/navigation';


const languages: { [locale: string]: string; } = {
  'en': 'English',
  'zh-TW': '正體中文'
};

const LanguagePicker: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const params = useParams();
  const updateLanguage = async (language: string): Promise<void> => {
    const newLocale = Object.keys(languages).find((key) => languages[key] === language);
    router.replace({pathname, params: params as any}, {locale: newLocale});
  };

  return (
    <Paper>
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
    </Paper>
  );
};

export default LanguagePicker;
