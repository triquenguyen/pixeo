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

const fields = {
  email: "email",
  password: "password",
};

export default function Form({ callbackUrl = "/home" }) {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
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
        {Object.entries(fields).map(([name, type]) => (
          <Input
            key={name}
            name={name}
            placeholder={name
              .split("_")
              .map((word) => word[0].toUpperCase() + word.slice(1))
              .join(" ")}
            type={type}
            value={form[name]}
            onChange={handleChange}
          />
        ))}
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
