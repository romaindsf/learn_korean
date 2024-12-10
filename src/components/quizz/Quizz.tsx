import { useQuizzContext } from '@/contexts/QuizzContext'
import { Question } from '@/types/types'

export default function Quizz({}: { listQuestions: Question[] }) {
  const { filteredQuestions, currentQuestionIndex } = useQuizzContext()

  return (
    <div>
      {!filteredQuestions || filteredQuestions.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        <>
          {currentQuestionIndex < 0 ||
          currentQuestionIndex >= filteredQuestions.length ? (
            <p>Invalid question index.</p>
          ) : (
            <>
              <h2>question n°{currentQuestionIndex + 1}</h2>
              <p>{filteredQuestions[currentQuestionIndex].korean}</p>
              <ul>
                {filteredQuestions.map((question, index) => (
                  <li key={index}>{question.english}</li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  )
}
