import z from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const folderRouter = createTRPCRouter({
  getAllFolders: publicProcedure.query(async ({ ctx }) => {
    const { db } = ctx;
    const folder = await db.folder.findMany({
      select: {
        name: true,
        id: true,
        updatedAt: true,
        notes: {
          select: {
            name: true,
            folderId: true,
            id: true,
          },
        },
      },
    });

    return folder;
  }),

  createFolder: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const { name } = input;
      const createFolder = await db.folder.create({
        data: {
          name,
        },
      });

      return createFolder;
    }),

  deleteFolder: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const { id } = input;
      return await db.folder.delete({
        where: {
          id,
        },
      });
    }),
});
