import styles from './_themeDiv.module.scss'
import Link from 'next/link'

interface ThemeDivProps {
  themes: string[]
}

export default function ThemeDiv({ themes }: ThemeDivProps) {
  return (
    <div className={styles.themeDiv}>
      {themes.map((theme, index) => (
        <Link key={index} href={theme}> {theme} </Link>
      ))}
    </div>
  )
}