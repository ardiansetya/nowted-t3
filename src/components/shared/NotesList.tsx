"use client";

import { api } from "~/trpc/react";
import CardNotes from "./CardNotes";

const NotesList = ({ folderName }: { folderName: string }) => {
  const { data: notesData, isLoading } =
    api.note.getAllNotesByFolderName.useQuery({ folderName });

  return (
    <div className="mx-2 space-y-4">
      {isLoading ? (
        <p className="text-muted-foreground text-sm">Loading...</p>
      ) : (
        notesData?.map((note) => {
          return (
            <div key={note.id}>
              <CardNotes
                note={{
                  id: note.id,
                  title: note.title,
                  content: note.content ?? "",
                  updatedAt: note.updatedAt,
                }}
                folderName={folderName}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default NotesList;
