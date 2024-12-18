import { useQuizzContext } from '@/contexts/QuizzContext'
import styles from '../answerForm.module.scss'
import Button from '@/components/button/Button'
import { useFocus } from '@/hooks/useFocus'

export default function InputText({
  answer,
  setAnswer,
  isWrongAnswer,
}: {
  answer: string
  setAnswer: (value: string) => void
  isWrongAnswer: boolean
}) {
  const { selectedTheme } = useQuizzContext()
  const inputRef = useFocus<HTMLInputElement>()
  const foodTheme: boolean = selectedTheme === 'food'

  return (
    <>
      <label htmlFor='answer'>Answer:</label>
      <input
        type='text'
        id='answer'
        name='answer'
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        // Add the 'food_input' class if the theme is 'food'
        className={`${foodTheme ? styles.food_input : ''} ${
          isWrongAnswer ? styles.wrong_input : ''
        }`}
        ref={inputRef}
        // Disable the input field if the answer is wrong
        {...(isWrongAnswer ? { readOnly: true } : {})}
      />
      <Button type='submit' className={styles.quizz_button}>
        Submit
      </Button>
    </>
  )
}
