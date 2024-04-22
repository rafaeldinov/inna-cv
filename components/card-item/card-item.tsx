'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppRoute } from '../../app/const';
import { PostType } from '../../types/post-type';
import styles from './card-item.module.scss';
import DivideLine from '../divide-line/divide-line';

export default function CardItem({ item }: { item: PostType }) {
  return (
    <React.Fragment>
      <section className={styles.card}>
        <div className={styles.card__title_wrapper}>
          <h3 className={styles.card__title}>{item.title}</h3>
        </div>

        <Link
          className={styles.card__link}
          href={`${AppRoute.Case}/${item.id}`}
        >
          <div className={styles.card__image_wrapper}>
            <Image
              className={styles.card__image}
              src={item.previewImageSrc}
              quality={100}
              alt='case preview'
              height={500}
              width={350}
              sizes='100%'
              priority
            />
          </div>
        </Link>
      </section>
      <DivideLine />
    </React.Fragment>
  );
}
