'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.scss'
import { fetchQuestions } from '@/api/callAPI'
import { useQuizzContext } from '@/contexts/QuizzContext'
import ThemeDiv from '@/components/themeDiv/ThemeDiv'
import { Question } from '@/types/types'

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
        const uniqueThemes: string[] = Array.from(
          new Set(data.map((item: Question) => item.theme))
        )
        setThemes(uniqueThemes)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
          console.error(error)
        } else {
          setError('An unknown error occurred')
        }
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
