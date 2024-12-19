import { useQuizzContext } from '@/contexts/QuizzContext'
import styles from '../answerForm.module.scss'
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
        autoComplete='off'
        // Add the 'food_input' class if the theme is 'food'
        className={`${foodTheme ? styles.food_input : ''} ${
          isWrongAnswer ? styles.wrong_input : ''
        }`}
        ref={inputRef}
        // Disable the input field if the answer is wrong
        {...(isWrongAnswer ? { readOnly: true } : {})}
      />
    </>
  )
}
