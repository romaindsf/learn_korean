import { useState, useEffect } from 'react'
import { fetchQuestions } from '@/api/callAPI'
import extractUniqueThemes from '@/utils/extractUniqueThemes'
import { useQuizzContext } from '@/contexts/QuizzContext'

export const useFetchQuestions = () => {
  const { setData } = useQuizzContext()
  const [themes, setThemes] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questions = await fetchQuestions()
        setData(questions)
        setThemes(extractUniqueThemes(questions))
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        )
        console.error(err)
      }
    }
    fetchData()
  }, [setData])

  return { themes, error }
}
