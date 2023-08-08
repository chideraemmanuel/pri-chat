import styles from "./FullScreenLoader.module.scss";

const FullScreenLoader: React.FC = () => {
  return (
    <div className={styles.fullScreenLoader}>
      <div className={styles.fullScreenLoader__spinner}></div>
    </div>
  );
};

export default FullScreenLoader;
