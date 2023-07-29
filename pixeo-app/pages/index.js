import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import executeQuery from '@/config/connect-db'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const results = await executeQuery({
      query: `SELECT * FROM user WHERE email = ?`,
      values: ['test@gmail.com']
    })

    console.log(results)
  }

  return (
    <main
      className={`flex gap-8 ${inter.className}`}
    >
      
      <Link href={"/signup"} className="px-3 py-2 text-xl bg-[#000] rounded-md text-white hover:scale-105 active:95">Get Started Here</Link>
      <Link href={"/login"} className="px-3 py-2 text-xl bg-[#000] rounded-md text-white hover:scale-105 active:95">Log In</Link>

      <button onClick={handleSubmit}> click me</button>
    </main>
  )
}
