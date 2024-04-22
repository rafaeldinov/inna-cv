'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './form-remove-case.module.scss';
import { toast } from 'react-hot-toast';
import { PostType } from '@/types/post-type';
import deletePost from '@/api-actions/delete-post';
import { useEdgeStore } from '@/db/edgestore-provider';
import noImage from '../../public/images/icons/no-image.png';
import { usePostsStore } from '@/store/posts-store';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface Props {
  posts: PostType[];
}

const POSTS_PER_PAGE_REMOVE_CASE_FORM = 10;

export default function FormRemoveCase({ posts }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const getAllPosts = usePostsStore((state) => state.getAllPosts);

  const { edgestore } = useEdgeStore();

  const pagesCount = Math.ceil(posts.length / POSTS_PER_PAGE_REMOVE_CASE_FORM);

  const handleRemovePostClick = async (post: PostType) => {
    setIsLoading(true);
    if (post.images && post.images.length > 0) {
      await Promise.all(
        post.images.map(async (url) => {
          await edgestore.publicFiles.delete({ url });
        })
      )
        .then(async () => {
          await deletePost(post.id);
        })
        .catch((error) => toast.error('error deleting case'));
    } else {
      await deletePost(post.id);
    }
    setIsLoading(false);
    getAllPosts();
  };

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
    <div>
      <Stack className={styles.remove_case__pagination} spacing={2}>
        <Pagination
          onChange={handlePaginationChange}
          count={pagesCount}
          siblingCount={0}
          page={currentPage}
          variant='outlined'
          shape='rounded'
        />
      </Stack>
      <fieldset className={styles.remove_case_form}>
        <legend>REMOVE CASE</legend>
        <ul className={styles.remove_case_form__items}>
          {posts
            .slice(
              (currentPage - 1) * POSTS_PER_PAGE_REMOVE_CASE_FORM,
              POSTS_PER_PAGE_REMOVE_CASE_FORM * currentPage
            )
            .map((item) => {
              return (
                <li className={styles.remove_case_form__item} key={item.id}>
                  <div className={styles.remove_case_form__image_wrapper}>
                    <Image
                      className={styles.remove_case_form__image}
                      src={item.previewImageSrc || noImage.src}
                      quality={100}
                      alt='case preview'
                      fill
                      sizes='(max-width: 768px) 100%'
                    />
                  </div>
                  <span className={styles.remove_case_form__item_text}>
                    ID: {item.id}
                  </span>
                  <span className={styles.remove_case_form__item_text}>
                    TITLE: {item.title}
                  </span>
                  <span className={styles.remove_case_form__item_text}>
                    AREA: {item.area}
                  </span>
                  <span className={styles.remove_button}>
                    <button
                      onClick={() => handleRemovePostClick(item)}
                      type='button'
                      disabled={isLoading}
                    >
                      remove
                    </button>
                  </span>
                </li>
              );
            })}
        </ul>
      </fieldset>
    </div>
  );
}
