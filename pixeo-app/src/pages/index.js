import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className} fixed inset-0 overflow-hidden`}>
      <Image src="/coverImage.png" width={1920} height={1080} className="hidden fixed xl:block min-h-screen z-[-1]" alt='bg' />
      <div className="px-12 py-10">
        <div className="flex items-center px-4 py-2">
          <Link href="/" className="mr-auto" >
            <Image alt="logo" height={37.5} src="/pixeo.svg" width={150} />
          </Link>
          <Link
            className="px-3 py-2 text-xl bg-[#000] rounded-md text-white hover:scale-105 active:95"
            href={"/login"}
          >
            Log In
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center" style={{ overflowY: "hidden", height: "80vh" }}>
          <h1 className="text-5xl font-bold text-white py-8">Welcome to Pixeo! A digital Artwork sharing Library</h1>
          <h1 className="text-3xl font-semibold text-white">Lets share your creativity!</h1>
          <Link
            className="mt-6 px-3 py-2 text-xl bg-[#000] rounded-md text-white hover:scale-105 active:95"
            href={"/signup"}
          >
            Get Started Here
          </Link>
        </div>
      </div>

    </main>
  );
}
