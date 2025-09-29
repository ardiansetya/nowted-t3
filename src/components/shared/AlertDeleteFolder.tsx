"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

import { Trash2Icon } from "lucide-react";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import type { DeleteFolderSchema } from "~/schemas/deleteFolderSchema";

const AlertDeleteFolder = ({ folder }: { folder: DeleteFolderSchema }) => {
  const apiUtils = api.useUtils();

  const deleteFolder = api.folder.deleteFolder.useMutation({
    onSuccess: async () => {
      await apiUtils.folder.getAllFolders.invalidate();
    },
  });

  const onSubmit = (values: DeleteFolderSchema) => {
    deleteFolder.mutate({ id: values.id });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="ml-2 size-8">
          <Trash2Icon className="text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onSubmit(folder)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDeleteFolder;
