"use client";

import Link from "next/link";
import { api } from "~/trpc/react";
import { Card, CardContent } from "../ui/card";

const NotesList = ({ folderName }: { folderName: string }) => {
  const { data: notesData, isLoading } =
    api.note.getAllNotesByFolderName.useQuery({ folderName });
  return (
    <div className="mx-2 space-y-3">
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : (
        notesData?.map((note) => (
          <Link key={note.id} href={`/${folderName}/${note.id}`}>
            <Card className="group border-border/40 transition-all hover:border-border hover:shadow-md">
              <CardContent className="p-4">
                <h3 className="mb-2 font-semibold text-foreground transition-colors group-hover:text-primary">
                  {note.title}
                </h3>
                <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                  {note.content}
                </p>
                <time className="text-xs text-muted-foreground/70">
                  {note.updatedAt.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </CardContent>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
};

export default NotesList;
