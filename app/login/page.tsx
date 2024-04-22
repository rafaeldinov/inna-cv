import PasswordPrompt from '@/components/password-prompt/password-prompt';
import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation';
import styles from './page.module.scss';

export default async function Login() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <div className={styles.login}>
      <PasswordPrompt />
    </div>
  );
}
