import { useState } from 'react'
import styles from './answerForm.module.scss'
import { handleSubmit } from './utils/handleSubmit'
import { useQuizzContext } from '@/contexts/QuizzContext'
import InputText from './InputText/InputText'
import BtnShowResult from './BtnShowResult/BtnShowResult'

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
    score,
    setScore,
    showResults,
    setShowResults,
  } = useQuizzContext()
  const [answer, setAnswer] = useState<string>('')

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
        <InputText
          answer={answer}
          setAnswer={setAnswer}
          isWrongAnswer={isWrongAnswer}
        />
      ) : (
        <BtnShowResult setIsOver={setIsOver} />
      )}
    </form>
  )
}
