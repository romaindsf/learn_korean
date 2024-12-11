import { ChangeEvent, FormEvent } from 'react'
import Button from '@/components/button/Button'
import styles from '../quizz.module.scss'

interface AnswerFormProps {
  answer: string
  isFoodCategory: boolean
  isWrongAnswer: boolean
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}
export const AnswerForm: React.FC<AnswerFormProps> = ({
  answer,
  isFoodCategory,
  isWrongAnswer,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='answer'>Answer:</label>
      <input
        type='text'
        id='answer'
        name='answer'
        value={answer}
        onChange={handleChange}
        className={`${isFoodCategory ? styles.food_input : ''} ${
          isWrongAnswer ? styles.wrong_input : ''
        }`}
        {...(isWrongAnswer ? { readOnly: true } : {})}
      />
      <Button type='submit' className={styles.quizz_button}>
        Submit
      </Button>
    </form>
  )
}
