import React from 'react'
import Button from '@/components/button/Button'
import styles from './displayWrongAnswer.module.scss'
import { useEffect, useRef } from 'react'
import { useQuizzContext } from '@/contexts/QuizzContext'

export const DisplayWrongAnswer: React.FC<{
  alphabetTheme: boolean
  setIsWrongAnswer: (value: boolean) => void
}> = ({ alphabetTheme, setIsWrongAnswer }) => {
  const { questionsList, currentQuestionIndex, setCurrentQuestionIndex } =
    useQuizzContext()
  const correctAnswer: string = alphabetTheme
    ? questionsList[currentQuestionIndex].romanisation || ''
    : questionsList[currentQuestionIndex].english || ''
  const description = questionsList[currentQuestionIndex].description

  function onNext() {
    setIsWrongAnswer(false)
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus()
    }
  }, [])

  return (
    <div className={styles.wrong_answer}>
      <p className={styles.correct_answer}>
        The correct answer was: {correctAnswer}
      </p>
      {description && <p>{description}</p>}
      <Button className={styles.quizz_button} onClick={onNext} ref={buttonRef}>
        Next
      </Button>
    </div>
  )
}
