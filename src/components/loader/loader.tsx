import styles from './loader.module.css';

function Loader(): JSX.Element {
  return (
    <div className={styles.ring}>Loading
      <span className={styles.loader}></span>
    </div>
  );
}

export default Loader;
