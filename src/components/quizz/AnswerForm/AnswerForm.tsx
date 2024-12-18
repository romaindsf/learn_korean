import { useState } from 'react'
import Button from '@/components/button/Button'
import styles from './answerForm.module.scss'
import { handleSubmit } from '../utils/utils'
import { useQuizzContext } from '@/contexts/QuizzContext'
import { useFocus } from '@/hooks/useFocus'

interface AnswerFormProps {
  isWrongAnswer: boolean
  setIsWrongAnswer: (value: boolean) => void
  alphabetTheme: boolean
  setIsOver: (value: boolean) => void
}
export default function AnswerForm({
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
    showResults,
    setShowResults,
  } = useQuizzContext()
  const [answer, setAnswer] = useState<string>('')
  const inputRef = useFocus<HTMLInputElement>()
  const buttonRef = useFocus<HTMLButtonElement>()
  const foodTheme: boolean = selectedTheme === 'food'

  return (
    <form
      className={styles.quizz_form}
      onSubmit={(event) =>
        handleSubmit({
          event,
          answer,
          setAnswer,
          setIsWrongAnswer,
          alphabetTheme,
          questionsList,
          currentQuestionIndex,
          score,
          setScore,
          setShowResults,
          setCurrentQuestionIndex,
        })
      }
    >
      {!showResults ? (
        <>
          <label htmlFor='answer'>Answer:</label>
          <input
            type='text'
            id='answer'
            name='answer'
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
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
        </>
      ) : (
        <Button
          type='button'
          className={styles.quizz_button}
          ref={buttonRef}
          onClick={() => setIsOver(true)}
        >
          Show Result
        </Button>
      )}
    </form>
  )
}
