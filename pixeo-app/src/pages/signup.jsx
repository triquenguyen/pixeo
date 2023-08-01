import Image from "next/image";
import Link from "next/link";
import SignUpForm from "../components/SignUpForm";

export default function Signup() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="py-10 px-8 border-2 border-black rounded-xl z-[1] flex items-center justify-center flex-col">
        <Link href="/">
          <Image alt="logo" height={50} src="/pixeo.svg" width={200} />
        </Link>
        <SignUpForm />
      </div>
    </div>
  );
}
