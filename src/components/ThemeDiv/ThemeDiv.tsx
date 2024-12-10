import styles from './themeDiv.module.scss'
import Link from 'next/link'
import Button from '@/components/button/Button'

interface ThemeDivProps {
  themes: string[]
}

export default function ThemeDiv({ themes }: ThemeDivProps) {
  return (
    <div className={styles.themes_div}>
      {themes.map((theme, index) => (
        <Link key={index} href={theme}>
          <Button className={styles.theme_button}>{theme}</Button>
        </Link>
      ))}
    </div>
  )
}
