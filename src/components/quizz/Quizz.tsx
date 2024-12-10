import { useQuizzContext } from '@/contexts/QuizzContext'
import styles from './quizz.module.scss'
import Button from '../button/Button'
import { ChangeEvent, FormEvent, useState } from 'react'

export default function Quizz() {
  // Accessing the context values
  const {
    filteredQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    score,
    setScore,
  } = useQuizzContext()

  const [answer, setAnswer] = useState<string>('')

  // Check if the answer is correct
  const [isWrongAnswer, setIsWrongAnswer] = useState<boolean>(false)

  // Check if the current question is in the 'food' category
  const isFoodCategory: boolean =
    filteredQuestions.length > 0 && filteredQuestions[0].theme === 'food'

  // Check if the current question is in the 'alphabet' category
  const isAlphabetCategory: boolean =
    filteredQuestions.length > 0 && filteredQuestions[0].theme === 'alphabet'

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const answer = (event.target as HTMLFormElement).answer.value
      .trim()
      .toLowerCase()
    const currentQuestion = filteredQuestions[currentQuestionIndex]

    let isCorrect = false

    if (
      !isAlphabetCategory &&
      currentQuestion.english?.toLowerCase() === answer
    ) {
      isCorrect = true
    } else if (
      isAlphabetCategory &&
      currentQuestion.romanisation.toLowerCase().includes(answer)
    ) {
      isCorrect = true
    }

    if (isCorrect) {
      setScore(score + 1)
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setIsWrongAnswer(true)
    }

    setAnswer('') // Clear the input field
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setAnswer(event.target.value)
  }

  return (
    <div>
      {/* Check if there are no filtered questions */}
      {!filteredQuestions || filteredQuestions.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        <div className={styles.quizz_div}>
          {/* Display the current question number and its Korean representation */}
          <h2>question n°{currentQuestionIndex + 1}:</h2>
          <h3>{filteredQuestions[currentQuestionIndex].korean}</h3>
          {!isWrongAnswer ? (
            <form onSubmit={handleSubmit}>
              <label htmlFor='answer'>Answer:</label>
              <input
                type='text'
                id='answer'
                name='answer'
                value={answer}
                onChange={handleChange}
                // the input field for 'food' is wider
                className={isFoodCategory ? styles.food_input : ''}
              />
              <Button type='submit' className={styles.quizz_button}>
                Submit
              </Button>
            </form>
          ) : (
            <div className={styles.wrong_answer}>
              <p className={styles.correct_answer}>
                The correct answer was:{' '}
                {isAlphabetCategory
                  ? filteredQuestions[currentQuestionIndex].romanisation
                  : filteredQuestions[currentQuestionIndex].english}
              </p>
              {filteredQuestions[currentQuestionIndex].description && (
                <p className={styles.correct_answer_description}>
                  {filteredQuestions[currentQuestionIndex].description}
                </p>
              )}
              <Button
                className={styles.quizz_button}
                onClick={() => {
                  setIsWrongAnswer(false)
                  setCurrentQuestionIndex(currentQuestionIndex + 1)
                }}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
