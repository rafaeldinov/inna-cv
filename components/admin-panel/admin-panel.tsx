'use client';

import { useEffect, useState } from 'react';
import FormAddUpdateCase from '../form-add-update-case/form-add-update-case';
import FormRemoveCase from '../form-remove-case/form-remove-case';
import styles from './admin-panel.module.scss';
import AdminPanelButtons from '../admin-panel-buttons/admin-panel-buttons';
import { usePostsStore } from '@/store/posts-store';

export default function AdminPanel() {
  const [isActive, setIsActive] = useState(false);
  const allPosts = usePostsStore((state) => state.allPosts);

  return (
    <div className={styles.admin_panel}>
      <AdminPanelButtons isActive={isActive} setIsActive={setIsActive} />
      <div>
        <div style={{ display: isActive ? 'none' : 'block' }}>
          <FormAddUpdateCase posts={allPosts} />
        </div>
        <div style={{ display: isActive ? 'block' : 'none' }}>
          <FormRemoveCase posts={allPosts} />
        </div>
      </div>
    </div>
  );
}
