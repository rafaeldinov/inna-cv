'use client';

import { PostType } from '@/types/post-type';
import CardItem from '../card-item/card-item';
import { usePostsStore } from '@/store/posts-store';

export default function Cards() {
  const posts = usePostsStore((state) => state.posts);

  return posts.map((item: PostType) => <CardItem item={item} key={item.id} />);
}
