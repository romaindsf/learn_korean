'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import data from '@/data/data.json'
import { Question } from '@/types/types'
import Link from 'next/link'
import styles from './page.module.scss'

export default function QuizzPage() {
  const { theme } = useParams<{ theme: string }>()
  const [showNbQuestions, setShowNbQuestions] = useState<boolean>(false)
  const [arrayCategoryQuestion, setArrayCategoryQuestion] = useState<string[]>(
    []
  )
  const [quizzStarted, setQuizzStarted] = useState<boolean>(false)
  useEffect(() => {
    const filteredQuestions = data
      .filter((question: Question) => question.theme === theme)
      .map((question: Question) => question.theme)
    setArrayCategoryQuestion(filteredQuestions)
  }, [theme])

  return (
    <>
      <h1> {theme}&apos;s quizz </h1>
      {!quizzStarted && (
        <button
          type='button'
          className={styles.start_button}
          onClick={() => setQuizzStarted(!quizzStarted)}
        >
          Start Quizz
        </button>
      )}
      {quizzStarted && (
        <button
          type='button'
          className={styles.start_button}
          onClick={() => setQuizzStarted(!quizzStarted)}
        >
          Stop Quizz
        </button>
      )}
      <div className={styles.buttonContainer}>
        <button
          type='button'
          onClick={() => setShowNbQuestions(!showNbQuestions)}
        >
          {showNbQuestions
            ? arrayCategoryQuestion.length
            : 'Show how many questions are available'}
        </button>
        <Link href='/'>Go back to home</Link>
      </div>
    </>
  )
}
