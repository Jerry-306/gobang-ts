import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import boardValues, {
  list,
  isReviewing,
  showModal,
  winner,
  steps,
  countdown,
  color,
  timer,
  autoPlayTimer,
  gameOver,
  gaming,
  difficultyLevel,
  isWin11,
} from "../../store/index";
import CheckerBoard from "../../components/CheckerBoard";
import TimeOutModal from "../../components/TimeOutModal";
import List from "../../components/List";
import Modal from "../../components/Modal";
import FunctionMenu from "../../components/FunctionMenu";
import Clock from "../../components/Clock";
import CountDown from "../../components/CountDown";
import alertWinner, { getTime } from "../../utils/index";
import {
  NumberMatrix,
  Obj,
  DifficultyLevel,
  Winner,
  Color,
} from "../../types/index";
import "./index.css";

function Home() {
  const matrix = useRecoilValue<NumberMatrix>(boardValues);
  const [listArray, setListArray] = useRecoilState<Obj[]>(list);
  const reviewing = useRecoilValue<boolean>(isReviewing);
  const [show, setShow] = useRecoilState<boolean>(showModal);
  const [curWinner, setCurWinner] = useRecoilState<Winner>(winner);
  const step = useRecoilValue<NumberMatrix>(steps);
  const [count, setCount] = useRecoilState<number>(countdown);
  const player = useRecoilValue<Color>(color);
  const [time, setTime] = useRecoilState<number>(timer);
  const [autoPlayTime, setAutoPlayTime] = useRecoilState<number>(autoPlayTimer);
  const setGameOver = useSetRecoilState<boolean>(gameOver);
  const setGaming = useSetRecoilState<boolean>(gaming);
  const level = useRecoilValue<DifficultyLevel>(difficultyLevel);
  const setIsWin11 = useSetRecoilState<boolean>(isWin11);

  // 五子棋获胜算法
  useEffect(() => {
    // 如果不是进行复盘
    if (reviewing === false) {
      const res: number = alertWinner(matrix);
      if (res !== 0) {
        setGaming(false);
        setCurWinner(res);
        setShow(true);
        setCount(level * 5);
        if (time) {
          clearInterval(time);
        }
        setTime(0);
        if (autoPlayTime) {
          clearTimeout(autoPlayTime);
        }
        setAutoPlayTime(0);
        const obj: Obj = {
          time: getTime(),
          winner: res,
          step: step,
        };
        const array = [...listArray];
        array.unshift(obj);
        setListArray(array);
        setGameOver(true);
      }
    }
  }, [matrix]);

  const setStorage = () => {
    localStorage.setItem("historyList", JSON.stringify(listArray));
  };

  useEffect(() => {
    window.addEventListener("beforeunload", setStorage);
    return () => {
      window.removeEventListener("beforeunload", setStorage);
    };
  });

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (
      /Windows NT/.test(userAgent) &&
      !/Windows NT 5|Windows NT 6/.test(userAgent)
    ) {
      const platformVersion = userAgent.match(/Windows NT (\d+\.\d+)/)?.[1];
      if (platformVersion && parseFloat(platformVersion.split(".")[0]) >= 10) {
        setIsWin11(true);
      }
    }
  }, []);

  return (
    <div className="app">
      <CheckerBoard />
      <List />
      <FunctionMenu />
      {show ? <Modal winner={curWinner} /> : null}
      <Clock />
      <CountDown />
      {count <= 0 ? <TimeOutModal player={player} /> : null}
    </div>
  );
}

export default Home;
