import DisplayQuestion from './DisplayQuestion/DisplayQuestion'
import AnswerForm from './AnswerForm/AnswerForm'
import DisplayWrongAnswer from './DisplayWrongAnswer/DisplayWrongAnswer'
import styles from '../quizz.module.scss'
import { useState } from 'react'

interface QuizzDivProps {
  alphabetTheme: boolean
  setIsOver: (value: boolean) => void
}

export default function QuizzDiv({ alphabetTheme, setIsOver }: QuizzDivProps) {
  const [isWrongAnswer, setIsWrongAnswer] = useState<boolean>(false)

  return (
    <div className={styles.quizz_div}>
      <DisplayQuestion />
      {!isWrongAnswer ? (
        <AnswerForm
          isWrongAnswer={isWrongAnswer}
          setIsWrongAnswer={setIsWrongAnswer}
          alphabetTheme={alphabetTheme}
          setIsOver={setIsOver}
        />
      ) : (
        <DisplayWrongAnswer
          alphabetTheme={alphabetTheme}
          setIsWrongAnswer={setIsWrongAnswer}
        />
      )}
    </div>
  )
}
