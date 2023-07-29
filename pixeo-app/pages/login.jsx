import LogInForm from './components/LogInForm'
import Link from 'next/link'
import Image from 'next/image'

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
        <div className="py-10 px-8 border-2 border-black rounded-xl z-[1] flex items-center justify-center flex-col">
          <Link href="/"><Image src="/pixeo.svg" alt="logo" width={200} height={50}/></Link>
          <LogInForm />
        </div>
    </div>
  )
}