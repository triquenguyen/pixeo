import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setShowAddPost } from "@/pages/redux/showAddPostSlice";

export default function AddPostBtn() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.showAddPost.showAddPost);

  return(
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => show ? dispatch(setShowAddPost(false)) : dispatch(setShowAddPost(true))}>
      <Image src="/add-image.png" alt="logo" height={50} width={50} className="w-8 h-8" />
    </motion.div>
  )
}