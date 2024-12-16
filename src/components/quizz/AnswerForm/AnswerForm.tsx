import { useEffect, useRef, useState } from 'react'
import Button from '@/components/button/Button'
import styles from './answerForm.module.scss'
import { handleSubmit, handleChange } from '../utils/utils'
import { useQuizzContext } from '@/contexts/QuizzContext'

interface AnswerFormProps {
  isWrongAnswer: boolean
  setIsWrongAnswer: (value: boolean) => void
  alphabetTheme: boolean
  setIsOver: (value: boolean) => void
}
export function AnswerForm({
  isWrongAnswer,
  setIsWrongAnswer,
  alphabetTheme,
  setIsOver,
}: AnswerFormProps) {
  const {
    questionsList,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedTheme,
    score,
    setScore,
  } = useQuizzContext()
  const [answer, setAnswer] = useState<string>('')
  const foodTheme: boolean = selectedTheme === 'food'
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      className={styles.quizz_form}
      onSubmit={(e) =>
        handleSubmit(
          e,
          answer,
          setAnswer,
          setIsWrongAnswer,
          alphabetTheme,
          questionsList,
          currentQuestionIndex,
          score,
          setScore,
          setCurrentQuestionIndex,
          setIsOver
        )
      }
    >
      <label htmlFor='answer'>Answer:</label>
      <input
        type='text'
        id='answer'
        name='answer'
        value={answer}
        onChange={(e) => handleChange(e, setAnswer)}
        // Add the 'food_input' class if the theme is 'food'
        className={`${foodTheme ? styles.food_input : ''} ${
          isWrongAnswer ? styles.wrong_input : ''
        }`}
        ref={inputRef}
        // Disable the input field if the answer is wrong
        {...(isWrongAnswer ? { readOnly: true } : {})}
      />
      <Button type='submit' className={styles.quizz_button}>
        Submit
      </Button>
    </form>
  )
}
