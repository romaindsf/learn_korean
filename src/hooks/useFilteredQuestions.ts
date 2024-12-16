import { useEffect, useState } from 'react'
import { Question } from '@/types/types'
import { filterAndRandomizeQuestions } from '@/utils/filterAndRandomizeQuestions'
import { useQuizzContext } from '@/contexts/QuizzContext'

export const useFilteredQuestions = (theme: string) => {
  const { data, questionLength } = useQuizzContext()
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([])

  useEffect(() => {
    const limitedQuestions = filterAndRandomizeQuestions(
      data,
      theme,
      questionLength
    )
    setFilteredQuestions(limitedQuestions)
  }, [theme, data, questionLength])

  return filteredQuestions
}
