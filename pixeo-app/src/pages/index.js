import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className} fixed inset-0 overflow-hidden`}>
      <header className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <Link href="/">
            <Image alt="logo" height={37.5} src="/pixeo.svg" width={150} className="mr-2" />
          </Link>
        </div>

        <div className="flex items-center">
          <Link
            className="mr-4 px-3 py-2 text-xl bg-[#000] rounded-md text-white hover:scale-105 active:95"
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
        </div>
      </header>

      <body className="flex flex-col justify-center items-center min-h-screen relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 ">
          <Image
            alt="coverImage"
            layout="fill"
            objectFit="cover"
            src="/coverImage.png"
            className=""
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-3 py-2">
          <h1 className="text-5xl font-bold text-white py-8">Welcome to Pixeo! A digital Artwork sharing Library.</h1>
          <h1 className="text-3xl font-semibold text-white">Lets share your creativity!</h1>
        </div>
      </body>
    </main>
  );
}
