import { ChangeEvent, FormEvent } from 'react'
import Button from '@/components/button/Button'
import styles from './answerForm.module.scss'

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
    <form className={styles.quizz_form} onSubmit={handleSubmit}>
      <label htmlFor='answer'>Answer:</label>
      <input
        type='text'
        id='answer'
        name='answer'
        value={answer}
        onChange={handleChange}
        // Add the 'food_input' class if the theme is 'food'
        className={`${isFoodCategory ? styles.food_input : ''} ${
          isWrongAnswer ? styles.wrong_input : ''
        }`}
        // Disable the input field if the answer is wrong
        {...(isWrongAnswer ? { readOnly: true } : {})}
      />
      <Button type='submit' className={styles.quizz_button}>
        Submit
      </Button>
    </form>
  )
}
