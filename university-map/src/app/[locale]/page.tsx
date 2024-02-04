'use client'
import dynamic from 'next/dynamic'
import InfoCard from '@/components/InfoCard/InfoCard'

const Map = dynamic(() => import('@/components/Map/Map'), { ssr: false })

export default function Home() {
  const onMarkerClick = (content: string): void => {};

  return (
    <main>
      <InfoCard />
      <Map onMarkerClick={onMarkerClick} />
    </main>
  )
}
