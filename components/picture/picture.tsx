'use client';

import Image from 'next/image';
import styles from './picture.module.scss';
import useImageSize from '@/user-hooks/use-image-size';
import noImage from '../../public/images/icons/no-image.png';

export default function Picture({ src, alt }: { src: string; alt: string }) {
  const imageWithSize = useImageSize(src);

  return (
    <div className={styles.picture}>
      <Image
        src={src || noImage.src}
        className={styles.image}
        alt={alt}
        width={imageWithSize.width}
        height={imageWithSize.height}
        priority
      />
    </div>
  );
}
