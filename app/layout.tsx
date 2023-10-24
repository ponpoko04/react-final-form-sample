  import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='relative rounded-xl overflow-auto p-8'>
          <div className='grid grid-cols-4 gap-4'>
            <div>
              <Link href="/" type="button">
                <button className='bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white'>
                  HOME
                </button>
              </Link>
            </div>
            <div>
              <Link href="/form1" type="button">
                <button className='bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white'>
                  form1
                </button>
              </Link>
            </div>
            <div>
              <Link href="/form2" type="button">
                <button className='bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white'>
                  form2
                </button>
              </Link>
            </div>
            <div>
              <Link href="/form3" type="button">
                <button className='bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white'>
                  form3
                </button>
              </Link>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}
