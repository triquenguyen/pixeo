import { motion } from "framer-motion";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setShowAddPost } from "@/redux/showAddPostSlice";

export default function AddPostButton() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.showAddPost.showAddPost);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => dispatch(setShowAddPost(!show))}
    >
      <Image
        alt="add post"
        className="w-8 h-8"
        height={50}
        src="/add-image.png"
        width={50}
      />
    </motion.div>
  );
}
