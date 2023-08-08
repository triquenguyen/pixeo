import Image from "next/image";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import useSWR from "swr";
import AddPostButton from "../post/add-post-button";
import ProfileButton from "../user/profile-button";

export default function Navbar() {
  const { data: session } = useSession();
  const { data: profile } = useSWR(
    `/api/profile/${session.user.id}`,
    (...args) => fetch(...args).then((res) => res.json()),
  );
  const name = useMemo(
    () => (profile ? profile.firstname + " " + profile.lastname : "Loading"),
    [profile?.firstname, profile?.lastname],
  );
  return (
    <div className="flex justify-between">
      <Image alt="logo" height={50} src="../../pixeo.svg" width={80} />
      <div className="flex gap-2 items-center">
        <AddPostButton />
        <ProfileButton />
        <h1>{name}</h1>
      </div>
    </div>
  );
}
