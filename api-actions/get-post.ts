'use srver';

import { getDatabase } from '@/db/database';
import PostModel from '@/db/models/post.model';

export default async function getPost(id: string) {
  await getDatabase();

  const post = await PostModel.findOne({ id }).then((response) =>
    JSON.parse(JSON.stringify(response))
  );

  return post;
}
