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
    //クリックされたx軸とy軸をコンソール上で表示
    console.log(x, y);

    if (board[y][x] !== 0) {
      //すでに駒が配置されている箇所は操作を行わない
      return;
    }

    //ボードの深いコピーを作成
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));

    //周りの8方向を表す
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

    //8方向それぞれについてループを行う
    for (const [dx, dy] of directions) {
      let nx = x + dx;
      let ny = y + dy;

      //選択した位置の周囲のセルがボード上のものであり、かつ相手の駒である場合
      if (newBoard[ny] !== undefined && newBoard[ny][nx] === 3 - turnColor) {
        nx += dx;
        ny += dy;

        //相手の駒が連続している間は、探索位置を進める
        while (newBoard[ny] !== undefined && newBoard[ny][nx] === 3 - turnColor) {
          nx += dx;
          ny += dy;
        }

        //探索位置が自分の駒であった場合
        if (newBoard[ny] !== undefined && newBoard[ny][nx] === turnColor) {
          //自身の駒に到達するまで、間の駒をすべて自分のものにする
          while (board[(ny -= dy)][(nx -= dx)] === 3 - turnColor) {
            newBoard[ny][nx] = turnColor;
          }

          //最初にクリックした位置に自分の駒を置く
          newBoard[y][x] = turnColor;

          //手番を相手に渡す
          setTurnColor(3 - turnColor);

          //ボードの状態を更新する
          setBoard(newBoard);

          return;
        }
      }
    }
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
