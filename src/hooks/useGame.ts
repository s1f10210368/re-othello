import { useCallback, useEffect, useState } from 'react';

const directions = [
  [-1, 0], //左
  [1, 0], //右
  [0, -1], //上
  [0, 1], //下
  [-1, -1], //左上
  [1, -1], //右上
  [-1, 1], //左下
  [1, 1], //右下
];

export const useGame = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [canPlaceList, setCanPlaceList] = useState([...Array(8)].map(() => Array(8).fill(false)));
  const [gameover, setGameover] = useState(false);

  const checkplace = useCallback(
    (x: number, y: number) => {
      const tempBoard = JSON.parse(JSON.stringify(board));
      if (tempBoard[y] !== undefined && tempBoard[y][x] !== undefined) {
        return true;
      }
      return false;
    },
    [board]
  );

  const Flg = useCallback(
    (x: number, y: number, num: number, board: Array<number>, undefindeFlg: boolean) => {
      let isCheckplace = false;

      if (undefindeFlg === true) {
        isCheckplace = checkplace(x, y);
        return isCheckplace && board[x] === num;
      }
      isCheckplace = board === undefined;
      return isCheckplace || board[x] !== num;
    },
    [checkplace]
  );

  const secondFlg = useCallback(
    (x: number, y: number, dx: number, dy: number, tempBoard: Array<Array<number>>, i: number) => {
      for (let j = 1; j < i; j++) {
        tempBoard[y + dy * j][x + dx * j] = turnColor;
      }

      return tempBoard;
    },
    [turnColor]
  );

  const checkCanPlace = useCallback(
    //useCallbackでuseEffectを修正
    (x: number, y: number) => {
      if (board[y][x] !== 0) {
        return false;
      }
      const tempBoard = JSON.parse(JSON.stringify(board));
      let flippable = false;
      directions.forEach(([dx, dy]) => {
        if (Flg(x + dx, y + dy, 3 - turnColor, board[y + dy], true)) {
          for (let i = 2; i < 8; i++) {
            if (Flg(x + dx * i, y + dy * i, 3 - turnColor, board[y + dy * i], false)) {
              if (Flg(x + dx * i, y + dy * i, turnColor, tempBoard[y + dy * i], true)) {
                flippable = true;
              }
              break;
            }
          }
        }
      });
      return flippable;
    },
    [board, turnColor, Flg]
  );

  useEffect(() => {
    const newCanPlaceList = [...Array(8)].map(() => Array(8).fill(false));
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (checkCanPlace(x, y)) {
          newCanPlaceList[y][x] = true;
          console.log(x, y);
        }
      }
    }
    setCanPlaceList(newCanPlaceList);
  }, [checkCanPlace, turnColor]); //ターンが切り替わるたびに再計算する

  const onClick = (x: number, y: number) => {
    console.log(x, y);
    if (board[y][x] !== 0) {
      return;
    }
    let newBoard = JSON.parse(JSON.stringify(board));
    let flippable = false;
    directions.forEach(([dx, dy]) => {
      if (Flg(x + dx, y + dy, 3 - turnColor, board[y + dy], true)) {
        for (let i = 2; ; i++) {
          if (Flg(x + dx * i, y + dy * i, 3 - turnColor, board[y + dy * i], false)) {
            if (Flg(x + dx * i, y + dy * i, turnColor, board[y + dy * i], true)) {
              flippable = true;
              newBoard = secondFlg(x, y, dx, dy, newBoard, i);
              // for (let j = 1; j < i; j++) {
              //   newBoard[y + dy * j][x + dx * j] = turnColor;
              // }
            }
            break;
          }
        }
      }
    });
    if (!flippable) {
      return;
    }
    newBoard[y][x] = turnColor;
    setTurnColor(3 - turnColor);
    setBoard(newBoard);
  };
  return { board, onClick, canPlaceList };
};
