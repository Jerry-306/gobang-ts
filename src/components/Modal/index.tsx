import { showModal, isWin11 } from "../../store/index";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import { Winner } from "../../types/index";
import "./index.css";

interface Props {
  winner: Winner;
}

export default function Modal({ winner }: Props) {
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      // scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };
  const subVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring", // 弹簧
        duration: 0.4,
        bounce: 0.4, // 弹性
        damping: 6, // 振荡
      },
    },
  };
  const setShow = useSetRecoilState(showModal);
  const isWindows11 = useRecoilValue(isWin11);
  const handleClose = () => {
    setShow(false);
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="modal-container"
    >
      <motion.div
        variants={subVariants}
        initial="hidden"
        animate="visible"
        className="modal-content"
      >
        <img
          className="modal_xiaoxin"
          alt="xiaoxin"
          src="../../assets/xiaoxin_win.gif"
        />
        <p className="modal-title">恭喜</p>
        {isWindows11 ? (
          <span className="modal-winner">
            {winner === Winner.White ? "🐻‍❄️" : "🐻"}
          </span>
        ) : (
          <span className="modal-winner">
            {winner === Winner.Black ? "⚪" : "⚫"}
          </span>
        )}
        <p className="modal-desc">获得本局胜利</p>
        <span className="modal-close" onClick={handleClose}>
          ❌
        </span>
      </motion.div>
    </motion.div>
  );
}
