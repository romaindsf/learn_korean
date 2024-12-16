'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.scss'
import { fetchQuestions } from '@/api/callAPI'
import { useQuizzContext } from '@/contexts/QuizzContext'
import ThemeDiv from '@/components/themeDiv/ThemeDiv'
import extractUniqueThemes from '@/utils/extractUniqueThemes'

export default function Home() {
  const { data, setData } = useQuizzContext()
  const [themes, setThemes] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all words from the API
        setData(await fetchQuestions())
        // Extract unique themes from the data
        setThemes(extractUniqueThemes(data))
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        )
        console.error(err)
      }
    }

    fetchData()
  }, [data, error, setData])

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
