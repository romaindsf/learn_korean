import { useState } from 'react'
import { useQuizzContext } from '@/contexts/QuizzContext'
import styles from './quizz.module.scss'
import { DisplayQuestion } from './DisplayQuestion/DisplayQuestion'
import { AnswerForm } from './AnswerForm/AnswerForm'
import { WrongAnswerDisplay } from './WrongAnswerDisplay/WrongAnswerDisplay'
import { handleSubmit, handleChange } from './utils/utils'

export default function Quizz() {
  const {
    // Destructure the context
    questionsList,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedTheme,
    score,
    setScore,
  } = useQuizzContext()
  // State to store the user's answer
  const [answer, setAnswer] = useState<string>('')
  const [isWrongAnswer, setIsWrongAnswer] = useState<boolean>(false)
  const [isOver, setIsOver] = useState<boolean>(false)
  // Check if the selected theme is 'food' or 'alphabet'
  const foodTheme: boolean = selectedTheme === 'food'
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
                  answer={answer}
                  isFoodCategory={foodTheme}
                  isWrongAnswer={isWrongAnswer}
                  handleChange={(e) => handleChange(e, setAnswer)}
                  handleSubmit={(e) =>
                    handleSubmit(
                      e,
                      answer,
                      setAnswer,
                      setIsWrongAnswer,
                      alphabetTheme,
                      questionsList,
                      currentQuestionIndex,
                      score,
                      setScore,
                      setCurrentQuestionIndex,
                      setIsOver
                    )
                  }
                />
              ) : (
                // Display the wrong answer component
                <WrongAnswerDisplay
                  correctAnswer={
                    alphabetTheme // If the theme is 'alphabet', display the romanisation
                      ? questionsList[currentQuestionIndex].romanisation || ''
                      : questionsList[currentQuestionIndex].english || ''
                  }
                  description={questionsList[currentQuestionIndex].description}
                  onNext={() => {
                    setIsWrongAnswer(false)
                    setCurrentQuestionIndex(currentQuestionIndex + 1)
                  }}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
