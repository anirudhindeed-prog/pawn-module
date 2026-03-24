import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pawn Module | Kumudu ERP',
  description: 'Jewellery pawn/girvi module for Kumudu ERP',
  icons: {
    icon: '💰',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <div className="antialiased">
          {children}
        </div>
      </body>
    </html>
  )
}
