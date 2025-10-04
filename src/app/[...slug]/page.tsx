import FolderHeader from "~/components/shared/FolderHeader";
import NoteEditor from "~/components/shared/NoteEditor";
import NotesList from "~/components/shared/NotesList";
import { api } from "~/trpc/server";

const FolderPage = async ({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) => {
  const { slug } = await params;
  const folderName = slug[0] ?? "";
  const noteId = slug[1];

  // Fetch note only if noteId exists
  const note = noteId ? await api.note.getNoteById({ id: noteId }) : null;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Notes List */}
      <div className="bg-accent w-1/4 border-r">
        <FolderHeader folderName={folderName} />
        <NotesList folderName={folderName} />
      </div>

      {/* Main Content - Note Editor */}
      <div className="flex-1">
        {note ? (
          <NoteEditor note={note} />
        ) : (
          <div className="text-muted-foreground flex h-full items-center justify-center">
            <div className="space-y-2 text-center">
              <p className="text-lg font-medium">No note selected</p>
              <p className="text-sm">
                Select a note from the list to start editing
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderPage;
