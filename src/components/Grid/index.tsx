import { useRecoilState, useRecoilValue } from "recoil";
import boardValues, {
  color,
  steps,
  subSteps,
  autoPlayTimer,
  gamePattern,
  gaming,
  difficultyLevel,
  isWin11,
} from "../../store/index";
import useHover from "../../Hooks/useHover";
import { autoPlay } from "../../utils/index";
import { BoardValue, NumberMatrix, DifficultyLevel, GamePattern, Color } from "../../types/index";
import "./index.css";

interface Props {
  row: number;
  colum: number;
  setTimer: () => void;
}

export default function Grid({ row, colum, setTimer }: Props) {
  const [hoverRef, isHovering] = useHover();
  const [matrix, setMatrix] = useRecoilState<NumberMatrix>(boardValues);
  const [curColor, setCurColor] = useRecoilState<Color>(color);
  const [stepArray, setStepArray] = useRecoilState<NumberMatrix>(steps);
  const [subStepArray, setSubStepArray] = useRecoilState<NumberMatrix>(subSteps);
  const [autoPlayTime, setAutoPlayTime] = useRecoilState<number>(autoPlayTimer);
  const [isGaming, setIsGaming] = useRecoilState<boolean>(gaming);
  const pattern = useRecoilValue<GamePattern>(gamePattern);
  const level = useRecoilValue<DifficultyLevel>(difficultyLevel);
  const isWindows11 = useRecoilValue<boolean>(isWin11);

  const handleClick = () => {
    if (matrix[row][colum] === BoardValue.Empty) {
      !isGaming && setIsGaming(true);
      setTimer();
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
      setMatrix(arr);
      // 更新 step 和 subStep
      const stepArrayNew = [...stepArray, [row, colum, curColor]];
      setStepArray(stepArrayNew);
      const subStepArrayNew = [...subStepArray, [row, colum, curColor]];
      setSubStepArray(subStepArrayNew);
      // 更新下一个棋子颜色
      setCurColor(curColor === Color.White ? Color.Black : Color.White);
      if (pattern === GamePattern.HumanVsMachine) {
        // 自动下棋
        if (autoPlayTime) {
          clearTimeout(autoPlayTime);
        }
        const autoPlayTimeId = setTimeout(
          () =>
            autoClick(
              arr,
              curColor === Color.White ? Color.Black : Color.White,
              stepArrayNew,
              subStepArrayNew
            ),
          level * 300
        );
        setAutoPlayTime(autoPlayTimeId);
      }
    }
  };

  const autoClick = (matrix: NumberMatrix, curColor: Color, stepArrayNew: NumberMatrix, subStepArrayNew: NumberMatrix) => {
    const [row, colum] = autoPlay(matrix, curColor);
    // setTimer();
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
    setStepArray([...stepArrayNew, [row, colum, curColor]]);
    setSubStepArray([...subStepArrayNew, [row, colum, curColor]]);
    setMatrix(arr);
    // 更新下一个棋子颜色
    setCurColor(curColor === Color.White ? Color.Black : Color.White);
  };

  return (
    <div ref={hoverRef} className="container" onClick={handleClick}>
      {isWindows11
        ? matrix[row][colum] !== BoardValue.Empty
          ? matrix[row][colum] === BoardValue.White
            ? "🐻‍❄️"
            : "🐻"
          : isHovering
            ? "💢"
            : ""
        : matrix[row][colum] !== BoardValue.Empty
          ? matrix[row][colum] === BoardValue.White
            ? "⚪"
            : "⚫"
          : ""}
    </div>
  );
}
