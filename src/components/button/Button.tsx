import styles from './button.module.scss'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}
export default function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  )
}
