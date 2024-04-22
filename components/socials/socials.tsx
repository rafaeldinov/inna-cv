'use client';

import Image from 'next/image';
import Link from 'next/link';
import linkedinIcon from '../../public/images/icons/socials/linkedin_2.svg';
import facebookIcon from '../../public/images/icons/socials/facebook.svg';
import styles from './socials.module.scss';

export default function Socials() {
  return (
    <div className={styles.socials}>
      <Link href='https://www.facebook.com/inna.dinova'>
        <Image
          className={styles.socials__icon}
          src={facebookIcon}
          alt='facebook'
          priority
        />
      </Link>
      <Link href='https://www.linkedin.com/in/inna-dinova-9289ab182/'>
        <Image
          className={styles.socials__icon}
          src={linkedinIcon}
          alt='linkedin'
          priority
        />
      </Link>
    </div>
  );
}
