'use client';

import PasswordPrompt from '../password-prompt/password-prompt';
import { Toaster } from 'react-hot-toast';
import styles from './coming-soon.module.scss';

export default function ComingSoon() {
  return (
    <div className={styles.coming_soon}>
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 2000,
          style: { background: '#363636', color: '#fff' },
        }}
      />
      <div className={styles.coming_soon__login}>
        <PasswordPrompt />
      </div>

      <p className={styles.coming_soon__title}>COMING SOON</p>
      <h1>
        Copywriter&apos;s portfolio <br /> by Inna Dinova
      </h1>
      <p>or what I can do as</p>
      <p>CREATIVE ESCORT</p>
    </div>
  );
}
