import boardValues, {
  countdown,
  timer,
  isReviewing,
  gameOver,
  difficultyLevel,
} from "../../store/index";
import { useRecoilState, useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import Grid from "../Grid";
import { DifficultyLevel } from "../../types/index";
import "./index.css";

export default function CheckerBoard() {
  const variants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: 1,
      },
    },
  };
  const [count, setCount] = useRecoilState<number>(countdown);
  const [time, setTime] = useRecoilState<number>(timer);
  const isGameOver = useRecoilValue<boolean>(gameOver);
  const reviewing = useRecoilValue<boolean>(isReviewing);
  const level = useRecoilValue<DifficultyLevel>(difficultyLevel);

  function setTimer() {
    if (time) {
      clearInterval(time);
    }
    setCount(level * 5);
    const id = setInterval(() => {
      setCount((currVal) => currVal - 1);
      if (count <= 0) {
        clearInterval(id);
        setTime(0);
      }
    }, 1000);
    setTime(id);
  }
  const matrix = useRecoilValue(boardValues);
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="board"
    >
      {matrix.map((arr, row) =>
        arr.map((_, colum) => (
          <Grid
            key={`${row}-${colum}`}
            row={row}
            colum={colum}
            setTimer={setTimer}
          />
        ))
      )}
      {isGameOver || reviewing ? <div className="mask-disable"></div> : null}
    </motion.div>
  );
}
