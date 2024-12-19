import { useEffect, useState } from 'react'
import styles from './answerForm.module.scss'
import { handleSubmit } from './utils/handleSubmit'
import { useQuizzContext } from '@/contexts/QuizzContext'
import InputText from './InputText/InputText'
import BtnShowResult from './BtnShowResult/BtnShowResult'
import InputRadio from './InputRadio/InputRadio'
import Button from '@/components/button/Button'

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
  const [quizzType, setQuizzType] = useState<'text' | 'radio'>('text')

  useEffect(() => {
    // Switch quiz type randomly
    const switchQuizzType = () => {
      setQuizzType(Math.random() > 0.5 ? 'text' : 'radio')
    }
    switchQuizzType()
  }, [currentQuestionIndex, showResults])

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
          {quizzType === 'text' ? (
            <InputText
              answer={answer}
              setAnswer={setAnswer}
              isWrongAnswer={isWrongAnswer}
            />
          ) : (
            <InputRadio
              answer={answer}
              setAnswer={setAnswer}
              isWrongAnswer={isWrongAnswer}
              questionsList={questionsList}
              currentQuestionIndex={currentQuestionIndex}
            />
          )}
          <Button type='submit' className={styles.quizz_button}>
            Submit
          </Button>
        </>
      ) : (
        <BtnShowResult setIsOver={setIsOver} />
      )}
    </form>
  )
}
