'use client';

import Image from 'next/image';
import styles from './banner.module.scss';
import { SyntheticEvent, useState } from 'react';
import playIcon from '../../public/images/icons/video-play.svg';

export default function Banner() {
  const [isPaused, setIsPaused] = useState({ video1: false, video2: false });

  const handleVideoPlayPauseClick = (evt: SyntheticEvent<HTMLVideoElement>) => {
    if (evt.currentTarget.paused) {
      evt.currentTarget.play();
      if (evt.currentTarget.id === 'video1') {
        setIsPaused({ ...isPaused, video1: false });
      }
      if (evt.currentTarget.id === 'video2') {
        setIsPaused({ ...isPaused, video2: false });
      }
    } else {
      evt.currentTarget.pause();
      if (evt.currentTarget.id === 'video1') {
        setIsPaused({ ...isPaused, video1: true });
      }
      if (evt.currentTarget.id === 'video2') {
        setIsPaused({ ...isPaused, video2: true });
      }
    }
  };

  return (
    <div className={styles.banner}>
      <div className={styles.banner__wrapper}>
        <video
          id='video1'
          onClick={handleVideoPlayPauseClick}
          className={styles.banner__video}
          preload='auto'
          autoPlay
          loop
          muted
        >
          <source
            src='https://files.edgestore.dev/vh00l46smm3hlf5y/publicFiles/_public/admin/936d6172-2860-4105-86b0-fb08b68fc74a.mp4'
            type='video/mp4'
          />
        </video>

        {isPaused.video1 && (
          <Image
            className={styles.banner__video_play}
            src={playIcon.src}
            alt='play icon'
            width={100}
            height={100}
            priority
          />
        )}
      </div>
      <div className={styles.banner__wrapper}>
        <video
          id='video2'
          onClick={handleVideoPlayPauseClick}
          className={styles.banner__video}
          preload='true'
          autoPlay
          loop
          muted
        >
          <source
            src='https://files.edgestore.dev/vh00l46smm3hlf5y/publicFiles/_public/admin/d23fc87b-940b-4f23-99ad-6d373dd2423c.mp4'
            type='video/mp4'
          />
        </video>
        {isPaused.video2 && (
          <Image
            className={styles.banner__video_play}
            src={playIcon.src}
            alt='play icon'
            width={100}
            height={100}
            priority
          />
        )}
      </div>
    </div>
  );
}
