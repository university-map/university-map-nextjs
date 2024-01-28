'use client'
import dynamic from 'next/dynamic'
import InfoCard from '@/components/InfoCard/InfoCard'

const Map = dynamic(() => import('@/components/Map/Map'), { ssr: false })

export default function Home() {
  return (
    <main>
      <InfoCard />
      <Map />
    </main>
  )
}
