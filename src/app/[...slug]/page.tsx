import FolderHeader from "~/components/shared/FolderHeader";
import NotesList from "~/components/shared/NotesList";
import { api } from "~/trpc/server";

const FolderPage = async ({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) => {
  const note = await api.note.getNoteById({ id: (await params).slug[1] ?? "" });

  return (
    <div className="bg-accent flex min-h-full">
      <div className="w-1/4 px-4">
        <FolderHeader folderName={(await params).slug[0] ?? ""} />
        <NotesList folderName={(await params).slug[0] ?? ""} />
      </div>
      {(await params).slug[1] && (
        <div className="bg-background w-3/4">
          <div className="p-4">
            <h1 className="text-2xl font-bold">{note?.title}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderPage;
