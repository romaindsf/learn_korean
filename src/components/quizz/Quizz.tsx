import { useState } from 'react'
import { useQuizzContext } from '@/contexts/QuizzContext'
import styles from './quizz.module.scss'
import { DisplayQuestion } from './DisplayQuestion/DisplayQuestion'
import { AnswerForm } from './AnswerForm/AnswerForm'
import { WrongAnswerDisplay } from './WrongAnswerDisplay/WrongAnswerDisplay'
import { handleSubmit, handleChange } from './utils/utils'

export default function Quizz() {
  const {
    questionsList,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedTheme,
    score,
    setScore,
  } = useQuizzContext()
  const [answer, setAnswer] = useState<string>('')
  const [isWrongAnswer, setIsWrongAnswer] = useState<boolean>(false)
  const [isOver, setIsOver] = useState<boolean>(false)

  const foodTheme: boolean = selectedTheme === 'food'

  const alphabetTheme: boolean = selectedTheme === 'alphabet'

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
              <DisplayQuestion
                questionNumber={currentQuestionIndex + 1}
                korean={questionsList[currentQuestionIndex].korean}
              />
              {!isWrongAnswer ? (
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
                <WrongAnswerDisplay
                  correctAnswer={
                    alphabetTheme
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
        </>
      )}
    </div>
  )
}
