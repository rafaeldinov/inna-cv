'use server';

import { getDatabase } from '@/db/database';
import PostModel from '@/db/models/post.model';
import UserModel from '@/db/models/user.model';

export default async function deleteImage(id: string, url: string) {
  await getDatabase();

  if (id === 'admin') {
    await UserModel.findOneAndUpdate({ id }, { $pull: { images: url } });
  } else {
    await PostModel.findOneAndUpdate({ id }, { $pull: { images: url } });
  }
}
