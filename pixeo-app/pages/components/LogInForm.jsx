import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import axios from 'axios';

const initialForm = {
  email: '',
  password: '',
}

export default function LogInForm() {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('/api/login', form)
      // console.log("Form submitted", res)
      if (res.status === 200) {
        console.log(res.data)
        alert(res.data)
        // setForm(initialForm)
        // Router.push('/login')
      } else {
        alert(res.data.message)
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="flex flex-col items-center gap-[16px] ">
      <h1 className="text-[42px] font-bold text-[#69C9D0]">Log In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[14px] items-center ">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email" className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-2 mt-2" />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-2 mt-2" />

<button type="submit" className="px-3 py-2 bg-[#69C9D0] bg-opacity-80 rounded-md text-white w-[25%] hover:bg-opacity-100">Login</button>
        <p className="text-white">Not have an account? <Link href="/signup" className="underline underline-offset-2">Create an account</Link></p>
      </form>
    </div>
  )
}