'use client';

import styles from './text.module.scss';

export default function Text({ text }: { text: string }) {
  return (
    <div className={styles.text_wrapper}>
      <p className={styles.text}>{`${text}`}</p>
    </div>
  );
}
