import boardValues, {
  list,
  isReviewing,
  reviewEnd,
  isWin11,
} from "../../store/index";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { motion } from "framer-motion";
import { NumberMatrix, Obj, Winner } from "../../types/index";
import "./index.css";

interface Props {
  index: number;
  time: string;
  winner: Winner;
}

const ListItem = (props: Props) => {
  const { index, time, winner } = props;
  const setMatrix = useSetRecoilState<NumberMatrix>(boardValues);
  const listArray = useRecoilValue<Obj[]>(list);
  const setReviewing = useSetRecoilState<boolean>(isReviewing);
  const [isReviewEnd, setIsReviewEnd] = useRecoilState<boolean>(reviewEnd);
  const isWindows11 = useRecoilValue<boolean>(isWin11);

  const handleReview = (): void => {
    if (isReviewEnd === false) {
      return;
    }
    setIsReviewEnd(false);
    setReviewing(true);
    // 防止出现对象浅复制
    const subMatrix: NumberMatrix = new Array(19)
      .fill(0)
      .map(() => new Array(19).fill(0));
    const emptyMatrix: NumberMatrix = new Array(19)
      .fill(0)
      .map(() => new Array(19).fill(0));
    // 如果当前棋盘不为空，棋盘先清零
    setMatrix(emptyMatrix);
    // 步骤
    const steps: NumberMatrix = listArray[index - 1].step;
    const n = steps.length;
    // 每隔一秒复现一次棋子位置 —— 内存消耗会有点大
    for (let i = 0; i < n; i++) {
      const [row, colum, value] = steps[i];
      setTimeout(() => {
        subMatrix[row][colum] = value;
        const arr: NumberMatrix = [];
        subMatrix.forEach((array) => {
          const temp: number[] = [];
          array.forEach((x) => {
            temp.push(x);
          });
          arr.push(temp);
        });
        // 不能直接将subMatrix更新给matrix，因为这会使subMatrix变成只读矩阵
        setMatrix(arr);
        // 复盘结束
        if (i === n - 1) {
          setIsReviewEnd(true);
        }
      }, i * 1000);
    }
  };

  const item = {
    hidden: { x: -300 },
    show: {
      x: 0,
      transition: {
        type: "spring", // 弹簧
        duration: 1,
        bounce: 0.4, // 弹性
        damping: 9, // 振荡
      },
    },
  };
  const hover = {
    scale: 1.05,
    boxShadow: "0px 0px 0px #dbdbdb inset, 0 0 30px #f9ca6c",
  };

  return (
    <motion.div
      variants={item}
      initial="hidden"
      animate="show"
      whileHover={hover}
      className="listitem-container"
    >
      <div className="listitem-index">{index}</div>
      <div className="listitem-time">{time}</div>
      {isWindows11 ? (
        <div className="listitem-winner">
          {winner === Winner.White ? "🐻‍❄️" : "🐻"}
        </div>
      ) : (
        <div className="listitem-winner">
          {winner === Winner.White ? "⚪" : "⚫"}
        </div>
      )}
      <div className="listitem-review" onClick={handleReview}>
        👁️‍🗨️
      </div>
    </motion.div>
  );
};

export default ListItem;
