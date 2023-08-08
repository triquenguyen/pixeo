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

export default function Profile({ handleClose }) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { data: profileData, mutate } = useSWR(
    `/api/profile/${session.user.id}`,
    (...args) => fetch(...args).then((res) => res.json()),
  );
  const [preview, setPreview] = useState("");

  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    email: "",
    bio: "",
    location: "",
  });

  useEffect(() => {
    setProfile({
      firstname: profileData.firstname,
      lastname: profileData.lastname,
      email: profileData.email,
      bio: profileData.bio,
      location: profileData.location,
    });
  }, [profileData]);

  const closeProfile = () => {
    dispatch(setShowProfile(false));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const photo = e.target.photo.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onloadend = async () => {
      const res = await axios.put(`/api/profile/${session.user.id}`, {
        ...profile,
        photo: reader.result,
      });
      if (res.status === 200) {
        alert("Profile updated successfully");
        mutate();
        closeProfile();
      }
    };
  };

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleImageChange = (e) =>
    setPreview(URL.createObjectURL(e.target.files[0]));

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
              <div className="flex space-x-4">
                <Input
                  name="firstname"
                  placeholder="First Name"
                  type="text"
                  value={profile.firstname}
                  onChange={handleChange}
                />

                <Input
                  name="lastname"
                  placeholder="Last Name"
                  type="text"
                  value={profile.lastname}
                  onChange={handleChange}
                />
              </div>

              <Input
                name="email"
                placeholder="Email"
                type="text"
                value={profile.email}
                onChange={handleChange}
              />

              <Input
                name="bio"
                placeholder="Bio"
                type="text"
                value={profile.bio}
                onChange={handleChange}
              />

              <Input
                name="location"
                placeholder="Location"
                type="text"
                value={profile.location}
                onChange={handleChange}
              />

              <Input name="photo" type="file" onChange={handleImageChange} />
            </div>
            {preview && (
              <Image
                alt="Preview"
                className="rounded-2xl"
                height={300}
                src={preview}
                width={300}
              />
            )}
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
