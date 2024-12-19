'use client'
import React from 'react'
import { useFetchQuestions } from '@/hooks/useFetchQuestions'
import ThemeDiv from '@/components/themeDiv/ThemeDiv'
import styles from './page.module.scss'

export default function Home() {
  const { themes, error } = useFetchQuestions()
  if (!themes) {
    return <p>Loading...</p>
  }
  return (
    <main>
      <h1>Learn Korean!</h1>
      <div className={styles.main_content}>
        <h2>Choose a theme</h2>
        {error ? <p>{error}</p> : <ThemeDiv themes={themes} />}
      </div>
    </main>
  )
}
