import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
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
    .beforeUpload(({ ctx, input, fileInfo }) => {
      return true; // allow upload
    })
    .beforeDelete(({ ctx, fileInfo }) => {
      return true; // allow delete
    }),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export type EdgeStoreRouter = typeof edgeStoreRouter;
