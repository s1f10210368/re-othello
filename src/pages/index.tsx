import { useEffect, useState } from 'react';
import { Cell } from '../components/Cell';
import styles from './index.module.css';

const Home = () => {
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

  const checkCanPlace = (x: number, y: number) => {
    if (board[y][x] !== 0) {
      return false;
    }
    const tempBoard = JSON.parse(JSON.stringify(board));
    let flippable = false;
    directions.forEach(([dx, dy]) => {
      if (
        tempBoard[y + dy] !== undefined &&
        tempBoard[y + dy][x + dx] !== undefined &&
        tempBoard[y + dy][x + dx] === 3 - turnColor
      ) {
        for (let i = 2; ; i++) {
          if (
            tempBoard[y + dy * i] === undefined ||
            tempBoard[y + dy * i][x + dx * i] !== 3 - turnColor
          ) {
            if (
              tempBoard[y + dy * i] !== undefined &&
              tempBoard[y + dy * i][x + dx * i] === turnColor
            ) {
              flippable = true;
            }
            break;
          }
        }
      }
    });
    return flippable;
  };

  useEffect(() => {
    const newCanPlaceList = [...Array(8)].map(() => Array(8).fill(false));
    let isPass = true;
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (checkCanPlace(x, y)) {
          newCanPlaceList[y][x] = true;
          isPass = false;
        }
      }
    }
    setCanPlaceList(newCanPlaceList);
    if (isPass) {
      if (turnColor === 2) {
        //前回のターン(白)でもパスだった場合
        setGameover(true); // ゲーム終了にする
      } else {
        setTurnColor(3 - turnColor);
      }
    }
  }); //ターンが切り替わるたびに再計算する

  const onClick = (x: number, y: number) => {
    console.log(x, y);
    if (board[y][x] !== 0) {
      return;
    }
    const newBoard = JSON.parse(JSON.stringify(board));
    let flippable = false;
    directions.forEach(([dx, dy]) => {
      if (
        board[y + dy] !== undefined &&
        board[y + dy][x + dx] !== undefined &&
        board[y + dy][x + dx] === 3 - turnColor
      ) {
        for (let i = 2; ; i++) {
          if (board[y + dy * i] === undefined || board[y + dy * i][x + dx * i] !== 3 - turnColor) {
            if (board[y + dy * i] !== undefined && board[y + dy * i][x + dx * i] === turnColor) {
              flippable = true;
              for (let j = 1; j < i; j++) {
                newBoard[y + dy * j][x + dx * j] = turnColor;
              }
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

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <Cell
              color={color}
              key={`${x}-${y}`}
              canPlaceList={canPlaceList}
              onClick={() => onClick(x, y)}
            /> //親から子供にデータを渡す
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
