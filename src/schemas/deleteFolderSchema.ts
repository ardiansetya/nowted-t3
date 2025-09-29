import z from "zod";

export const deleteFolderSchema = z.object({
    id: z.string(),
});

export type DeleteFolderSchema = z.infer<typeof deleteFolderSchema>;