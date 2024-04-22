'use client';

import { useMediaQuery } from '@/user-hooks/use-media-query';
import styles from './divide-line.module.scss';

export default function DivideLine() {
  const matches = useMediaQuery(800);
  return matches && <b className={`${styles.hr} ${styles.anim}`}></b>;
}
