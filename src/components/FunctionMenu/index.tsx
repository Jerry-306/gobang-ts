import { motion } from "framer-motion";
import FunctionButtons from "../FunctionButtons";
import Pattern from "../Pattern";
import "./index.css";

export default function FunctionMenu() {
  const variants = {
    hidden: { opacity: 0, x: "300px" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      },
    },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="function-menu-container"
    >
      <FunctionButtons />
      <Pattern />
    </motion.div>
  );
}
