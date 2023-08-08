import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className} fixed inset-0 overflow-hidden`}>
      <Image
        alt="bg"
        className="hidden fixed xl:block min-h-screen z-[-1] brightness-50"
        height={1080}
        src="/coverImage.png"
        width={1920}
      />
      <div className="px-12 py-10">
        <div className="flex items-center px-4 py-2">
          <Link className="mr-auto invert" href="/">
            <Image alt="logo" height={37.5} src="/pixeo.svg" width={150} />
          </Link>
          <Link
            className="px-3 py-2 text-xl bg-white font-medium rounded-md text-black hover:scale-105 active:95"
            href={"/login"}
          >
            Log In
          </Link>
        </div>

        <div
          className="flex flex-col justify-center items-center"
          style={{ overflowY: "hidden", height: "80vh" }}
        >
          <h1 className="text-5xl font-bold text-white">
            Welcome to Pixeo! A digital Artwork sharing Library
          </h1>
          <h1 className="text-3xl font-semibold text-white mt-8">
            Lets share your creativity!
          </h1>
          <Link
            className="mt-16 px-3 py-2 text-xl bg-white font-medium rounded-md text-black hover:scale-105 active:95"
            href={"/signup"}
          >
            Get Started Here
          </Link>
        </div>
      </div>
    </main>
  );
}
