import { useRef } from "react";
import { useAnimationFrame, motion } from "framer-motion";
import "./index.css";

export default function Animation() {
  const ref = useRef<HTMLDivElement | null>(null);

  useAnimationFrame((t) => {
    if (ref.current) {
      const rotate = Math.sin(t / 10000) * 200;
      const y = (1 + Math.sin(t / 1000)) * -50;
      ref.current.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`;
    }
  });

  const start = {
    hidden: { y: -200 },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        duration: 1,
        bounce: 0.4,
        damping: 5,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={start}
      className="a_container"
    >
      <div className="cube" ref={ref}>
        <div className="side front" />
        <div className="side left" />
        <div className="side right" />
        <div className="side top" />
        <div className="side bottom" />
        <div className="side back" />
        <div className="side a_xiaoxin">
          <img className="a_xiaoxin_img" alt="xiaoxin" src="xiaoxin.gif" />
        </div>
      </div>
    </motion.div>
  );
}
