import styles from './themeDiv.module.scss'
import Link from 'next/link'
import Button from '@/components/button/Button'

export default function ThemeDiv({ themes }: { themes: string[] }) {
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
