import Link from "next/link";
import Router from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Button from "../inputs/button";
import Input from "../inputs/input";

const initialForm = {
  email: "",
  password: "",
};

export default function Form({ callbackUrl = "/homepage" }) {
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

    if (res.ok) Router.push(callbackUrl);

    if (res.error) alert(res.error);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <h1 className="text-5xl font-bold">Log In</h1>
      <form
        className="flex flex-col items-center space-y-4"
        onSubmit={handleSubmit}
      >
        <Input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        <Button type="submit">Login</Button>
        <p className="text-gray-500 text-sm">
          Haven&apos;t created an account yet?{" "}
          <Link className="underline underline-offset-2" href="/signup">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
