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
    for (const [dx, dy] of directions) {
      // dx, dyの方向に1つ移動した場所を新たに設定
      let nx = x + dx;
      let ny = y + dy;
      // それがボードの範囲内かつ相手の色のコマがあった場合
      if (newBoard[ny] !== undefined && newBoard[ny][nx] === 3 - turnColor) {
        nx += dx;
        ny += dy;
        // (nx, ny)がボードの範囲内かつ相手の色のコマが続いている限りループする
        while (newBoard[ny] !== undefined && newBoard[ny][nx] === 3 - turnColor) {
          nx += dx;
          ny += dy;
        }
        // (nx, ny)がボードの範囲内かつ自分のコマであるなら、間にあるコマを裏返す
        if (newBoard[ny] !== undefined && newBoard[ny][nx] === turnColor) {
          // 反転するコマは(nx, ny)から(dx, dy)の逆方向へ1つずつ戻って(x, y)に到達するまでのコマ
          let backX = nx - dx;
          let backY = ny - dy;
          while (backX !== x || backY !== y) {
            newBoard[backY][backX] = turnColor; //コマを裏返す
            backX -= dx; // 反対方向へ1つ戻る
            backY -= dy; // 反対方向へ1つ戻る
          }
          newBoard[y][x] = turnColor;
        }
      }
    }

    //手番を相手にする
    setTurnColor(3 - turnColor);

    //ボードを更新する
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
