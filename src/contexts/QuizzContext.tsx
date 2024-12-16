'use client'
import React, { createContext, useState, ReactNode, useContext } from 'react'
import { Question } from '@/types/types'

interface QuizzContextType {
  start: boolean
  setStart: (start: boolean) => void
  data: Question[]
  setData: (data: Question[]) => void
  questionsList: Question[]
  setquestionsList: (questions: Question[]) => void
  questionLength: number
  setquestionLength: (length: number) => void
  currentQuestionIndex: number
  setCurrentQuestionIndex: (index: number) => void
  selectedTheme: string
  setSelectedTheme: (theme: string) => void
  score: number
  setScore: (score: number) => void
  resetQuiz: () => void
}

const QuizzContext = createContext<QuizzContextType | undefined>(undefined)

export function QuizzProvider({ children }: { children: ReactNode }) {
  const [start, setStart] = useState<boolean>(false)
  const [data, setData] = useState<Question[]>([])
  const [questionsList, setquestionsList] = useState<Question[]>([])
  const [questionLength, setquestionLength] = useState<number>(5)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [selectedTheme, setSelectedTheme] = useState<string>('')
  const [score, setScore] = useState<number>(0)

  const resetQuiz = () => {
    setStart(false)
    setCurrentQuestionIndex(0)
    setSelectedTheme('')
    setScore(0)
  }

  const value = {
    start,
    setStart,
    data,
    setData,
    questionsList,
    setquestionsList,
    questionLength,
    setquestionLength,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedTheme,
    setSelectedTheme,
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
