import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex gap-8 ${inter.className}`}
    >
      
      <Link href={"/signup"} className="px-3 py-2 text-xl bg-[#000] rounded-md text-white hover:scale-105 active:95">Get Started Here</Link>
      <Link href={"/login"} className="px-3 py-2 text-xl bg-[#000] rounded-md text-white hover:scale-105 active:95">Log In</Link>

    </main>
  )
}
