import { useState } from 'react'
import { useQuizzContext } from '@/contexts/QuizzContext'
import styles from './quizz.module.scss'
import { DisplayQuestion } from './DisplayQuestion/DisplayQuestion'
import { AnswerForm } from './AnswerForm/AnswerForm'
import { DisplayWrongAnswer } from './DisplayWrongAnswer/DisplayWrongAnswer'
// import { handleSubmit, handleChange } from './utils/utils'

export default function Quizz() {
  const {
    // Destructure the context
    questionsList,
    currentQuestionIndex,
    selectedTheme,
    score,
  } = useQuizzContext()
  // State to store the user's answer
  const [isWrongAnswer, setIsWrongAnswer] = useState<boolean>(false)
  const [isOver, setIsOver] = useState<boolean>(false)
  // Check if the selected theme is 'food' or 'alphabet'
  const alphabetTheme: boolean = selectedTheme === 'alphabet'

  return (
    <div>
      {isOver ? ( // If the quiz is over, display the score
        <div>
          <h2>
            Your score is: {score} / {questionsList.length}
          </h2>
        </div>
      ) : (
        <div>
          {!questionsList || questionsList.length === 0 ? (
            // If there are no questions available, display a message
            <p>No questions available.</p>
          ) : (
            <div className={styles.quizz_div}>
              <DisplayQuestion // Display the question component
                questionNumber={currentQuestionIndex + 1}
                korean={questionsList[currentQuestionIndex].korean}
              />
              {!isWrongAnswer ? (
                // Display the answer form component
                <AnswerForm
                  isWrongAnswer={isWrongAnswer}
                  setIsWrongAnswer={setIsWrongAnswer}
                  alphabetTheme={alphabetTheme}
                  setIsOver={setIsOver}
                />
              ) : (
                // Display the wrong answer component
                <DisplayWrongAnswer
                  alphabetTheme={alphabetTheme}
                  setIsWrongAnswer={setIsWrongAnswer}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
