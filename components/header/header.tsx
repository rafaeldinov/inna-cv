'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './header.module.scss';
import logo from '@/public/apple-touch-icon.png';
import { AppRoute, NavLink } from '../../app/const';
import { signOut, useSession } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { useMediaQuery } from '@/user-hooks/use-media-query';

export default function Header() {
  const currentPath = usePathname();
  const [isBurger, setIsBurger] = useState(false);
  const mediaQuery = useMediaQuery(1200);

  const { data: session } = useSession();

  const handleNavLinkClick = (evt: React.SyntheticEvent) => {
    if (isBurger) {
      handleBurgerClick();
    }
  };

  const handleBurgerClick = () => {
    setIsBurger(!isBurger);
    if (!isBurger) {
      document.body.style.overflowY = 'hidden';
      document.body.style.height = '100vh';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.overflowY = 'auto';
      document.body.style.height = 'auto';
      document.body.style.userSelect = 'auto';
    }
  };

  useEffect(() => {
    if (!mediaQuery) {
      setIsBurger(false);
      document.body.style.overflowY = 'auto';
      document.body.style.height = 'auto';
      document.body.style.userSelect = 'auto';
    }
  }, [mediaQuery]);

  return (
    <header className={styles.container}>
      <div className={styles.header}>
        <Link className={styles.header__logo} href={AppRoute.Work}>
          <div className={styles.logo__wrapper}>
            <Image
              src={logo}
              alt='main logo'
              sizes='100%'
              quality={100}
              fill
              priority
            />
          </div>
        </Link>

        <nav
          className={`${styles.nav} ${isBurger ? styles.burger__active : ''}`}
        >
          <ul onClick={handleNavLinkClick} className={styles.menu}>
            {Object.values(NavLink)
              .filter((name) => {
                if (!session && name === NavLink.Admin) {
                  return false;
                }
                if (session && name === NavLink.Login) {
                  return false;
                }
                return true;
              })
              .map((name) => {
                return (
                  <li
                    key={name}
                    className={
                      currentPath === `/${name}` ||
                      (currentPath === '/' && name === NavLink.Work)
                        ? styles.nav__link_activ + ` ${styles.menu__item}`
                        : styles.menu__item
                    }
                  >
                    <Link
                      className={styles.menu__link}
                      href={NavLink.Work === name ? AppRoute.Root : `/${name}`}
                    >
                      {name}
                    </Link>
                  </li>
                );
              })}
            {session && (
              <button
                onClick={() => {
                  signOut();
                }}
              >
                signout
              </button>
            )}
          </ul>
        </nav>
        <div
          onClick={handleBurgerClick}
          className={`${styles.burger} ${
            isBurger ? styles.burger__active : ''
          }`}
        >
          <span className={styles.burger__span}></span>
        </div>
      </div>

      <Toaster
        position='top-center'
        toastOptions={{
          duration: 3000,
          style: { background: '#363636', color: '#fff' },
        }}
      />
    </header>
  );
}
