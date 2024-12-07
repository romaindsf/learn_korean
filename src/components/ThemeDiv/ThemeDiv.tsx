import styles from './_themeDiv.module.scss'
import ThemeCard from '../ThemeCard/ThemeCard'

interface ThemeDivProps {
  themes: string[]
}

export default function ThemeDiv({ themes }: ThemeDivProps) {
  return (
    <div className={styles.themeDiv}>
      {themes.map((theme, index) => (
        <ThemeCard key={index} theme={theme} />
      ))}
    </div>
  )
}