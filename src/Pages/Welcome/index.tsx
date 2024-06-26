import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./index.css";

export default function Welcome() {
  const whileHover = {
    scale: 1.1,
    color: "#FFA900",
    boxShadow:
      "0 0 10px #FFA900, 0 0 20px #efb75f, 0 0 40px #efb75f, 0 0 80px #efb75f, 0 0 160px #efb75f",
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };
  const whileTap = {
    scale: 0.9,
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };

  const nav = useNavigate();
  return (
    <div className="welcome-root">
      <h1>W E L C O M E</h1>
      <div id="container">
        <div className="ghost">
          <div className="body">
            <div className="face">
              <div className="eyes"> </div>
              <div className="dimples"> </div>
              <div className="mouth"> </div>
            </div>
            <div className="bottom">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="wave"></div>
            </div>
          </div>
          <div className="shadow"></div>
        </div>
      </div>
      <motion.div
        className="play-game"
        whileHover={whileHover}
        whileTap={whileTap}
        onClick={() => setTimeout(() => nav("/home"), 500)}
      >
        PLAY
      </motion.div>
    </div>
  );
}
