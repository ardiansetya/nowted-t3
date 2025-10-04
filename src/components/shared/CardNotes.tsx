import Link from 'next/link';
import React from 'react'
import { Card, CardContent } from '../ui/card';
import { useReadableNote } from '~/hooks/useReadableNote';

type Props = {
    note: {
        id: string;
        title: string;
        content: string;
        updatedAt: Date;
    };
    folderName: string;
}

const CardNotes = ({note, folderName}: Props) => {
    const readable = useReadableNote(note.content);
    console.log(readable);
  return (
    <Link key={note.id} href={`/${folderName}/${note.id}`}>
      <Card className="group border-border/40 hover:border-border relative overflow-hidden transition-all hover:shadow-sm">
        <CardContent className="p-3">
          <div className="mb-1.5 flex items-start justify-between gap-2">
            <h3 className="text-foreground group-hover:text-primary line-clamp-1 flex-1 text-sm font-semibold transition-colors">
              {note.title}
            </h3>
            <time className="text-muted-foreground/60 mt-0.5 shrink-0 text-[10px]">
              {note.updatedAt.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
              })}
            </time>
          </div>
          <p className="text-muted-foreground/80 line-clamp-2 text-xs leading-relaxed">
            {readable}
          </p>

          {/* Subtle accent line */}
          <div className="bg-primary absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
        </CardContent>
      </Card>
    </Link>
  );
}

export default CardNotes