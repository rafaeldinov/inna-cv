import type { Metadata } from 'next';
import styles from './page.module.scss';
import Socials from '@/components/socials/socials';
import FormSendEmail from '@/components/form-send-email/form-send-email';

export const metadata: Metadata = {
  title: 'Contacts',
};

export default async function Contacts() {
  return (
    <div className={styles.contacts}>
      <main className={styles.contacts__main}>
        <div className={styles.socials_email}>
          <div className={styles.socials}>
            <Socials />
          </div>
        </div>
        <FormSendEmail />
      </main>
    </div>
  );
}
