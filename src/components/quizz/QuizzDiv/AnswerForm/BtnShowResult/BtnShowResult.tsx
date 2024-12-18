import Button from '@/components/button/Button'
import styles from '../answerForm.module.scss'
import { useFocus } from '@/hooks/useFocus'

export default function BtnShowResult({
  setIsOver,
}: {
  setIsOver: (value: boolean) => void
}) {
  const buttonRef = useFocus<HTMLButtonElement>()

  return (
    <Button
      type='button'
      className={styles.quizz_button}
      ref={buttonRef}
      onClick={() => setIsOver(true)}
    >
      Show Result
    </Button>
  )
}
