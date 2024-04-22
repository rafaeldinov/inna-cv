import { initEdgeStore } from '@edgestore/server';
import { z } from 'zod';

const es = initEdgeStore.create();

export const edgeStoreRouter = es.router({
  publicFiles: es
    .fileBucket()
    .input(
      z.object({
        category: z.string(),
      })
    )
    .path(({ ctx, input }) => [{ category: input.category }])
    .beforeUpload(() => {
      return true;
    })
    .beforeDelete(() => {
      return true;
    }),
});

export type EdgeStoreRouter = typeof edgeStoreRouter;
