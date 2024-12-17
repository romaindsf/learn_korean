'use client'
import { useQuizzContext } from '@/contexts/QuizzContext'
import styles from './page.module.scss'
import Link from 'next/link'
import Button from '@/components/button/Button'
import Quizz from '@/components/quizz/Quizz'
import SelectLengthQuizz from '@/components/SelectLengthQuizz/SelectLengthQuizz'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export default function QuizzPage() {
  const { theme } = useParams<{ theme: string }>()

  const { start, setStart, setSelectedTheme, resetQuiz } = useQuizzContext()

  useEffect(() => {
    setSelectedTheme(theme)
  }, [setSelectedTheme, theme])

  if (!theme) {
    return <p>Loading...</p>
  }
  return (
    <main>
      <h1> {theme}&apos;s quizz </h1>
      {!start ? (
        <div className={styles.main_content}>
          <SelectLengthQuizz />
          <Button onClick={() => setStart(!start)}>Start Quizz</Button>
        </div>
      ) : (
        <div className={styles.main_content}>
          <Quizz theme={theme} />
        </div>
      )}
      <Link href='/' onClick={resetQuiz} className={styles.goBackLink}>
        Go back to home
      </Link>
    </main>
  )
}
