import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex flex-col items-center justify-center space-y-8 min-h-screen p-4 ${inter.className}`}
    >
      <h1 className="text-6xl font-bold text-center">Welcome to Pixeo</h1>
      <div className="flex space-x-4 items-center">
        <Link
          className="px-3 py-2 text-xl font-semibold bg-black rounded-md text-white hover:scale-105 active:95"
          href="/signup"
        >
          Sign Up
        </Link>
        <span className="text-sm text-gray-500 font-semibold">or</span>
        <Link
          className="px-3 py-2 text-xl font-semibold bg-black rounded-md text-white hover:scale-105 active:95"
          href="/login"
        >
          Log In
        </Link>
      </div>
    </main>
  );
}
