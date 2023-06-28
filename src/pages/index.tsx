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
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    const direction = [
      [-1, 0], //左
      [1, 0], //右
      [0, -1], //上
      [0, 1], //下
      [-1, -1], //左上
      [1, -1], //右上
      [-1, 1], //左下
      [1, 1], //右下
    ];
    direction.map(([dx, dy]) => {
      if (board[y + dy] !== undefined && board[y + dy][x + dx] === 3 - turnColor) {
        newBoard[y + dy][x + dx] = turnColor;
      }
    });
    {
      newBoard[y][x] = turnColor;
      // 1であれば2に、2であれば1に
      setTurnColor(3 - turnColor);
    }
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
