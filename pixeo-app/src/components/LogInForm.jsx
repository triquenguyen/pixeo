import Link from "next/link";
import Router from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";

const initialForm = {
  email: "",
  password: "",
};

export default function LogInForm({ callbackUrl = "/homepage" }) {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      callbackUrl: callbackUrl,
      email: form.email,
      password: form.password,
    });

    if (res.ok) {
      Router.push(callbackUrl);
    }

    if (res.error) {
      alert(res.error);
    }

    // setForm(initialForm)
  };

  return (
    <div className="flex flex-col items-center gap-[16px] ">
      <h1 className="text-[42px] font-bold">Log In</h1>
      <form
        className="flex flex-col gap-[14px] items-center "
        onSubmit={handleSubmit}
      >
        <input
          className="bg-[rgba(200,200,200,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:border-[#5c5c5c]  focus:outline-none text-sm rounded-lg block p-2 mt-2"
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="bg-[rgba(200,200,200,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:border-[#5c5c5c]  focus:outline-none text-sm rounded-lg block p-2 mt-2"
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          className="px-3 py-2 bg-[#000] bg-opacity-80 rounded-md text-white w-[25%] hover:bg-opacity-100"
          type="submit"
        >
          Login
        </button>
        <p>
          Not have an account?{" "}
          <Link className="underline underline-offset-2" href="/signup">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
