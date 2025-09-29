import z from "zod";

export const createFolderSchema = z.object({
    name: z.string().min(1, { message: "Folder name is required" }),
});

export type CreateFolderSchema = z.infer<typeof createFolderSchema>;