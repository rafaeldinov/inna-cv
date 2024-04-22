'use client';

import { useEffect, useState } from 'react';
import styles from './up-button.module.scss';

export default function UpButton() {
  const [isButtonUp, setIsButtonUp] = useState(false);

  const handleUpButtonClick = () => {
    setIsButtonUp(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      window.scrollY > 500 ? setIsButtonUp(true) : setIsButtonUp(false);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    isButtonUp && (
      <button
        onClick={handleUpButtonClick}
        className={styles.up}
        type='button'
      ></button>
    )
  );
}
