'use server';

import { PostType } from '@/types/post-type';
import { getDatabase } from '@/db/database';
import PostModel from '@/db/models/post.model';

export default async function addPost(post: PostType) {
  await getDatabase();

  // await client.db('inna-cv').collection('posts')
  const { images, ...postWithoutImages } = post;
  const response = await PostModel.findOneAndUpdate(
    {
      id: post.id,
    },
    postWithoutImages,
    { upsert: true }
  );

  return JSON.parse(JSON.stringify(response));
}
