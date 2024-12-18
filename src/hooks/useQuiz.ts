import { useEffect, useMemo, useState } from 'react'
import { useQuizzContext } from '@/contexts/QuizzContext'
import {
  filterQuestionsByTheme,
  getRandomSubset,
} from '@/utils/filterAndRandomizeQuestions'
import { Question } from '@/types/types'

export const useQuiz = (theme: string) => {
  const {
    data,
    setquestionsList,
    setCurrentQuestionIndex,
    setScore,
    setShowResults,
    questionLength,
    selectedTheme,
  } = useQuizzContext()

  const [isOver, setIsOver] = useState<boolean>(false)
  const alphabetTheme: boolean = selectedTheme === 'alphabet'

  // Memoize themed questions to prevent unnecessary re-renders
  const themedQuestions = useMemo<Question[]>(
    () => filterQuestionsByTheme(data, theme),
    [data, theme]
  )

  // Memoize a random subset of questions
  const questionsSet = useMemo<Question[]>(
    () => getRandomSubset(themedQuestions, questionLength),
    [themedQuestions, questionLength]
  )

  // Update questions list when questionsSet changes
  useEffect(() => {
    setquestionsList(questionsSet)
  }, [questionsSet, setquestionsList])

  // Handle retry logic
  const handleRetry = () => {
    const newQuestions = getRandomSubset(themedQuestions, questionLength)
    setquestionsList(newQuestions)
    setCurrentQuestionIndex(0)
    setScore(0)
    setShowResults(false)
    setIsOver(false)
  }

  return {
    isOver,
    setIsOver,
    alphabetTheme,
    handleRetry,
  }
}
