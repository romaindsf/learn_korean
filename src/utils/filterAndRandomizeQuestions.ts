import { Question } from '@/types/types'

// Function to filter questions by theme
export function filterQuestionsByTheme(
  data: Question[],
  theme: string
): Question[] {
  return data.filter((question) => question.theme === theme)
}

// Function to randomly remove questions until only the specified size remains
// With the Fisher-Yates shuffle algorithm:
export function getRandomSubset(arr: Question[], size: number): Question[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
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
