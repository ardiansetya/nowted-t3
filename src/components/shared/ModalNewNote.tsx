"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  createnoteSchema,
  type CreatenoteSchema,
} from "~/schemas/createNoteSchema";
import { Plus } from "lucide-react";
import { FolderCombobox } from "./FolderCombobox";

const ModalNewNote = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<CreatenoteSchema>({
    resolver: zodResolver(createnoteSchema),
    defaultValues: {
      title: "",
    },
  });

  const apiUtils = api.useUtils();

  const createNote = api.note.createNote.useMutation({
    onSuccess: async () => {
      form.reset();
      setOpen(false);
      await apiUtils.note.getAllNotes.invalidate();
      await apiUtils.note.getAllNotesByFolderName.invalidate();
    },

    onError: (error) => {
      console.error("Create note error:", error); // 👈 lihat errornya
    },
  });

  const onSubmit = (values: CreatenoteSchema) => {
    createNote.mutate({ title: values.title, folderId: values.folderId });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="default">
          <Plus className="h-4 w-4" />
           Note
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Your Note</DialogTitle>
          <DialogDescription>
            Enter the name of your new note below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mb-4 grid w-full max-w-sm items-center gap-2">
                  <FormLabel htmlFor="name">Note Title</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Name" {...field} />
                  </FormControl>
                  <p className="text-sm text-red-400">
                    {form.formState.errors.title?.message}
                  </p>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="folderId"
              render={({ field }) => (
                <FormItem className="mb-4 grid w-full max-w-sm items-center gap-2">
                  <FormLabel htmlFor="folderId">Folder Name</FormLabel>
                  <FormControl className="w-full">
                    <FolderCombobox onChange={field.onChange} value={field.value}/>
                  </FormControl>
                  <p className="text-sm text-red-400">
                    {form.formState.errors.folderId?.message}
                  </p>
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={createNote.isPending}>
                {createNote.isPending ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalNewNote;
