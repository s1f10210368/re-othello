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

    //すでに駒がある場所は何もしないようにする
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
    let flippable = false;
    // 各方向に対する処理
    directions.forEach(([dx, dy]) => {
      if (
        board[y + dy] !== undefined &&
        board[y + dy][x + dx] !== undefined &&
        board[y + dy][x + dx] === 3 - turnColor
      ) {
        // iは探索するタイルの数
        for (let i = 2; ; i++) {
          // 2つの条件で探索を停止:
          // 1.指定した座標にタイルが存在しない
          // 2.タイルが自分の色とは逆色の場合

          if (board[y + dy * i] === undefined || board[y + dy * i][x + dx * i] !== 3 - turnColor) {
            // さらに2つの条件がが満たされた時、
            // 1.指定した座標にタイルが存在する
            // 2.タイルが自分の色と同じ色
            if (board[y + dy * i] !== undefined && board[y + dy * i][x + dx * i] === turnColor) {
              // この場合、"flippable" (返ることが可能)になる
              flippable = true;

              // 初めて見つけた自分の色のタイルと、以前のタイルの間に存在するすべてのタイルを自分の色に変更
              for (let j = 1; j < i; j++) {
                newBoard[y + dy * j][x + dx * j] = turnColor;
              }
            }
            // 自分の色のタイルが見つかったか、探索が尽くされた場合にループを終了
            break;
          }
        }
      }
    });
    // 挟み込める駒がなかった場合はコマを置かない
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
