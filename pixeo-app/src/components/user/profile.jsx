import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import Button from "../inputs/button";
import Input from "../inputs/input";
import Backdrop from "../util/backdrop";
import { setShowProfile } from "@/redux/showProfileSlice";

const dropIn = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 500,
      damping: 25,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const fields = {
  first_name: "text",
  last_name: "text",
  email: "email",
  bio: "text",
  location: "text",
};

export default function Profile({ handleClose }) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { data: profileData, mutate } = useSWR(
    `/api/user/${session.user.id}`,
    (...args) => fetch(...args).then((res) => res.json())
  );

  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    email: "",
    bio: "",
    location: "",
  });

  useEffect(() => {
    setProfile({
      first_name: profileData.data.first_name,
      last_name: profileData.data.last_name,
      email: profileData.data.email,
      bio: profileData.data.bio,
      location: profileData.data.location,
      photo_id: profileData.data.photo_id,
    });
  }, [profileData]);

  const closeProfile = () => {
    dispatch(setShowProfile(false));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = profile;

    for (let key in payload)
      if (payload[key] === "" || payload[key] === profileData[key])
        delete payload[key];

    const res = await axios.patch(`/api/user/${session.user.id}`, profile);
    if (res.status === 200) {
      alert("Profile updated successfully");
      mutate();
      closeProfile();
    }
  };

  const handleChange = (e) =>
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => {
    const photo = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onloadend = async () => {
      axios
        .post("/api/photo", {
          filename: photo.name,
          filetype: photo.type,
          data: reader.result.replace(/^data:image\/\w+;base64,/, ""),
        })
        .then((res) => {
          setProfile((prev) => ({
            ...prev,
            photo_id: res.data.data.insertId,
          }));
        });
    };
  };

  const handleSignout = () => signOut({ redirect: true, callbackUrl: "/" });

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        animate="visible"
        className="flex flex-col gap-2 bg-white rounded-md pt-4 pb-8 px-8 items-center justify-center"
        exit="exit"
        initial="hidden"
        variants={dropIn}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          alt="bg"
          className="ml-auto hover:scale-110 active:scale-90"
          height={25}
          src="/close.png"
          width={25}
          onClick={handleClose}
        />
        <h1 className="text-2xl font-bold">Profile</h1>
        <form
          className="flex flex-col gap-[14px] items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-8 items-center">
            <div className="flex flex-col gap-[14px]">
              {Object.entries(fields).map(([name, type]) => (
                <Input
                  key={name}
                  name={name}
                  placeholder={name
                    .split("_")
                    .map((word) => word[0].toUpperCase() + word.slice(1))
                    .join(" ")}
                  type={name}
                  value={profile[name]}
                  onChange={handleChange}
                />
              ))}
              <Input name="photo" type="file" onChange={handleImageChange} />
            </div>
            <div className="w-60 h-60 rounded-2xl overflow-hidden relative">
              <Image
                fill
                alt="Preview"
                objectPosition="center"
                src={
                  profile?.photo_id
                    ? `/api/photo/${profile.photo_id}`
                    : "/user-circle.svg"
                }
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <Button type="submit">Update</Button>
            <Button
              className="px-3 py-2 bg-white border-2 rounded-md w-32 hover:border-black transition"
              onClick={handleSignout}
            >
              Sign Out
            </Button>
          </div>
        </form>
      </motion.div>
    </Backdrop>
  );
}
