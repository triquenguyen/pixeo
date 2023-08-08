import Image from "next/image";
import AddPostBtn from "../post/AddPostBtn";
import ProfileBtn from "../user/ProfileBtn";

export default function Navbar({ firstName, lastName }) {
  const name = firstName + " " + lastName
  return (
    <div className="flex items-center mb-8">
      <Image src="../../pixeo.svg" alt="logo" width={100} height={50} className="mr-auto" />
      <h1 className="mr-auto font-bold text-3xl">Pixeo Feed</h1>
      <div className="flex gap-2 items-center">
        <AddPostBtn />
        <ProfileBtn />
        <h1>{name}</h1>
      </div>
    </div>
  )
}