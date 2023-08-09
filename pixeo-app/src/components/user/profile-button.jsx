import { motion } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { setShowProfile } from "@/redux/showProfileSlice";

export default function ProfileButton() {
  const { data: session } = useSession();
  const { data: profile } = useSWR(`/api/user/${session.user.id}`, (...args) =>
    fetch(...args).then((res) => res.json())
  );
  const dispatch = useDispatch();
  const show = useSelector((state) => state.showProfile.showProfile);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() =>
        show ? dispatch(setShowProfile(false)) : dispatch(setShowProfile(true))
      }
    >
      <Image
        alt="User Photo"
        className="rounded-full w-8 h-8"
        height={32}
        src={
          profile?.data?.photo_id
            ? `/api/photo/${profile.data.photo_id}`
            : "/user-circle.svg"
        }
        width={32}
      />
    </motion.div>
  );
}
