import { motion } from 'framer-motion'
import Backdrop from "../util/Backdrop";
import Image from "next/image";
import { useState, useEffect, use } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

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
    }
  },
  exit: {
    y: "100vh",
    opacity: 0,
  }
}

export default function Profile({ handleClose, }) {
  const { data: session, status } = useSession()

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    photo: "",
    location: "",
  })

  const closeProfile = () => { dispatch(setShowProfile(false)) }

  const handleSubmit = (e) => {
    console.log("haha")
  }

  useEffect(() => {
    const getProfile = async () => {
      const res = await axios.get(`/api/profile/${session.user.id}`)
      console.log(res.data)
      setProfile({
        firstName: res.data.firstname,
        lastName: res.data.lastname,
        bio: res.data.bio,
        photo: res.data.photo,
        location: res.data.location,
      })
    }
    getProfile()
  }, [])

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={e => e.stopPropagation()}
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='flex flex-col gap-2 bg-white rounded-md pt-4 pb-8 px-8 items-center justify-center'>

        <Image src='/close.png' width={25} height={25} alt='bg' onClick={handleClose} className='ml-auto hover:scale-110 active:scale-90' />
        <h1 className='text-2xl font-bold'>Profile</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[14px] items-center">
          <div className="flex gap-8 items-center">
            <div className="flex flex-col gap-[14px]">
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                // onChange={handleChange}
                placeholder={profile.firstName} className="bg-[rgba(200,200,200,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:border-[#5c5c5c] focus:outline-none text-sm rounded-lg block p-2 mt-2" />

              {/* <textarea
                type="text"
                name="body"
                value={post.body}
                onChange={handleChange}
                placeholder="Body" className="bg-[rgba(200,200,200,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:border-[#5c5c5c] focus:outline-none text-sm rounded-lg block p-2 mt-2"
              />

              <input
                type="file"
                name="photo"
                value={photo}
                onChange={handleImageChange}
              /> */}
            </div>
            {/* {preview && <Image src={preview} width={300} height={300} alt="post photo" />} */}
          </div>
          <button type="submit" className="px-3 py-2 bg-[#000] rounded-md text-white w-[25%]">Post</button>
        </form>
      </motion.div>
    </Backdrop>
  )
}