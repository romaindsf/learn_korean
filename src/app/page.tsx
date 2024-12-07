'use client'
import { useEffect, useState } from 'react'
import styles from './_page.module.scss'
import data from '@/data/data.json'
import ThemeDiv from '@/components/ThemeDiv/ThemeDiv'

interface Theme {
  theme: string
}

export default function Home() {
  const [themes, setThemes] = useState<string[]>([])

  useEffect(() => {
    // Extract unique themes from the data
    const uniqueThemes = Array.from(
      new Set(data.map((item: Theme) => item.theme))
    )
    setThemes(uniqueThemes)
  }, [])

  return (
    <main>
      <h1>learn Korean!</h1>
      <div className={styles.main_content}>
        <h2>Choose a theme</h2>
        <ThemeDiv themes={themes} />
      </div>
    </main>
  )
}