'use server';

import { getDatabase } from '@/db/database';
import PostModel from '@/db/models/post.model';
import UserModel from '@/db/models/user.model';

export default async function downloadImages(id: string) {
  await getDatabase();

  let response;
  if (id === 'admin') {
    response = await UserModel.findOne({ id });
  } else {
    response = await PostModel.findOne({ id });
  }

  if (response) {
    return response.images;
  }
  return [];
}
