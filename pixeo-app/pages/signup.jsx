import SignUpForm from './components/SignUpForm'
import Image from 'next/image'
import Link from 'next/link'

export default function Signup() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="py-10 px-8 bg-[#080325] bg-opacity-70 rounded-xl z-[1] flex items-center justify-center flex-col">
        <Link href="/"><Image src="/pixeo.svg" alt="logo" width={200} height={50} /></Link>
        <SignUpForm />
      </div>
    </div>
  )
}