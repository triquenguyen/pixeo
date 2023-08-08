import { motion } from "framer-motion";

export default function Backdrop({ children, onClick }) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
