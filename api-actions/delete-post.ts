'use server';

import { getDatabase } from '@/db/database';
import PostModel from '@/db/models/post.model';

export default async function deletePost(id: string) {
  await getDatabase();

  await PostModel.findOneAndDelete({ id });
}
