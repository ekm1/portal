import type { ReactNode } from 'react'
import { Nav } from '@/components/Nav'
import { StoreProvider } from './StoreProvider'

import '../styles/globals.css'

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang='en'>
      <body>
      <Nav />
      <main className='min-h-[calc(100vh-100px)]'>
        {children}
      </main>
      </body>
      </html>
    </StoreProvider>
  )
}
