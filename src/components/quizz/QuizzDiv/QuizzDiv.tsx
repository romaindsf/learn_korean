import DisplayQuestion from '../DisplayQuestion/DisplayQuestion'
import AnswerForm from '../AnswerForm/AnswerForm'
import DisplayWrongAnswer from '../DisplayWrongAnswer/DisplayWrongAnswer'
import styles from '../quizz.module.scss'

interface QuizzDivProps {
  isWrongAnswer: boolean
  setIsWrongAnswer: (value: boolean) => void
  alphabetTheme: boolean
  setIsOver: (value: boolean) => void
}

export default function QuizzDiv({
  isWrongAnswer,
  setIsWrongAnswer,
  alphabetTheme,
  setIsOver,
}: QuizzDivProps) {
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
