import '../styles/globals.scss'

export const metadata = {
  title: 'Learn Korean!',
  description: 'learn korean with our differenbs themed quizzes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
