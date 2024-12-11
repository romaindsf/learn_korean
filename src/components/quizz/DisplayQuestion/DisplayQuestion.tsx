import styles from './displayQuestion.module.scss'

interface QuestionDisplayProps {
  questionNumber: number
  korean: string
}

export const DisplayQuestion: React.FC<QuestionDisplayProps> = ({
  questionNumber,
  korean,
}) => {
  return (
    <div className={styles.question}>
      <h2>question n°{questionNumber}:</h2>
      <h3>{korean}</h3>
    </div>
  )
}
