'use client'
import { useParams } from 'next/navigation'
import { useQuizzContext } from '@/contexts/QuizzContext'
import { Question } from '@/types/types'
import { useFilteredQuestions } from '@/hooks/useFilteredQuestions'
import Link from 'next/link'
import Button from '@/components/button/Button'
import Quizz from '@/components/quizz/Quizz'
import { useEffect } from 'react'

export default function QuizzPage() {
  const { theme } = useParams<{ theme: string }>()
  const { start, setStart, setquestionsList, setSelectedTheme, resetQuiz } =
    useQuizzContext()

  const ListQuestions: Question[] = useFilteredQuestions(theme, 5)

  useEffect(() => {
    setSelectedTheme(theme)
    setquestionsList(ListQuestions)
  }, [ListQuestions, setSelectedTheme, setquestionsList, theme])

  return (
    <main>
      <h1> {theme}&apos;s quizz </h1>
      {!start ? (
        <Button onClick={() => setStart(!start)}>Start Quizz</Button>
      ) : (
        <Quizz />
      )}
      <Link href='/' onClick={resetQuiz}>
        Go back to home
      </Link>
    </main>
  )
}
