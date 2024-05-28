import boardValues, {
  countdown,
  difficultyLevel,
  isWin11,
  timeoutCount,
  steps,
  subSteps,
  color,
  gamePattern,
  autoPlayTimer,
} from "../../store/index";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { motion } from "framer-motion";
import { autoPlay } from "../../utils/index";
import {
  NumberMatrix,
  DifficultyLevel,
  GamePattern,
  Color,
} from "../../types/index";
import "./index.css";

interface Props {
  player: Color;
}

interface AutoClickReturn {
  matrix: NumberMatrix;
  curColor: Color;
  stepArray: NumberMatrix;
  subStepArray: NumberMatrix;
}

export default function Modal({ player }: Props) {
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
  const setCount: (count: number) => void =
    useSetRecoilState<number>(countdown);
  const level = useRecoilValue<DifficultyLevel>(difficultyLevel);
  const isWindows11: boolean = useRecoilValue<boolean>(isWin11);
  const [curColor, setCurColor] = useRecoilState<Color>(color);
  const [timeOutCount, setTimeOutCount] =
    useRecoilState<number[]>(timeoutCount);
  const [matrix, setMatrix] = useRecoilState<NumberMatrix>(boardValues);
  const [stepArray, setStepArray] = useRecoilState<NumberMatrix>(steps);
  const [subStepArray, setSubStepArray] =
    useRecoilState<NumberMatrix>(subSteps);
  const pattern = useRecoilValue<GamePattern>(gamePattern);
  const [autoPlayTime, setAutoPlayTime] = useRecoilState<number>(autoPlayTimer);

  const handleClose = (): void => {
    setCount(level * 5);
    let [whiteTimeoutCount, blackTimeoutCount] = timeOutCount;
    curColor === Color.White && whiteTimeoutCount++;
    curColor === Color.Black && blackTimeoutCount++;
    setTimeOutCount([whiteTimeoutCount, blackTimeoutCount]);
    if (timeOutCount[curColor - 1] >= 3) {
      // 系统自动为选手选择下一步棋子位置
      const res: AutoClickReturn = autoClick(
        matrix,
        curColor,
        stepArray,
        subStepArray
      );
      if (pattern === GamePattern.HumanVsMachine) {
        // 自动下棋
        if (autoPlayTime) {
          clearTimeout(autoPlayTime);
        }
        const autoPlayTimeId = setTimeout(
          () =>
            autoClick(
              res.matrix,
              res.curColor,
              res.stepArray,
              res.subStepArray
            ),
          level * 300
        );
        setAutoPlayTime(autoPlayTimeId);
      }
    }
  };

  const autoClick = (
    matrix: NumberMatrix,
    curColor: Color,
    stepArray: NumberMatrix,
    subStepArray: NumberMatrix
  ): AutoClickReturn => {
    const [row, colum] = autoPlay(matrix, curColor);
    // 对象深拷贝
    const arr: NumberMatrix = [];
    matrix.forEach((array) => {
      const temp: number[] = [];
      array.forEach((x) => {
        temp.push(x);
      });
      arr.push(temp);
    });
    arr[row][colum] = curColor;
    // 更新 step 和 subStep
    const stepArrayNew = [...stepArray, [row, colum, curColor]];
    const subStepArrayNew = [...subStepArray, [row, colum, curColor]];
    setStepArray(stepArrayNew);
    setSubStepArray(subStepArrayNew);
    setMatrix(arr);
    // 更新下一个棋子颜色
    setCurColor(curColor === Color.White ? Color.Black : Color.White);
    return {
      stepArray: stepArrayNew,
      subStepArray: subStepArrayNew,
      matrix: arr,
      curColor: curColor === Color.White ? Color.Black : Color.White,
    };
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="timeout-modal-container"
    >
      <motion.div
        variants={subVariants}
        initial="hidden"
        animate="visible"
        className="timeout-modal-content"
      >
        <img
          className="timeout-modal-xiaoxin"
          alt="xiaoxin"
          src="../../assets/xiaoxin_win.gif"
        />
        <p className="timeout-modal-title">您思考时间太长了哦！</p>
        {isWindows11 ? (
          <span className="timeout-modal-player">
            {player === Color.White ? "🐻‍❄️" : "🐻"}
          </span>
        ) : (
          <span className="timeout-modal-player">
            {player === Color.White ? "⚪" : "⚫"}
          </span>
        )}
        <p className="timeout-modal-desc">
          {timeOutCount[curColor - 1] < 3
            ? "超时3次以上，系统将自动为您选择下一步棋子位置！"
            : "您已超时3次，系统自动为您选择下一步棋子位置！"}
        </p>
        <span className="timeout-modal-close" onClick={handleClose}>
          ❌
        </span>
      </motion.div>
    </motion.div>
  );
}
