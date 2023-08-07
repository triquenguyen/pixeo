import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setShowProfile } from "../../redux/showProfileSlice";

export default function ProfileBtn() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.showProfile.showProfile);

  return(
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => show ? dispatch(setShowProfile(false)) : dispatch(setShowProfile(true))}>
      <Image src="../../user-circle.svg" width={30} height={30} alt="User Photo"/>
    </motion.div>
  )
}