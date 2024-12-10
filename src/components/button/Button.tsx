import styles from './button.module.scss'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}
export default function Button({
  children,
  className,
  type = 'button',
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  )
}
