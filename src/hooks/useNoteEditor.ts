"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "~/trpc/react";

interface UseNoteEditorProps {
  noteId: string;
  initialTitle: string;
  initialContent: string;
}

export const useNoteEditor = ({
  noteId,
  initialTitle,
  initialContent,
}: UseNoteEditorProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [hasChanges, setHasChanges] = useState(false);
  const utils = api.useUtils();

  const updateNote = api.note.updateNote.useMutation({
    onSuccess: async () => {
      setHasChanges(false);
      toast("Note saved successfully");
      await utils.note.getNoteById.invalidate({ id: noteId });
      await utils.note.getAllNotesByFolderName.invalidate();
    },
    onError: (error) => {
      toast("Failed to save note - " + error.message);
    },
  });

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your note...",
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg max-w-none p-6 focus:outline-none min-h-[500px] [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-3 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-3 [&_h2]:mb-2 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mt-3 [&_h3]:mb-2 [&_p]:my-3 [&_p]:leading-7 [&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_blockquote]:my-4 [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3 [&_ol]:space-y-1 [&_li]:leading-7 [&_strong]:font-bold [&_em]:italic [&_s]:line-through [&_p.is-editor-empty:first-child::before]:text-muted-foreground [&_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_p.is-editor-empty:first-child::before]:float-left [&_p.is-editor-empty:first-child::before]:h-0 [&_p.is-editor-empty:first-child::before]:pointer-events-none",
      },
    },
    onUpdate: () => {
      setHasChanges(true);
    },
  });

  // Update editor content when note changes
  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  // Update title when note changes
  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  // Track title changes
  useEffect(() => {
    if (title !== initialTitle) {
      setHasChanges(true);
    }
  }, [title, initialTitle]);

  // Auto-save functionality (debounced)
  useEffect(() => {
    if (!hasChanges) return;

    const timer = setTimeout(() => {
      handleSave();
    }, 2000);

    return () => clearTimeout(timer);
  }, [hasChanges, title, editor?.getHTML()]);

  const handleSave = () => {
    if (!editor) return;

    updateNote.mutate({
      id: noteId,
      title,
      content: JSON.stringify(editor.getJSON()),
    });
  };

  // Keyboard shortcut for manual save (Ctrl+S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [title, editor]);

  return {
    editor,
    title,
    setTitle,
    hasChanges,
    isSaving: updateNote.isPending,
    handleSave,
  };
};
