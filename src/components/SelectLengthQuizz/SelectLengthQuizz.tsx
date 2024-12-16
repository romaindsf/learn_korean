import { useQuizzContext } from '@/contexts/QuizzContext'
import { QUESTION_LENGTH_OPTIONS } from '@/config'
import styles from './selectLengthQuizz.module.scss'

export default function SelectLengthQuizz() {
  const { questionLength, setquestionLength } = useQuizzContext()

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setquestionLength(Number(event.target.value))
  }

  return (
    <form className={styles.select_length_quizz}>
      <label htmlFor='numQuestions'>Nombres de questions</label>
      <select
        id='numQuestions'
        name='numQuestions'
        value={questionLength}
        onChange={handleSizeChange}
      >
        {QUESTION_LENGTH_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </form>
  )
}
