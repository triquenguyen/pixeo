import Image from "next/image";
import Link from "next/link";
import Form from "@/components/signup/form";

export default function Signup() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 w-full max-w-sm border-gray-200 border shadow-lg rounded-xl space-y-8 flex items-center justify-center flex-col">
        <Link href="/">
          <Image alt="logo" height={50} src="/pixeo.svg" width={200} />
        </Link>
        <Form />
      </div>
    </div>
  );
}
