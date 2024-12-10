import { QuizzProvider } from '@/contexts/QuizzContext'
import '../styles/globals.scss'

export const metadata = {
  title: 'Learn Korean!',
  description: 'learn korean with our differents themed quizzes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <QuizzProvider>{children}</QuizzProvider>
      </body>
    </html>
  )
}
