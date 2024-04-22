'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './password-prompt.module.scss';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function PasswordPrompt() {
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const handleSigninClick = async () => {
    const response = await signIn('credentials', {
      login,
      password,
      redirect: false,
      callbackUrl: callbackUrl || '/',
    });

    if (response?.ok) {
      return window.location.reload();
    }
    if (response?.error) {
      return toast.error('Невірно вказана пошта або пароль');
    }
  };

  return (
    <div>
      <form className={styles.password_prompt} autoComplete='off'>
        <label>
          Login
          <input
            name='login'
            type='text'
            value={login}
            onChange={(evt) => setLogin(evt.target.value.replace(/ /g, ''))}
          />
        </label>
        <label>
          Password
          <input
            name='password'
            type='password'
            value={password}
            onChange={(evt) => setPassword(evt.target.value.replace(/ /g, ''))}
          />
        </label>
        <button type='button' onClick={handleSigninClick}>
          signin
        </button>
      </form>
    </div>
  );
}
