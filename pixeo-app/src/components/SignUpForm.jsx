import axios from "axios";
import Link from "next/link";
import { useState } from "react";

const initialForm = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPass: "",
};

export default function SignUpForm() {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/signup", form);
      console.log("Form submitted", res);
      if (res.status === 200) {
        alert("Sign up successful, please login to continue");
        // setForm(initialForm)
        // Router.push('/login')
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-[16px] ">
      <h1 className="text-[42px] font-bold">Sign Up</h1>
      <form
        className="flex flex-col gap-[14px] items-center "
        onSubmit={handleSubmit}
      >
        <div className="flex gap-[20px]">
          <input
            className="text-black bg-[rgba(200,200,200,0.2)] w-[170px] border-[2px] border-[rgba(0,0,0,0)] focus:border-[#5c5c5c] focus:outline-none text-sm rounded-lg block p-2 mt-2"
            name="firstName"
            placeholder="First Name"
            type="text"
            value={form.firstName}
            onChange={handleChange}
          />

          <input
            className="bg-[rgba(200,200,200,0.2)] w-[170px] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#5c5c5c] focus:outline-none text-sm rounded-lg block p-2 mt-2"
            name="lastName"
            placeholder="Last Name"
            type="text"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>
        <input
          className="bg-[rgba(200,200,200,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:border-[#5c5c5c] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-2 mt-2"
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="bg-[rgba(200,200,200,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:border-[#5c5c5c] focus:outline-none text-sm rounded-lg block p-2 mt-2"
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />

        <input
          className="bg-[rgba(200,200,200,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:border-[#5c5c5c] focus:outline-none text-sm rounded-lg block p-2 mt-2"
          name="confirmPass"
          placeholder="Confirm Password"
          type="password"
          value={form.confirmPass}
          onChange={handleChange}
        />

        <button
          className="px-3 py-2 bg-[#000] rounded-md text-white w-[25%]"
          type="submit"
        >
          Sign Up
        </button>
        <p>
          Already have an account?{" "}
          <Link className="underline underline-offset-2" href="/login">
            Login Here
          </Link>
        </p>
      </form>
    </div>
  );
}
