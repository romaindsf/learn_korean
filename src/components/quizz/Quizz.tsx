import React from 'react'
import { useQuiz } from '@/hooks/useQuiz'
import ResultsDiv from './ResultsDiv/ResultsDiv'
import styles from './quizz.module.scss'
import QuizzDiv from './QuizzDiv/QuizzDiv'
import { useQuizzContext } from '@/contexts/QuizzContext'

export default function Quizz({ theme }: { theme: string }) {
  const { questionsList } = useQuizzContext()
  const { isOver, setIsOver, alphabetTheme, handleRetry } = useQuiz(theme)

  return (
    <div className={styles.main_content}>
      {isOver ? (
        <ResultsDiv handleRetry={handleRetry} />
      ) : (
        <>
          {!questionsList || questionsList.length === 0 ? (
            <p>No questions available.</p>
          ) : (
            <QuizzDiv alphabetTheme={alphabetTheme} setIsOver={setIsOver} />
          )}
        </>
      )}
    </div>
  )
}
