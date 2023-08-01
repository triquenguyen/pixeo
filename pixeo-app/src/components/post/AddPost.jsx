import { setShowAddPost } from "@/pages/redux/showAddPostSlice";
import { motion } from 'framer-motion'
import Backdrop from "../Backdrop";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useState, useEffect, use } from "react";
import axios from "axios";

const initialPost = {
  title: '',
  body: '',
  userId: '',
  photo: Blob,
}

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

export default function AddPostBtn({ handleClose, id }) {
  const [post, setPost] = useState(initialPost)
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      setPost({ ...post, userId: id })
    }
  }, [post, id])

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e) => {
    const data = new FileReader()
    data.addEventListener('load', () => {
      setPost({
        ...post,
        photo: data.result
      })
    })

    data.readAsDataURL(e.target.files[0])

    // setPost({
    //   ...post,
    //   photo: e.target.files[0]
    // })
  }

  console.log(post.photo)

  const handleSubmit = async (e) => {
    console.log(post)
  }

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
        <h1 className='text-2xl font-bold'>Add Post</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[14px] items-center ">
          <input
            type="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            placeholder="Title" className="bg-[rgba(200,200,200,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:border-[#5c5c5c] focus:outline-none text-sm rounded-lg block p-2 mt-2" />

          <textarea
            type="body"
            name="body"
            value={post.body}
            onChange={handleChange}
            placeholder="Body" className="bg-[rgba(200,200,200,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:border-[#5c5c5c] focus:outline-none text-sm rounded-lg block p-2 mt-2"
          />

          <input
            type="file"
            name="photo"
            value={post.photo}
            priority={true}
            onChange={handleImageChange}
          />

          <button type="submit" className="px-3 py-2 bg-[#000] rounded-md text-white w-[25%]">Post</button>
        </form>
      </motion.div>
    </Backdrop>
  )
}