import { Inter } from "next/font/google";
import Link from "next/link";
import { executeQuery } from "@/config/db";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const results = await executeQuery({
      query: `SELECT * FROM user WHERE email = ?`,
      values: ["test@gmail.com"],
    });

    console.log(results);
  };

  return (
    <main className={`flex gap-8 ${inter.className}`}>
      <Link
        className="px-3 py-2 text-xl bg-[#000] rounded-md text-white hover:scale-105 active:95"
        href={"/signup"}
      >
        Get Started Here
      </Link>
      <Link
        className="px-3 py-2 text-xl bg-[#000] rounded-md text-white hover:scale-105 active:95"
        href={"/login"}
      >
        Log In
      </Link>

      <button onClick={handleSubmit}> click me</button>
    </main>
  );
}
