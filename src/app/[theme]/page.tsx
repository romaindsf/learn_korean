'use client'
import { useParams } from 'next/navigation'
import { useQuizzContext } from '@/contexts/QuizzContext'
import { Question } from '@/types/types'
import styles from './page.module.scss'
import { useFilteredQuestions } from '@/hooks/useFilteredQuestions'
import Link from 'next/link'
import Button from '@/components/button/Button'
import Quizz from '@/components/quizz/Quizz'
import { useEffect } from 'react'
import SelectLengthQuizz from '@/components/selectLengthQuizz/SelectLengthQuizz'

export default function QuizzPage() {
  const { theme } = useParams<{ theme: string }>()
  const { start, setStart, setquestionsList, setSelectedTheme, resetQuiz } =
    useQuizzContext()

  const ListQuestions: Question[] = useFilteredQuestions(theme)

  useEffect(() => {
    setSelectedTheme(theme)
    setquestionsList(ListQuestions)
  }, [ListQuestions, setSelectedTheme, setquestionsList, theme])

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
          <Quizz />
        </div>
      )}
      <Link href='/' onClick={resetQuiz} className={styles.goBackLink}>
        Go back to home
      </Link>
    </main>
  )
}
