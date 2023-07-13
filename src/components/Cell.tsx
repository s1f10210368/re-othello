//Reactコンポーネント、カスタムhook

import styles from './cell.module.css';

export const Cell = (props: { color: number; canPlaceList: boolean; onClick: () => void }) => {
  return (
    <div
      className={`${styles.cell} ${props.canPlaceList ? styles.canplace : ''}`}
      onClick={props.onClick}
    >
      {props.color !== 0 && (
        <div className={styles.stone} style={{ background: props.color === 1 ? '#000' : '#fff' }} />
      )}
    </div>
  );
};
