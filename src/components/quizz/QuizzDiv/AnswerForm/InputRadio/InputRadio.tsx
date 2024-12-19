import { Question } from '@/types/types'
import styles from '../answerForm.module.scss'
import { SetStateAction, useEffect, useMemo, useState } from 'react'

interface InputRadioProps {
  answer: string
  setAnswer: (value: string) => void
  isWrongAnswer: boolean
  questionsList: Question[]
  currentQuestionIndex: number
}

export default function InputRadio({
  setAnswer,
  isWrongAnswer,
  questionsList,
  currentQuestionIndex,
}: InputRadioProps) {
  // Create a list of unique options, shuffle them, and select the first three
  const options = useMemo(() => {
    const initialOptions = questionsList
      .filter((_, index) => index !== currentQuestionIndex)
      .map((question) => question.romanisation)
      .slice(0, 2)
    initialOptions.push(
      questionsList[currentQuestionIndex].romanisation.toLowerCase()
    )
    return initialOptions.sort(() => Math.random() - 0.5)
  }, [questionsList, currentQuestionIndex])

  const [selectedOption, setSelectedOption] = useState<string>('')

  useEffect(() => {
    setAnswer(selectedOption)
    console.log(selectedOption)
  }, [selectedOption, setAnswer])

  function handleOptionChange(e: {
    target: { value: SetStateAction<string> }
  }) {
    setSelectedOption(e.target.value)
  }

  return (
    <>
      {options.map((option, index) => (
        <div
          key={index}
          className={`${styles.radio_label} ${
            selectedOption === option ? styles.selected : ''
          }`}
        >
          <input
            type='radio'
            id={`option_${index}`}
            name='answer'
            value={option}
            checked={selectedOption === option}
            onChange={handleOptionChange}
            className={`${isWrongAnswer ? styles.wrong_input : ''}`}
          />
          <label htmlFor={`option_${index}`}>{option}</label>
        </div>
      ))}
    </>
  )
}
