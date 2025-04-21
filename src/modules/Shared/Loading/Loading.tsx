import { BeatLoader } from "react-spinners";
import { motion } from "framer-motion";
import logo from '../../../assets/nav-logo.png';

export default function Loading() {
  return (
    <motion.div
      className="d-flex flex-column text-center justify-content-center align-items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{minHeight:'300px'}}
    >
      <motion.img
        src={logo}
        alt="logo"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        style={{ width: "80px", height: "auto", marginBottom: "1rem" }}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <BeatLoader size={18} color="#EF9B28" />
      </motion.div>
    </motion.div>
  );
}
