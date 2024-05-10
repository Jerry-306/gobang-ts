// 数字二维数组
export type NumberMatrix = number[][];

// 每局游戏结束时的数据结构
export type Obj = {
  time: string;
  winner: Winner;
  step: NumberMatrix;
};

// 游戏模式 1：人机对战；2：双人对战
export enum GamePattern {
  HumanVsMachine = 1,
  HumanVsHuman = 2,
}

// 游戏难度 3：简单；2：中等；1：困难
export enum DifficultyLevel {
  Easy = 3,
  Medium = 2,
  Hard = 1,
}

// 本局获胜者 1、白子， 2、黑子
export enum Winner {
  White = 1,
  Black = 2,
}

// 当前棋子颜色 1: 白色  2: 黑色
export enum Color {
  White = 1,
  Black = 2,
}

// 棋盘状态 0: 空  1: 白子  2: 白子
export enum BoardValue {
  Empty = 0,
  White = 1,
  Black = 2,
}
