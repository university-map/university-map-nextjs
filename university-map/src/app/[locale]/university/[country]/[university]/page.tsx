'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import DataLoader from '@/services/DataLoader';
import { UniversityInfo } from '@/services/models';


const InfoCard = dynamic(() => import('@/components/InfoCard/InfoCard'), { ssr: false });
const Map = dynamic(() => import('@/components/Map/Map'), { ssr: false })

export default function Home() {
  const { locale, country, university } = useParams();
  const [selectedUniv, setSelectedUniv] = useState(new UniversityInfo());
  const dataLoader = DataLoader.getInstance();

  const updateRoute = async (country: string, universityName: string): Promise<void> => {
    const univInfo = await dataLoader.getUnivInfo(country, universityName);
    setSelectedUniv(univInfo);
    const newRoute = `/${encodeURIComponent(locale as string)}/university/${encodeURIComponent(country)}/${encodeURIComponent(universityName)}`;

    // https://github.com/vercel/next.js/discussions/48110
    window.history.pushState(null, '', newRoute);
  };

  useEffect(() => {
    updateRoute(country as string, university as string);
  }, []);

  return (
    <main>
      <InfoCard universityInfo={selectedUniv} />
      <Map onMarkerClick={updateRoute} />
    </main>
  )
}
