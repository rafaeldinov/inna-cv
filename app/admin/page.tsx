import { auth } from '@/auth/auth';
import styles from './page.module.scss';

import AdminPanel from '@/components/admin-panel/admin-panel';
import { redirect } from 'next/navigation';
import { AppRoute } from '../const';

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    return redirect(AppRoute.Root);
  }
  return (
    <div className={styles.admin_page}>
      <AdminPanel />
    </div>
  );
}
