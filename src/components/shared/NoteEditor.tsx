"use client";

import { EditorContent } from "@tiptap/react";
import { Card } from "~/components/ui/card";
import { TooltipProvider } from "~/components/ui/tooltip";
import { EditorToolbar } from "~/components/editor/EditorToolbar";
import { EditorHeader } from "~/components/editor/EditorHeader";
import { useNoteEditor } from "~/hooks/useNoteEditor";

type PropsNote = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  folderId: string;
  folder: {
    name: string;
  };
};

const NoteEditor = ({ note }: { note: PropsNote }) => {
  const { editor, title, setTitle, hasChanges, isSaving, handleSave } =
    useNoteEditor({
      noteId: note.id,
      initialTitle: note.title,
      initialContent: note.content,
    });

  return (
    <TooltipProvider>
      <div className="bg-background h-full w-full">
        <Card className="h-full w-full overflow-hidden rounded-none border-0 shadow-lg">
          <EditorHeader
            title={title}
            onTitleChange={setTitle}
            folderName={note.folder.name}
            updatedAt={note.updatedAt}
            isSaving={isSaving}
            hasChanges={hasChanges}
            onSave={handleSave}
            disabled={isSaving}
          />

          <EditorToolbar editor={editor} />

          <div
            className="bg-card overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 200px)" }}
          >
            <EditorContent editor={editor} />
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default NoteEditor;
