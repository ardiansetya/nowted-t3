"use client";

import Link from "next/link";
import { api } from "~/trpc/react";
import { Card, CardContent } from "../ui/card";
import { useReadableNote } from "~/hooks/useReadableNote";
import CardNotes from "./CardNotes";

const NotesList = ({ folderName }: { folderName: string }) => {
  const { data: notesData, isLoading } =
    api.note.getAllNotesByFolderName.useQuery({ folderName });

  return (
    <div className="mx-2 space-y-3">
      {isLoading ? (
        <p className="text-muted-foreground text-sm">Loading...</p>
      ) : (
        notesData?.map((note) => {
          return (
            <CardNotes note={note} key={note.id} folderName={folderName} />
          );
        })
      )}
    </div>
  );
};

export default NotesList;
