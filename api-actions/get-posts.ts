'use server';

import { getDatabase } from '@/db/database';
import PostModel from '@/db/models/post.model';
import { POSTS_PER_PAGE } from '@/app/const';

export default async function getPosts(
  filters?: string[],
  currentPage: number = 1
) {
  await getDatabase();

  const postsCount = await PostModel.countDocuments({ area: { $in: filters } });

  const posts = await PostModel.find({ area: { $in: filters } })
    .skip(currentPage * POSTS_PER_PAGE - POSTS_PER_PAGE)
    .limit(POSTS_PER_PAGE)
    .sort({ createdAt: 'desc' })
    .then((docs) => JSON.parse(JSON.stringify(docs)));

  return { posts, count: postsCount };
}
