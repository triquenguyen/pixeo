import Image from "next/image";
import AddPostBtn from "./Post/AddPostBtn";

export default function Navbar({ firstName, lastName }) {
  const name = firstName + " " + lastName
  return (
    <div className="flex">
      <Image src="../../pixeo.svg" alt="logo" width={80} height={50} className="mr-auto" />
      <div className="flex gap-2 items-center">
        <AddPostBtn />
        <Image src="../../user-circle.svg" width={30} height={50} />
        <h1>{name}</h1>
      </div>
    </div>
  )
}