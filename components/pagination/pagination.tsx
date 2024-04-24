'use client';

import { usePostsStore } from '@/store/posts-store';
import styles from './pagination.module.scss';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';

export default function PaginationRounded() {
  const setCurrentPage = usePostsStore((state) => state.setCurrentPage);
  const currentPage = usePostsStore((state) => state.currentPage);
  const pagesCount = usePostsStore((state) => state.pagesCount);
  const isLoading = usePostsStore((state) => state.isLoading);

  useEffect(() => {
    setCurrentPage(1);
  }, [setCurrentPage]);

  const handlePaginationChange = (
    evt: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (currentPage === value) {
      return;
    }
    setCurrentPage(value);
  };

  return (
    <div className={styles.pagination}>
      {pagesCount !== undefined && (
        <Stack spacing={2}>
          <Pagination
            onChange={handlePaginationChange}
            className={styles.pagination__item}
            count={pagesCount}
            siblingCount={0}
            page={currentPage}
            variant='outlined'
            shape='rounded'
            disabled={isLoading}
          />
        </Stack>
      )}
    </div>
  );
}
