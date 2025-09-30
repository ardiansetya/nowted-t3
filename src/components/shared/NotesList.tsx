"use client";

import Link from "next/link";
import { api } from "~/trpc/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const NotesList = ({ folderName }: { folderName: string }) => {
  const { data: notesData, isLoading } =
    api.note.getAllNotesByFolderName.useQuery({ folderName });
  return (
    <div className="mx-2 space-y-4">
      {notesData?.map((note) => (
        <Link key={note.id} href={`/${folderName}/${note.id}`}>
          <Card>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{note.content}</p>
            </CardContent>
            <CardFooter>
              <p>{note.updatedAt.toDateString()}</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default NotesList;
