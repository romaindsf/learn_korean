import Button from '@/components/button/Button'
import styles from '../quizz.module.scss'

interface WrongAnswerDisplayProps {
  correctAnswer: string
  description?: string
  onNext: () => void
}

export const WrongAnswerDisplay: React.FC<WrongAnswerDisplayProps> = ({
  correctAnswer,
  description,
  onNext,
}) => {
  return (
    <div className={styles.wrong_answer}>
      <p className={styles.correct_answer}>
        The correct answer was: {correctAnswer}
      </p>
      {description && <p>{description}</p>}
      <Button className={styles.quizz_button} onClick={onNext}>
        Next
      </Button>
    </div>
  )
}
