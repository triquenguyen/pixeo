import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import axios from 'axios';

const initialForm = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPass: '',
}

export default function SignUpForm() {
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
      const res = await axios.post('/api/signup', form)
      console.log("Form submitted", res)
      if (res.status === 200) {
        alert("Sign up successful, please login to continue")
        setForm(initialForm)
        Router.push('/login')
      } 
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className="flex flex-col items-center gap-[16px] ">
      <h1 className="text-[42px] font-bold">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[14px] items-center ">
        <div className="flex gap-[20px]">
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="text-black bg-[rgba(200,200,200,0.2)] w-[170px] border-[2px] border-[rgba(0,0,0,0)] focus:border-[#5c5c5c] focus:outline-none text-sm rounded-lg block p-2 mt-2" />

          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="bg-[rgba(200,200,200,0.2)] w-[170px] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#5c5c5c] focus:border-[#5c5c5c] focus:outline-none text-sm rounded-lg block p-2 mt-2" />
        </div>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email" className="bg-[rgba(200,200,200,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:border-[#5c5c5c] focus:outline-none text-sm rounded-lg block p-2 mt-2" />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="bg-[rgba(200,200,200,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:border-[#5c5c5c] focus:outline-none text-sm rounded-lg block p-2 mt-2" />

        <input
          type="password"
          name="confirmPass"
          value={form.confirmPass}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="bg-[rgba(200,200,200,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:border-[#5c5c5c] focus:outline-none text-sm rounded-lg block p-2 mt-2" />

        <button type="submit" className="px-3 py-2 bg-[#000] rounded-md text-white w-[25%]">Sign Up</button>
        <p>Already have an account? <Link href="/login" className="underline underline-offset-2">Login Here</Link></p>
      </form>
    </div>
  )
}