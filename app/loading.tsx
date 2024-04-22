import styles from './loading.module.scss';

export default function Loader() {
  return (
    <div className={styles.loader_wrapper}>
      <span className={styles.loader}></span>
    </div>
  );
}
