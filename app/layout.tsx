import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from '@/components/providers/react-hot-toast';
const inter = Inter({ subsets: ['latin'] })
import { Toaster, toast } from 'sonner'
export const metadata: Metadata = {
  title: 'ManageSync',
  description: 'created with ❤️ by Haseeb',
}

export default  function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    
    <html lang="en">
    
      <body
      
       className={inter.className}>
       <Toaster position='top-center' richColors/>
       <ToastProvider/>
        {children}</body>
    </html>
  </ClerkProvider>
  )
}
