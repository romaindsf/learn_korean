import { Question } from '@/types/types'

// Function to filter questions by theme
export function filterQuestionsByTheme(
  data: Question[],
  theme: string
): Question[] {
  return data.filter((question) => question.theme === theme)
}

// Function to randomly remove questions until only the specified size remains
export function getRandomSubset(arr: Question[], size: number): Question[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, size)
}

// Combined function to filter and randomize questions
export function filterAndRandomizeQuestions(
  data: Question[],
  theme: string,
  size: number
): Question[] {
  const filteredQuestions = filterQuestionsByTheme(data, theme)
  return getRandomSubset(filteredQuestions, size)
}
