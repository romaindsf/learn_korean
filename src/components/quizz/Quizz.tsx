import { useQuizzContext } from '@/contexts/QuizzContext'
import Styles from './quizz.module.scss'
import Button from '../button/Button'

export default function Quizz() {
  // Accessing the context values for filtered questions and current question index
  const { filteredQuestions, currentQuestionIndex } = useQuizzContext()

  return (
    <div className={Styles.quizz_div}>
      {/* Check if there are no filtered questions */}
      {!filteredQuestions || filteredQuestions.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        <div>
          {/* Display the current question number and its Korean representation */}
          <h2>question n°{currentQuestionIndex + 1}:</h2>
          <h3>{filteredQuestions[currentQuestionIndex].korean}</h3>
          <form>
            <label htmlFor='answer'>Answer:</label>
            <input type='text' id='answer' name='answer' />
            <Button type='submit'>Submit</Button>
          </form>
        </div>
      )}
    </div>
  )
}
