import { noteRouter } from "~/server/api/routers/note";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { folderRouter } from "./routers/folder";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  note: noteRouter,
  folder: folderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.note.all();
 *       ^? note[]
 */
export const createCaller = createCallerFactory(appRouter);
