import {
  gamePattern,
  difficultyLevel,
  gaming,
  countdown,
} from "../../store/index";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { motion } from "framer-motion";
import { DifficultyLevel, GamePattern } from "../../types/index";
import "./index.css";

export default function Pattern() {
  const [pattern, setPattern] = useRecoilState<GamePattern>(gamePattern);
  const [level, setLevel] = useRecoilState<DifficultyLevel>(difficultyLevel);
  const isGaming = useRecoilValue<boolean>(gaming);
  const setCount: (count: number) => void =
    useSetRecoilState<number>(countdown);

  const changeDifficulty = (tag: DifficultyLevel): void => {
    setLevel(tag);
    setCount(tag * 5);
  };

  const whileHover = {
    scale: 1.1,
    boxShadow: "0px 0px 0px #dbdbdb inset, 0 0 50px #f9ca6c",
  };
  const whileTap = { scale: 0.9 };
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
      className="pattern-container"
    >
      <motion.div
        whileHover={whileHover}
        whileTap={whileTap}
        className={[
          "pattern-item",
          pattern === GamePattern.HumanVsMachine ? "active" : "",
        ].join(" ")}
        onClick={() => setPattern(GamePattern.HumanVsMachine)}
      >
        人机对战
      </motion.div>
      <motion.div
        whileHover={whileHover}
        whileTap={whileTap}
        className={[
          "pattern-item",
          pattern === GamePattern.HumanVsHuman ? "active" : "",
        ].join(" ")}
        onClick={() => setPattern(GamePattern.HumanVsHuman)}
      >
        双人对战
      </motion.div>
      <motion.div
        whileHover={whileHover}
        whileTap={whileTap}
        className={[
          "difficulty-level",
          level === DifficultyLevel.Easy ? "active" : "",
        ].join(" ")}
        onClick={() => changeDifficulty(DifficultyLevel.Easy)}
      >
        简单
      </motion.div>
      <motion.div
        whileHover={whileHover}
        whileTap={whileTap}
        className={[
          "difficulty-level",
          level === DifficultyLevel.Medium ? "active" : "",
        ].join(" ")}
        onClick={() => changeDifficulty(DifficultyLevel.Medium)}
      >
        中等
      </motion.div>
      <motion.div
        whileHover={whileHover}
        whileTap={whileTap}
        className={[
          "difficulty-level",
          level === DifficultyLevel.Hard ? "active" : "",
        ].join(" ")}
        onClick={() => changeDifficulty(DifficultyLevel.Hard)}
      >
        困难
      </motion.div>
      {isGaming ? <div className="mask-disable"></div> : null}
    </motion.div>
  );
}
