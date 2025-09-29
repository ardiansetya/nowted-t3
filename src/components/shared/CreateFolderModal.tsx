"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FolderPlus } from "lucide-react";
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
import { createFolderSchema, type CreateFolderSchema } from "~/schemas/folderSchema";

const ModalAddFolder = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateFolderSchema>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      name: "",
    },
  });

  const apiUtils = api.useUtils();

  const createFolder = api.folder.createFolder.useMutation({
    onSuccess: async () => {
      form.reset();
      setOpen(false);
      await apiUtils.folder.getAllFolders.invalidate();
    },

    onError: (error) => {
      console.error("Create folder error:", error); // 👈 lihat errornya
    },
  });

  const onSubmit = (values: CreateFolderSchema) => {
    createFolder.mutate({ name: values.name });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8 p-0">
          <FolderPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Your Folder</DialogTitle>
          <DialogDescription>
            Enter the name of your new folder below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-4 grid w-full max-w-sm items-center gap-2">
                  <FormLabel htmlFor="name">Folder Name</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Name" {...field} />
                  </FormControl>
                  <p className="text-sm text-red-400">
                    {form.formState.errors.name?.message}
                  </p>
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={createFolder.isPending}>
                {createFolder.isPending ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddFolder;
