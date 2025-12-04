import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MiniHost — The little helper for Airbnb hosts',
  description: '4 simple tools. No dashboard. No complexity. Just the stuff that actually helps.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
