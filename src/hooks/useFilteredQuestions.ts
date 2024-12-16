import { useEffect, useState } from 'react'
import { Question } from '@/types/types'
import { filterAndRandomizeQuestions } from '@/utils/filterAndRandomizeQuestions'
import { useQuizzContext } from '@/contexts/QuizzContext'

export const useFilteredQuestions = (theme: string, size: number) => {
  const { data } = useQuizzContext()
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([])

  useEffect(() => {
    const limitedQuestions = filterAndRandomizeQuestions(data, theme, size)
    setFilteredQuestions(limitedQuestions)
  }, [theme, size, data])

  return filteredQuestions
}
