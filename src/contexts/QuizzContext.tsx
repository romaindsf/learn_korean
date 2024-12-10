'use client'
import React, { createContext, useState, ReactNode, useContext } from 'react'
import { Question } from '@/types/types'

interface QuizzContextType {
  start: boolean
  setStart: (start: boolean) => void
  filteredQuestions: Question[]
  setFilteredQuestions: (questions: Question[]) => void
  currentQuestionIndex: number
  setCurrentQuestionIndex: (index: number) => void
  questions: Question[]
  setQuestions: (questions: Question[]) => void
  score: number
  setScore: (score: number) => void
  resetQuiz: () => void
}

const QuizzContext = createContext<QuizzContextType | undefined>(undefined)

export function QuizzProvider({ children }: { children: ReactNode }) {
  const [start, setStart] = useState<boolean>(false)
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [score, setScore] = useState<number>(0)

  const resetQuiz = () => {
    setStart(false)
    setCurrentQuestionIndex(0)
    setQuestions([])
    setScore(0)
  }

  const value = {
    start,
    setStart,
    filteredQuestions,
    setFilteredQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    questions,
    setQuestions,
    score,
    setScore,
    resetQuiz,
  }

  return <QuizzContext.Provider value={value}>{children}</QuizzContext.Provider>
}

export function useQuizzContext(): QuizzContextType {
  const context = useContext(QuizzContext)
  if (context === undefined) {
    throw new Error('useQuizzContext must be used within an AppProvider')
  }
  return context
}
