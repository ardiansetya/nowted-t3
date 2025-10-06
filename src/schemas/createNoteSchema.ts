import z from "zod";

export const createnoteSchema = z.object({
    title: z.string().min(1, { message: "note name is required" }),
    folderId: z.string().min(1, { message: "folder name is required" }),
});

export type CreatenoteSchema = z.infer<typeof createnoteSchema>;