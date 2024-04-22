'use client';

import { Dispatch, SetStateAction } from 'react';
import styles from './admin-panel-buttons.module.scss';
import { usePostsStore } from '@/store/posts-store';

interface Props {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

export default function AdminPanelButtons({ isActive, setIsActive }: Props) {
  const getAllPosts = usePostsStore((state) => state.getAllPosts);

  return (
    <div className={styles.admin_panel__nav}>
      <button
        onClick={() => setIsActive(false)}
        type='button'
        disabled={!isActive}
      >
        panel add case
      </button>
      <button
        onClick={() => setIsActive(true)}
        type='button'
        disabled={isActive}
      >
        panel delete case
      </button>
      <button onClick={getAllPosts} type='button'>
        load cases
      </button>
    </div>
  );
}
