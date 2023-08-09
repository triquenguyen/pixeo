import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import Button from "../inputs/button";
import Input from "../inputs/input";
import snakeToTitle from "@/utils/snake-to-title";

const initialForm = {
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  confirm_password: "",
};

const fields = {
  email: "email",
  first_name: "text",
  last_name: "text",
  password: "password",
  confirm_password: "password",
};

export default function Form() {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm_password)
      return alert("Passwords do not match");

    try {
      const res = await axios.post("/api/user", {
        email: form.email,
        first_name: form.first_name,
        last_name: form.last_name,
        password: form.password,
      });

      if (res.status === 200)
        alert("Sign up successful, please login to continue");

      setForm(initialForm);
      Router.push("/login");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <h1 className="text-5xl font-bold">Sign Up</h1>
      <form
        className="flex flex-col items-center space-y-4"
        onSubmit={handleSubmit}
      >
        {Object.entries(fields).map(([name, type]) => (
          <Input
            key={name}
            name={name}
            placeholder={snakeToTitle(name)}
            type={type}
            value={form[name]}
            onChange={handleChange}
          />
        ))}
        <Button type="submit">Sign Up</Button>
        <p className="text-gray-500 text-sm">
          Already have an account?{" "}
          <Link className="underline underline-offset-2" href="/login">
            Login Here
          </Link>
        </p>
      </form>
    </div>
  );
}
