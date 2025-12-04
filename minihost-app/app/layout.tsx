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
      <body>{children}</body>
    </html>
  )
}
