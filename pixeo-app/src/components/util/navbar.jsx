import Image from "next/image";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import useSWR from "swr";
import AddPostButton from "../post/add-post-button";
import ProfileButton from "../user/profile-button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between">
      <Image alt="logo" height={50} src="../../pixeo.svg" width={80} />
      <div className="flex gap-2 items-center">
        <AddPostButton />
        <ProfileButton />
        <h1>{session.user.name}</h1>
      </div>
    </div>
  );
}
