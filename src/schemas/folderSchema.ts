import z from "zod";

export const folderSchema = z.object({
    name: z.string().min(1),
});

export type FolderSchema = z.infer<typeof folderSchema>;