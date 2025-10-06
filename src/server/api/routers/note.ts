import z from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const noteRouter = createTRPCRouter({
  getAllNotes: publicProcedure.query(({ ctx }) => {
    return ctx.db.note.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        folderId: true,
        updatedAt: true,
        createdAt: true,
        folder: {
          select: {
            name: true,
          },
        },
      },
    });
  }),

  getAllNotesByFolderName: publicProcedure
    .input(z.object({ folderName: z.string() }))
    .query(({ ctx, input }) => {
      const { folderName } = input;
      return ctx.db.note.findMany({
        where: {
          folder: {
            name: folderName,
          },
        },
        select: {
          id: true,
          title: true,
          content: true,
          folderId: true,
          updatedAt: true,
          createdAt: true,
          folder: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        }
      });
    }),

  getNoteById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      const { id } = input;
      return ctx.db.note.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          title: true,
          content: true,
          folderId: true,
          updatedAt: true,
          createdAt: true,
          folder: {
            select: {
              name: true,
            },
          },
        },
      });
    }),

    createNote: publicProcedure
    .input(z.object({ title: z.string(), folderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const {db} = ctx;
      const { title, folderId } = input;
      return await db.note.create({
        data: {
          title,
          createdAt: new Date(),
          updatedAt: new Date(),
          folderId,

        },
      });

    }),
  updateNote: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        content: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      return await ctx.db.note.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      });
    }),
});
