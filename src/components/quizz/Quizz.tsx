import { useQuizzContext } from '@/contexts/QuizzContext'
import styles from './quizz.module.scss'
import Button from '../button/Button'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Question } from '@/types/types'

export default function Quizz() {
  // Accessing the context values
  const {
    questionsList,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedTheme,
    score,
    setScore,
  } = useQuizzContext()

  const [answer, setAnswer] = useState<string>('')
  // Check if the answer is correct
  const [isWrongAnswer, setIsWrongAnswer] = useState<boolean>(false)
  // Check if the quiz has ended
  const [isOver, setIsOver] = useState<boolean>(false)

  // Check if the current question is in the 'food' or 'alphabet' category
  const foodTheme: boolean = selectedTheme === 'food'
  const alphabetTheme: boolean = selectedTheme === 'alphabet'

  //Define the event object for form submission events
  const handleAnswerQuizz = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const answer: string | number = (
      event.target as HTMLFormElement
    ).answer.value
      .trim()
      .toLowerCase()
    // Access the current question
    const currentQuestion: Question = questionsList[currentQuestionIndex]

    let isCorrect: boolean = false

    //Correct answer varies depending on the theme
    if (foodTheme && currentQuestion.english?.toLowerCase() === answer) {
      isCorrect = true
    } else if (
      alphabetTheme &&
      currentQuestion.romanisation.toLowerCase().includes(answer.toString())
    ) {
      isCorrect = true
    }
    if (isCorrect) {
      setScore(score + 1)
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setIsWrongAnswer(true)
    }

    if (currentQuestionIndex >= questionsList.length - 1) {
      setIsOver(true)
      console.log('Quiz is over')
    }
    setAnswer('') // Clear the input field
  }

  // Update the answer state when the user types in the input field
  // Represents the event object for a change event on an HTML input elemen
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setAnswer(event.target.value)
  }

  return (
    <div className={styles.quizz_div}>
      {isOver ? (
        <div className={styles.score_div}>
          <h2>
            Your score is: {score} / {questionsList.length}
          </h2>
        </div>
      ) : (
        <>
          {!questionsList || questionsList.length === 0 ? (
            <p>No questions available.</p>
          ) : (
            <div>
              <h2>question n°{currentQuestionIndex + 1}:</h2>
              <h3>{questionsList[currentQuestionIndex]?.korean}</h3>
              <form onSubmit={handleAnswerQuizz}>
                <label htmlFor='answer'>Answer:</label>
                {!isWrongAnswer && (
                  <input
                    type='text'
                    id='answer'
                    name='answer'
                    value={answer}
                    onChange={handleChange}
                    className={`${questionsList ? styles.food_input : ''} ${
                      isWrongAnswer ? styles.wrong_input : ''
                    }`}
                  />
                )}

                {isWrongAnswer ? (
                  <div className={styles.wrong_answer}>
                    <p className={styles.correct_answer}>
                      The correct answer was:{' '}
                      {foodTheme
                        ? questionsList[currentQuestionIndex]?.english
                        : questionsList[currentQuestionIndex]?.romanisation}
                    </p>
                    {questionsList[currentQuestionIndex]?.description && (
                      <p className={styles.correct_answer_description}>
                        {questionsList[currentQuestionIndex]?.description}
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
                ) : (
                  <Button type='submit' className={styles.quizz_button}>
                    Submit
                  </Button>
                )}
              </form>
            </div>
          )}
        </>
      )}
    </div>
  )
}
