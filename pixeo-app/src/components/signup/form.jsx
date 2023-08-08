import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import Button from "../inputs/button";
import Input from "../inputs/input";

const initialForm = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
};

export default function Form() {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/signup", form);
      if (res.status === 200) {
        alert("Sign up successful, please login to continue");
      }

      setForm(initialForm);
      Router.push("/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <h1 className="text-5xl font-bold">Sign Up</h1>
      <form
        className="flex flex-col items-center space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="flex space-x-4">
          <Input
            name="firstName"
            placeholder="First Name"
            type="text"
            value={form.firstName}
            onChange={handleChange}
          />
          <Input
            name="lastName"
            placeholder="Last Name"
            type="text"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>
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
        <Input
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
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
