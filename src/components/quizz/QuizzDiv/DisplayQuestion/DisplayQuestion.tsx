import { useQuizzContext } from '@/contexts/QuizzContext'
import styles from './displayQuestion.module.scss'

export default function DisplayQuestion() {
  const { questionsList, currentQuestionIndex } = useQuizzContext()
  return (
    <>
      {currentQuestionIndex <= questionsList.length - 1 && (
        <div className={styles.question}>
          <h2>question n°{currentQuestionIndex + 1}:</h2>
          <h3>{questionsList[currentQuestionIndex].korean}</h3>
        </div>
      )}
    </>
  )
}
