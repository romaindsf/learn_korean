import React from 'react'
import Button from '@/components/button/Button'
import styles from '../quizz.module.scss'
import { useQuizzContext } from '@/contexts/QuizzContext'
import { useFocus } from '@/hooks/useFocus'

export default function ResultDiv({
  handleRetry,
}: {
  handleRetry: () => void
}) {
  const { score, questionsList } = useQuizzContext()
  const buttonRef = useFocus<HTMLButtonElement>()
  return (
    <div className={styles.quizz_div}>
      <h2>
        Your score is: {score} / {questionsList.length}
      </h2>
      <Button onClick={handleRetry} ref={buttonRef}>
        Retry
      </Button>
    </div>
  )
}
