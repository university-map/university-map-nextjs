'use client';
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { locale, country, university } = useParams();

  useEffect(() => {
    const newRoute = `/${encodeURIComponent(locale as string || 'en')}/university/${encodeURIComponent(country as string || 'Taiwan')}/${encodeURIComponent(university as string || 'National Cheng Kung University')}`;
    router.replace(newRoute);
  }, [country, locale, university, router]);

  return (
    <main></main>
  );
}
