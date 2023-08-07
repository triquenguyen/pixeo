import Image from "next/image";
import AddPostBtn from "../post/AddPostBtn";
import ProfileBtn from "../user/ProfileBtn";

export default function Navbar({ firstName, lastName }) {
  const name = firstName + " " + lastName
  return (
    <div className="flex">
      <Image src="../../pixeo.svg" alt="logo" width={80} height={50} className="mr-auto" />
      <div className="flex gap-2 items-center">
        <AddPostBtn />
        <ProfileBtn />
        <h1>{name}</h1>
      </div>
    </div>
  )
}