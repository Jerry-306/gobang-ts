import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import boardValues, {
  color,
  isReviewing,
  steps,
  subSteps,
  timer,
  countdown,
  gameOver,
  reviewEnd,
  gaming,
  difficultyLevel,
  timeoutCount
} from "../../store/index";
import { NumberMatrix, DifficultyLevel, Color } from "../../types/index";
import "./index.css";

const FunctionButtons = () => {
  const [selectedColor, setSelectedColor] = useRecoilState<Color>(color);
  const [matrix, setMatrix] = useRecoilState<NumberMatrix>(boardValues);
  const setReviewing = useSetRecoilState<boolean>(isReviewing);
  const [step, setStep] = useRecoilState<NumberMatrix>(steps);
  const [subStep, setSubStep] = useRecoilState<NumberMatrix>(subSteps);
  const [time, setTime] = useRecoilState<number>(timer);
  const [count, setCount] = useRecoilState<number>(countdown);
  const setGameOver = useSetRecoilState<boolean>(gameOver);
  const isReviewEnd = useRecoilValue<boolean>(reviewEnd);
  const setGaming = useSetRecoilState<boolean>(gaming);
  const level = useRecoilValue<DifficultyLevel>(difficultyLevel);
  const setTimeoutCount = useSetRecoilState<number[]>(timeoutCount);


  const handleReset = (): void => {
    const newMatrix: NumberMatrix = new Array(19).fill(0).map(() => new Array(19).fill(0));
    setMatrix(newMatrix);
    setStep([]);
    setSelectedColor(Color.Black);
    setReviewing(false);
    setCount(level * 5);
    if (time) {
      clearInterval(time);
    }
    setTime(0);
    setGameOver(false);
    setGaming(false);
    setTimeoutCount([0, 0]);
  };

  const handleGoback = (): void => {
    const temp: NumberMatrix = [...subStep];
    if (temp.length !== 0) {
      //1、 取出上一步的信息
      const [row, colum, value] = temp.pop() || [];
      //2、 更新步骤step 和 subStep
      setStep([...step, [row, colum, 0]]);
      setSubStep(temp);
      //3、 更新棋盘 matrix
      const arr: NumberMatrix = [];
      matrix.forEach((array) => {
        const subArr: number[] = [];
        array.forEach((val) => {
          subArr.push(val);
        });
        arr.push(subArr);
      });
      arr[row][colum] = 0;
      setMatrix(arr);
      //4、更新棋子颜色
      setSelectedColor(value);
      if (time) {
        clearInterval(time);
      }
      setCount(15);
      const id = setInterval(() => {
        setCount((n) => n - 1);
        if (count <= 0) {
          clearInterval(id);
          setTime(0);
        }
      }, 1000);
      setTime(id);
    }
  };

  const whileHover = {
    scale: 1.1,
    boxShadow: "0px 0px 10px #dbdbdb inset, 0 0 50px #f9ca6c",
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
      className="btnsContainer"
    >
      <motion.div
        whileHover={whileHover}
        whileTap={whileTap}
        className="white"
        onClick={() => setSelectedColor(Color.White)}
      >
        {selectedColor === Color.White && "👻"}
      </motion.div>
      <motion.div
        whileHover={whileHover}
        whileTap={whileTap}
        className="goback"
        onClick={handleGoback}
      >
        悔棋
      </motion.div>
      <motion.div
        whileHover={whileHover}
        whileTap={whileTap}
        className="reset"
        onClick={handleReset}
      >
        重置
      </motion.div>
      <motion.div
        whileHover={whileHover}
        whileTap={whileTap}
        className="black"
        onClick={() => setSelectedColor(Color.Black)}
      >
        {selectedColor === Color.Black && "👻"}
      </motion.div>
      {isReviewEnd ? null : <div className="mask-disable"></div>}
    </motion.div>
  );
};

export default FunctionButtons;
