'use client';

import Link from 'next/link';
import { AppRoute } from '../app/const';

export default function Error({ error }: { error: Error }) {
  return (
    <div>
      <p>{`Something went wrong... ERROR: ${error.message}`}</p>
      <Link href={AppRoute.Work}>Back to main page</Link>
    </div>
  );
}
