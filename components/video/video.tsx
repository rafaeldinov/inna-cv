'use client';

import styles from './video.module.scss';
import noImage from '../../public/images/icons/no-image.png';

export default function Video({ src }: { src: string }) {
  return (
    <div className={styles.video}>
      <div className={styles.video__wrapper}>
        <iframe
          className={styles.video__player}
          width='100%'
          height='100%'
          src={src || noImage.src}
          title='YouTube video player'
          allowFullScreen
        />
      </div>
    </div>
  );
}
