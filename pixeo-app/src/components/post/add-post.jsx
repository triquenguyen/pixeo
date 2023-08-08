import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import Input from "../inputs/input";
import Backdrop from "../util/backdrop";
import { setShowAddPost } from "@/redux/showAddPostSlice";

const initialPost = {
  title: "",
  body: "",
  userId: "",
};

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

export default function AddPostBtn({ handleClose, id }) {
  const [post, setPost] = useState(initialPost);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { mutate } = useSWR("/api/posts");

  const closeAddPost = () => {
    dispatch(setShowAddPost(false));
  };

  useEffect(() => {
    setPost((prev) => ({
      ...prev,
      userId: Number(id),
    }));

    return () => {
      setLoading(false);
    };
  }, [id, loading]);

  const handleChange = (e) => {
    setPost((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const photo = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onloadend = async () => {
      setPost((prev) => ({
        ...prev,
        photo: reader.result,
      }));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/posts", post);
      if (res.status === 200) {
        mutate();
        alert("Post added successfully");
        closeAddPost();
      }
    } catch (err) {
      alert(err.message);
    }
  };

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
        <h1 className="text-2xl font-bold">Add Post</h1>

        <form
          className="flex flex-col gap-[14px] items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-8 items-center">
            <div className="flex flex-col gap-[14px]">
              <Input
                name="title"
                placeholder="Title"
                type="text"
                value={post.title}
                onChange={handleChange}
              />

              <Input
                name="body"
                placeholder="Description"
                type="text"
                value={post.body}
                onChange={handleChange}
              />

              <input
                id="blob"
                name="photo"
                type="file"
                onChange={handleImageChange}
              />
            </div>
            <Image
              alt="Preview"
              height={200}
              src={post.photo || "/pixeo.svg"}
              width={200}
            />
          </div>
          <button
            className="px-3 py-2 bg-[#000] rounded-md text-white w-[25%]"
            type="submit"
          >
            Post
          </button>
        </form>
      </motion.div>
    </Backdrop>
  );
}
