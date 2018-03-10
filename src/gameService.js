export const doesWinByVerticalLine = (symbol, lineIndex, board) => {
  return board.every(row => row[lineIndex] === symbol);
};

export const doesWinByHorizontalLine = (symbol, lineIndex, board) => {
  return board[lineIndex].every(s => s === symbol);
};

export const doesWinByDiagonalLine = (symbol, board) => {
  const leftTopToBottomRightIndexes = [[0, 0], [1, 1], [2, 2]];
  const rightTopToBottomLeftIndexes = [[0, 2], [1, 1], [2, 0]];

  return [
    leftTopToBottomRightIndexes,
    rightTopToBottomLeftIndexes
  ].some(indexes =>
    indexes.every(([ rowIndex, columnIndex ]) => board[rowIndex][columnIndex] === symbol)
  );
};

const isWin = (symbol, board) => {
  let win = false;

  [0, 1, 2].forEach(rowIndex => {
    if (doesWinByHorizontalLine(symbol, rowIndex, board)) {
      win = true;
    }
  });

  [0, 1, 2].forEach(columnIndex => {
    if (doesWinByVerticalLine(symbol, columnIndex, board)) {
      win = true;
    }
  });

  if (doesWinByDiagonalLine(symbol, board)) {
    win = true;
  }

  return win;
};

export const gameStatus = board => {
  if (isWin('X', board)) {
    return 'X';
  }
  if (isWin('O', board)) {
    return 'O';
  }
};
