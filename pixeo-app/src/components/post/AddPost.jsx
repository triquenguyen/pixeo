import { setShowAddPost } from "../../redux/showAddPostSlice";
import { motion } from 'framer-motion'
import Backdrop from "../util/Backdrop";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

const initialPost = {
  title: '',
  body: '',
  userId: '',
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
  const [preview, setPreview] = useState('')
  const [photo, setPhoto] = useState(null)

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
    const file = e.target.files[0];

    setPreview(URL.createObjectURL(file))

    setPhoto(file)
  }

  // console.log(URL.createObjectURL(file))

    // // Read the selected file as a Blob
    // const reader = new FileReader();
    // reader.onload = () => {
    //   console.log(reader.result)

    //   const blob = new Blob([reader.result], { type: file.type });

    //   console.log(blob)

    //   console.log(URL.createObjectURL(blob) )

    //   setPost({
    //     ...post,
    //     photo: URL.createObjectURL(blob),
    //   });
    // };
    // reader.readAsArrayBuffer(file);

    // const reader = new FileReader();
    // reader.onload = () => {
    //   console.log(reader.result)

    //   setPost({
    //     ...post,
    //     photo: URL.createObjectURL(file),
    //   });
    // };

    // reader.readAsArrayBuffer(file);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', post.title)
    formData.append('body', post.body)
    formData.append('userId', post.userId)
    formData.append('photo', photo)
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-[14px] items-center">
          <div className="flex gap-8 items-center">
            <div className="flex flex-col gap-[14px]">
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
                value={photo}
                onChange={handleImageChange}
              />
            </div>
            {/* {preview && <Image src={preview} width={300} height={300} alt="post photo" />} */}

            <h1>{preview}</h1>
          </div>
          <button type="submit" className="px-3 py-2 bg-[#000] rounded-md text-white w-[25%]">Post</button>
        </form>
      </motion.div>
    </Backdrop>
  )
}