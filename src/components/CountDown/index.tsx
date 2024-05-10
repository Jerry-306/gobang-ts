import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { countdown } from "../../store/index";
import "./index.css";

export default function CountDown() {
  const count = useRecoilValue<number>(countdown);
  const countdownContainer = {
    hidden: { opacity: 0, x: "300px" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 1,
        duration: 1,
      },
    },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={countdownContainer}
      className="countdown"
    >
      ⏱️{count <= 0 ? "时间到" : count + " s"}
    </motion.div>
  );
}
