import { Question } from '@/types/types'

export const filterAndRandomizeQuestions = (
  data: Question[],
  theme: string,
  size: number
): Question[] => {
  const filteredQuestions = data.filter((question) => question.theme === theme)

  // Function to randomly remove questions until only the specified size remains
  const getRandomSubset = (arr: Question[], size: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, size)
  }

  return getRandomSubset(filteredQuestions, size)
}
