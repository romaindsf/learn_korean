import { FormEvent } from 'react'
import { Question } from '@/types/types'
interface HandleSubmitProps {
  event: FormEvent<HTMLFormElement>
  answer: string
  setAnswer: (value: string) => void
  setIsWrongAnswer: (value: boolean) => void
  alphabetTheme: boolean
  questionsList: Question[]
  currentQuestionIndex: number
  score: number
  setScore: (value: number) => void
  setShowResults: (value: boolean) => void
  setCurrentQuestionIndex: (value: number) => void
}

export function handleSubmit({
  event,
  answer,
  setAnswer,
  setIsWrongAnswer,
  alphabetTheme,
  questionsList,
  currentQuestionIndex,
  score,
  setScore,
  setShowResults,
  setCurrentQuestionIndex,
}: HandleSubmitProps): void {
  event.preventDefault()
  const trimmedAnswer = answer.trim().toLowerCase()
  const currentQuestion = questionsList[currentQuestionIndex]

  let isCorrect: boolean = false

  if (
    !alphabetTheme &&
    currentQuestion?.english?.toLowerCase() === trimmedAnswer
  ) {
    if (trimmedAnswer !== '') {
      isCorrect = true
    }
  } else if (
    alphabetTheme &&
    currentQuestion.romanisation.toLowerCase() === trimmedAnswer &&
    trimmedAnswer !== ''
  ) {
    isCorrect = true
  }

  setAnswer('') // Clear the input field

  if (isCorrect) {
    setScore(score + 1)
    if (currentQuestionIndex <= questionsList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
    setIsWrongAnswer(false)
  } else {
    setIsWrongAnswer(true)
  }

  setAnswer('') // Clear the input field

  if (currentQuestionIndex === questionsList.length - 1) {
    setShowResults(true)
  }
}
