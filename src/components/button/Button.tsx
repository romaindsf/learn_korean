import React from 'react'
import styles from './button.module.scss'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  ref?: React.Ref<HTMLButtonElement>
}

export default function Button({
  children,
  className,
  type = 'button',
  onClick,
  ref,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`}
      ref={ref}
    >
      {children}
    </button>
  )
}
