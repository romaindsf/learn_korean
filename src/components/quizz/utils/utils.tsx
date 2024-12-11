import { FormEvent, ChangeEvent } from 'react'
import { Question } from '@/types/types'

export const handleSubmit = (
  event: FormEvent<HTMLFormElement>,
  answer: string,
  setAnswer: (value: string) => void,
  setIsWrongAnswer: (value: boolean) => void,
  alphabetTheme: boolean,
  questionsList: Question[],
  currentQuestionIndex: number,
  score: number,
  setScore: (value: number) => void,
  setCurrentQuestionIndex: (value: number) => void,
  setIsOver: (value: boolean) => void
): void => {
  event.preventDefault()
  const trimmedAnswer = answer.trim().toLowerCase()
  const currentQuestion = questionsList[currentQuestionIndex]

  let isCorrect = false

  if (
    !alphabetTheme &&
    currentQuestion?.english?.toLowerCase() === trimmedAnswer
  ) {
    isCorrect = true
  } else if (
    alphabetTheme &&
    currentQuestion.romanisation.toLowerCase().includes(trimmedAnswer)
  ) {
    isCorrect = true
  }

  if (isCorrect) {
    setScore(score + 1)
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setIsWrongAnswer(false)
  } else {
    setIsWrongAnswer(true)
  }

  setAnswer('') // Clear the input field

  if (currentQuestionIndex >= questionsList.length - 1) {
    setIsOver(true)
  }
}

export const handleChange = (
  event: ChangeEvent<HTMLInputElement>,
  setAnswer: (value: string) => void
): void => {
  setAnswer(event.target.value)
}
