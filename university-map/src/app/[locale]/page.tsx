'use client'
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import DataLoader from '@/services/DataLoader';
import { UniversityInfo } from '@/services/models';

const InfoCard = dynamic(() => import('@/components/InfoCard/InfoCard'), { ssr: false });
const Map = dynamic(() => import('@/components/Map/Map'), { ssr: false })

class SelectedUniversity {
  constructor(
    public country: string,
    public name: string,
  ) {}
}

export default function Home() {
  const [selectedUniv, setSelectedUniv] = useState(new UniversityInfo());
  const dataLoader = DataLoader.getInstance();
  const updateSelectedUniv = async (country: string, universityName: string): Promise<void> => {
    const univInfo = await dataLoader.getUnivInfo(country, universityName);
    setSelectedUniv(univInfo);
  };

  useEffect(() => {
    const defaultCountry = 'Taiwan';
    const defaultUniversity = 'National Cheng Kung University';
    updateSelectedUniv(defaultCountry, defaultUniversity);
  }, []);

  return (
    <main>
      <InfoCard universityInfo={selectedUniv} />
      <Map onMarkerClick={updateSelectedUniv} />
    </main>
  )
}
