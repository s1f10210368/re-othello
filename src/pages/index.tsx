import { useState } from 'react';
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

  const onClick = (x: number, y: number) => {
    console.log(x, y);

    //すでに駒がある場所は何もしない
    if (board[y][x] !== 0) {
      return;
    }

    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
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

    //各方向に対する処理
    if (board[y + 1] !== undefined && board[y + 1][x] === 3 - turnColor) {
      //上方向
      newBoard[y][x] = turnColor;
    } else if (board[y - 1] !== undefined && board[y - 1][x] === 3 - turnColor) {
      //下方向
      newBoard[y][x] = turnColor;
    } else if (board[x] !== undefined && board[y][x - 1] === 3 - turnColor) {
      //右方向
      newBoard[y][x] = turnColor;
    } else if (board[x] !== undefined && board[y][x + 1] === 3 - turnColor) {
      //左方向
      newBoard[y][x] = turnColor;
    }
    setTurnColor(3 - turnColor);
    setBoard(newBoard);
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  // colorが1であれば#000をそうでなければ#fffを返す
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
