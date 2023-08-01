import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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

    </main>
  );
}
