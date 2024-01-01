'use client'
import dynamic from 'next/dynamic'
import styles from './page.module.css'

const Map = dynamic(() => import('../components/Map'), { ssr: false })

export default function Home() {
  return (
    <main>
      <div className={styles.box}> Hello World</div>
      <Map />
    </main>
  )
}
