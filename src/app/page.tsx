'use client'
import React from 'react'
import { useFetchQuestions } from '@/hooks/useFetchQuestions'
import ThemeDiv from '@/components/themeDiv/ThemeDiv'
import styles from './page.module.scss'
import { HOMEPAGE_SUBTITLE, HOMEPAGE_TITLE } from '@/config'

export default function Home() {
  const { themes, error } = useFetchQuestions()
  if (!themes) {
    return <p>Loading...</p>
  }
  return (
    <main>
      <h1>{HOMEPAGE_TITLE}</h1>
      <div className={styles.main_content}>
        <h2>{HOMEPAGE_SUBTITLE}</h2>
        {error ? <p>{error}</p> : <ThemeDiv themes={themes} />}
      </div>
    </main>
  )
}
