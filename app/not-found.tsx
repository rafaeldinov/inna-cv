import Link from 'next/link';
import styles from './not-found.module.scss';
import { AppRoute } from './const';

export default function NotFound() {
  return (
    <div className={styles.notfound}>
      <h2>Not Found</h2>
      <p className={styles.notfound__text}>Could not find requested resource</p>
      <Link className={styles.notfound__link} href={AppRoute.Root}>
        Return Home
      </Link>
    </div>
  );
}
