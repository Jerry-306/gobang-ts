import { atom } from "recoil";

import { NumberMatrix, DifficultyLevel, GamePattern, Winner } from "../types/index";

// 棋盘数据
const boardValues = atom({
  key: "boardValues",
  default: new Array(19).fill(0).map(() => new Array(19).fill(0)),
});

// 当前棋子颜色 1: 白色  2: 黑色
export const color = atom({
  key: "color",
  default: 2,
});

// 历史记录数据
export const list = atom({
  key: "list",
  default: JSON.parse(localStorage.getItem("historyList") || "[]"),
});

// 是否在复盘中——如果在，则不执行五子棋判断输赢函数，反之执行
export const isReviewing = atom({
  key: "isReviewing",
  default: false,
});

// 是否弹窗
export const showModal = atom({
  key: "showModal",
  default: false,
});

// 本局获胜者 1、白子， 2、黑子
export const winner = atom<Winner>({
  key: "winner",
  default: Winner.White,
});

// 记录每一局步骤，方便动画进行复盘
export const steps = atom<NumberMatrix>({
  key: "steps",
  default: [],
});

// 用于处理悔棋的steps数组
export const subSteps = atom<NumberMatrix>({
  key: "subSteps",
  default: [],
});

// 倒计时
export const countdown = atom({
  key: "countdown",
  default: 15,
});

// 倒计时的定时器
export const timer = atom({
  key: "timer",
  default: 0,
});

// 自动下棋的定时器
export const autoPlayTimer = atom({
  key: "autoPlayTimer",
  default: 0,
});

// 游戏结束标识
export const gameOver = atom({
  key: "gameOver",
  default: false,
});

// 复盘是否结束
export const reviewEnd = atom({
  key: "reviewEnd",
  default: true,
});

// 游戏模式 1：人机对战；2：双人对战
export const gamePattern = atom<GamePattern>({
  key: "gamePattern",
  default: GamePattern.HumanVsMachine,
});

// 游戏难度 3：简单；2：中等；1：困难
export const difficultyLevel = atom<DifficultyLevel>({
  key: "difficultyLevel",
  default: DifficultyLevel.Easy,
});

// 游戏进行中
export const gaming = atom({
  key: "gaming",
  default: false,
});

//  是否是win11版本
export const isWin11 = atom({
  key: "isWin11",
  default: false,
});

// 超时次数
export const timeoutCount = atom({
  key: "timeoutCount",
  default: [0, 0],
})

export default boardValues;
