import { useEffect, useState } from 'react'
import data from '@/data/data.json'
import { Question } from '@/types/types'
import { filterAndRandomizeQuestions } from '@/utils/filterAndRandomizeQuestions'

export const useFilteredQuestions = (theme: string, size: number) => {
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([])

  useEffect(() => {
    const limitedQuestions = filterAndRandomizeQuestions(data, theme, size)
    setFilteredQuestions(limitedQuestions)
  }, [theme, size])

  return filteredQuestions
}
