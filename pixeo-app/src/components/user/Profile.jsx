import { motion } from 'framer-motion'
import Backdrop from "../util/Backdrop";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';
import Input from '../inputs/input';
import Button from '../inputs/button';

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
  const [preview, setPreview] = useState('')
  const [photo, setPhoto] = useState(null)

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    photo: "",
    location: "",
    email: "",
  })

  // const closeProfile = () => { dispatch(setShowProfile(false)) }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await axios.put(`/api/profile/${session.user.id}`, profile)

    if (res.status === 200) {
      console.log(res.data)
    }

  }

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setPreview(URL.createObjectURL(file))
  }

  const handleSignout = () => {
    signOut({ redirect: true, callbackUrl: '/' })
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
        email: res.data.email,
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
              <div className="flex space-x-4">
                <Input
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  value={profile.firstName}
                  onChange={handleChange}
                />

                <Input
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  value={profile.lastName}
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

              <Input
                type="file"
                name="photo"
                value={photo}
                onChange={handleImageChange}
              />
            </div>
            {preview && <Image src={preview} width={300} height={300} alt="post photo" className='rounded-2xl'/>}
          </div>
          <div className='flex space-x-4'>
            <Button type="submit">Update</Button>
            <Button onClick={handleSignout} className="px-3 py-2 bg-white border-2 rounded-md w-32 hover:border-black transition">Sign Out</Button>
          </div>
        </form>


      </motion.div>
    </Backdrop>
  )
}