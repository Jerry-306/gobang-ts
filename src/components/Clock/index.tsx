import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getTime } from "../../utils/index";
import "./index.css";

export default function Clock() {
  const [nowTime, setNowTime] = useState<string>("");
  useEffect(() => {
    const timer = setInterval(() => {
      setNowTime(getTime());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const variants = {
    hidden: { opacity: 0, x: "-300px" },
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
      variants={variants}
      className="clock"
    >
      <img className="xiaoxin" alt="xiaoxin" src="xiaoxin.gif" />
      {nowTime}
    </motion.div>
  );
}
