import { Cell } from '../components/Cell';
import { useGame } from '../hooks/useGame';
import styles from './index.module.css';

const Home = () => {
  const { onClick, canPlaceList, board } = useGame();

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map(
            (
              color,
              x //mapより下は分けることが多い、keyを用いて分ける。
            ) => (
              <Cell
                color={color}
                key={`${x}-${y}`}
                canPlaceList={canPlaceList[y][x]}
                onClick={() => onClick(x, y)}
              /> //親から子供にデータを渡す
            )
          )
        )}
      </div>
    </div>
  );
};

export default Home;

//if文やfor文、swicth文などの中でuse~は使用してはいけない
