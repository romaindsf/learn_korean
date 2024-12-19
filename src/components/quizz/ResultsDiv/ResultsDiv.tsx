import React, { useEffect, useRef, useState } from 'react'
import Button from '@/components/button/Button'
import styles from '../quizz.module.scss'
import { useQuizzContext } from '@/contexts/QuizzContext'
import { useFocus } from '@/hooks/useFocus'
import SelectLengthQuizz from '@/components/SelectLengthQuizz/SelectLengthQuizz'

export default function ResultDiv({
  handleRetry,
}: {
  handleRetry: () => void
}) {
  const { score, questionsList } = useQuizzContext()
  const buttonRef = useFocus<HTMLButtonElement>()
  const [changeSettings, setChangeSettings] = useState<boolean>(false)
  const initialQuestionsLength = useRef<number>(questionsList.length)

  useEffect(() => {
    initialQuestionsLength.current = questionsList.length
  }, [questionsList.length])

  function handleChangeSettings() {
    setChangeSettings(true)
  }
  return (
    <div className={styles.quizz_div}>
      <h2>
        Your score is: {score} / {initialQuestionsLength.current}
      </h2>
      <Button type='button' onClick={handleRetry} ref={buttonRef}>
        Retry
      </Button>
      {!changeSettings ? (
        <Button type='button' onClick={handleChangeSettings}>
          Change settings
        </Button>
      ) : (
        <SelectLengthQuizz />
      )}
    </div>
  )
}
