import { NumberMatrix } from "../types/index";

function isWin(
  matrix: NumberMatrix,
  row: number,
  colum: number,
  val: number
): boolean {
  const n = matrix.length;
  let count = 0;
  // 行是否有五个棋子
  for (let j = colum; j < n; j++) {
    if (matrix[row][j] === val) {
      count++;
      if (count === 5) {
        return true;
      }
    } else {
      break;
    }
  }
  count = 0;
  // 列是否有五个棋子
  for (let i = row; i < n; i++) {
    if (matrix[i][colum] === val) {
      count++;
      if (count === 5) {
        return true;
      }
    } else {
      break;
    }
  }
  count = 0;
  // 左下角是否有五个棋子
  for (let i = row, j = colum; i < n && j >= 0; i++, j--) {
    if (matrix[i][j] === val) {
      count++;
      if (count === 5) {
        return true;
      }
    } else {
      break;
    }
  }
  count = 0;
  // 右下角是否有五个棋子
  for (let i = row, j = colum; i < n && j < n; i++, j++) {
    if (matrix[i][j] === val) {
      count++;
      if (count === 5) {
        return true;
      }
    } else {
      break;
    }
  }
  // 如果始终没有找到5个棋子连成一排
  return false;
}

function alertWinner(matrix: NumberMatrix): number {
  let winner = 0;
  /*算法核心代码 */
  for (let i = 0; i < 19; i++) {
    for (let j = 0; j < 19; j++) {
      const val = matrix[i][j];
      if (val !== 0) {
        if (isWin(matrix, i, j, val)) {
          winner = val;
          return winner;
        }
      }
    }
  }
  return winner;
}

export function getTime(): string {
  const time = new Date();
  let hour: number | string = time.getHours();
  let minute: number | string = time.getMinutes();
  let second: number | string = time.getSeconds();
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  return `${hour}:${minute}:${second}`;
}

// 评估函数，评估在给定位置下棋的价值
function evaluate(
  board: NumberMatrix,
  row: number,
  col: number,
  player: number
): number {
  let value = 0;
  let c1 = 1,
    c2 = 1,
    c3 = 1,
    c4 = 1;
  // 计算当前位置的连续子数
  // 行
  for (let j = col + 1; j < board.length; j++) {
    if (board[row][j] === player) {
      c1++;
    } else {
      break;
    }
  }
  for (let j = col - 1; j >= 0; j--) {
    if (board[row][j] === player) {
      c1++;
    } else {
      break;
    }
  }

  // 列
  for (let i = row + 1; i < board.length; i++) {
    if (board[i][col] === player) {
      c2++;
    } else {
      break;
    }
  }
  for (let i = row - 1; i >= 0; i--) {
    if (board[i][col] === player) {
      c2++;
    } else {
      break;
    }
  }
  // 45*
  for (let i = row + 1, j = col - 1; i < board.length && j >= 0; i++, j--) {
    if (board[i][j] === player) {
      c3++;
    } else {
      break;
    }
  }
  for (let i = row - 1, j = col + 1; i >= 0 && j < board.length; i--, j++) {
    if (board[i][j] === player) {
      c3++;
    } else {
      break;
    }
  }
  // -45*
  for (
    let i = row + 1, j = col + 1;
    i < board.length && j < board.length;
    i++, j++
  ) {
    if (board[i][j] === player) {
      c4++;
    } else {
      break;
    }
  }
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === player) {
      c4++;
    } else {
      break;
    }
  }

  value += Math.max(c1, c2, c3, c4);
  return value;
}

// 自动下棋函数，根据当前棋盘，选择最佳位置落子
function autoPlacePiece(board: NumberMatrix, player: number): number[] {
  let maxValue = -Infinity;
  let maxRow = 0;
  let maxCol = 0;

  // 计算棋盘的行数和列数的一半，得到中心点
  const rows = board.length;
  const cols = board[0].length;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === 0) {
        const value = evaluate(board, i, j, player);
        if (value > maxValue) {
          maxValue = value;
          maxRow = i;
          maxCol = j;
        }
      }
    }
  }

  return [maxValue, maxRow, maxCol];
}

// 结合自动下棋和防守功能的函数
export function autoPlay(board: NumberMatrix, player: number): number[] {
  const opponent = player === 1 ? 2 : 1;
  const autoPlayValue = autoPlacePiece(board, player); // 自动下棋的价值评估结果
  const autoDefendValue = autoPlacePiece(board, opponent); // 自动防守的价值评估结果
  let maxRow = -1;
  let maxCol = -1;

  // 比较自动下棋和防守的价值评估结果，选择最优位置落子
  if (autoPlayValue[0] >= autoDefendValue[0]) {
    maxRow = autoPlayValue[1];
    maxCol = autoPlayValue[2];
  } else {
    maxRow = autoDefendValue[1];
    maxCol = autoDefendValue[2];
  }

  return [maxRow, maxCol];
}

export default alertWinner;
