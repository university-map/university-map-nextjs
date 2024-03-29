'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useLocale } from 'next-intl';
import InfoCard from '@/components/InfoCard/InfoCard';
import DataLoader from '@/services/DataLoader';
import { UniversityInfo } from '@/services/models';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Home() {
  const locale = useLocale();
  const params = useParams();
  const [selectedUniv, setSelectedUniv] = useState(new UniversityInfo());
  const dataLoader = DataLoader.getInstance();

  const updateRoute = async (country: string, universityName: string): Promise<void> => {
    const univInfo = await dataLoader.getUnivInfo(country, universityName, locale);
    setSelectedUniv(univInfo);
    const newRoute = `/${encodeURIComponent(locale)}/university/${encodeURIComponent(country)}/${encodeURIComponent(universityName)}`;

    // https://github.com/vercel/next.js/discussions/48110
    window.history.pushState(null, '', newRoute);
  };

  useEffect(() => {
    dataLoader.getUnivInfo(decodeURI(params.country as string), decodeURI(params.university as string), locale)
      .then((res) => setSelectedUniv(res));
  }, [params.country, params.university, locale, dataLoader]);

  return (
    <main>
      <InfoCard universityInfo={selectedUniv} />
      <Map onMarkerClick={updateRoute} />
    </main>
  );
}
