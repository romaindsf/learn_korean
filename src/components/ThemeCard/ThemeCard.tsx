import styles from './_themeCard.module.scss'
import Link from 'next/link'

interface ThemeCardProps {
  theme: string
}

export default function ThemeCard({ theme }: ThemeCardProps) {
  return (
    <div className={styles.themeCard}>
      <Link href='#'>{theme}</Link>
    </div>
  )
}