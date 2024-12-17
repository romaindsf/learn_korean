import { useQuizzContext } from '@/contexts/QuizzContext'
import styles from './displayQuestion.module.scss'

export default function DisplayQuestion() {
  const { questionsList, currentQuestionIndex } = useQuizzContext()
  return (
    <div className={styles.question}>
      <h2>question n°{currentQuestionIndex}:</h2>
      <h3>{questionsList[currentQuestionIndex].korean}</h3>
    </div>
  )
}
