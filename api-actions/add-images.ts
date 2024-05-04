'use server';

import { getDatabase } from '@/db/database';
import PostModel from '@/db/models/post.model';
import UserModel from '@/db/models/user.model';

export default async function addImages(id: string, urls: string[]) {
  const client = await getDatabase();

  if (id === 'admin') {
    const result = await UserModel.updateOne(
      { id },
      { $addToSet: { images: urls } },
      { upsert: true }
    );
  } else {
    const result = await PostModel.updateOne(
      { id },
      { $addToSet: { images: urls } },
      { upsert: true }
    );
  }
}
