'use client';

import { useRef } from 'react';
import styles from './form-send-email.module.scss';
import { toast } from 'react-hot-toast';
import sendEmail from '@/api-actions/send-email';

export default function FormSendEmail() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmitClick = async () => {
    if (
      !nameRef.current?.value ||
      !emailRef.current?.value ||
      !subjectRef.current?.value ||
      !textRef.current?.value
    ) {
      return toast.error('all fields required');
    }
    const { data, error } = await sendEmail(
      nameRef.current.value,
      emailRef.current.value,
      subjectRef.current.value,
      textRef.current.value
    );

    if (error) {
      return toast.error(error.message);
    }

    if (data) {
      nameRef.current.value = '';
      emailRef.current.value = '';
      subjectRef.current.value = '';
      textRef.current.value = '';
      return toast.success('Your message was successfully sent.');
    }
    toast.error('unknown error');
  };

  return (
    <form className={styles.form}>
      <div className={styles.form__wrapper}>
        <input
          ref={nameRef}
          type='text'
          className={styles.form__input}
          name='name'
          id='name'
          placeholder='Name'
          required
        />
        <input
          ref={emailRef}
          type='email'
          className={styles.form__input}
          name='email'
          id='email'
          placeholder='Email'
          required
        />
        <input
          ref={subjectRef}
          type='text'
          className={styles.form__input}
          name='subject'
          id='subject'
          placeholder='Subject'
          required
        />

        <textarea
          ref={textRef}
          name='message'
          className={`${styles.form__input} ${styles.form__text_area}`}
          id='message'
          cols={30}
          rows={20}
          placeholder='Message'
          required
        />

        <input
          onClick={handleSubmitClick}
          type='button'
          value='Send Message'
          className={styles.form__submit}
        />
      </div>
    </form>
  );
}
