import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shift 2.0 - 18 Month Implementation Gantt Chart',
  description: 'Weekly Gantt Chart - From Signal to Action in Real Time',
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
