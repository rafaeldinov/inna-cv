'use server';

import { getDatabase } from '@/db/database';
import PostModel from '@/db/models/post.model';

export default async function getAllPosts() {
  await getDatabase();

  const posts = await PostModel.find()
    .sort({ createdAt: 'desc' })
    .then((docs) => JSON.parse(JSON.stringify(docs)));

  return posts;
}
