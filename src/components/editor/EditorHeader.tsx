"use client";

import { FolderOpen, Loader2, Save } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";

interface EditorHeaderProps {
  title: string;
  onTitleChange: (title: string) => void;
  folderName: string;
  updatedAt: Date;
  isSaving: boolean;
  hasChanges: boolean;
  onSave: () => void;
  disabled?: boolean;
}

export const EditorHeader = ({
  title,
  onTitleChange,
  folderName,
  updatedAt,
  isSaving,
  hasChanges,
  onSave,
  disabled,
}: EditorHeaderProps) => {
  return (
    <div className="bg-card space-y-4 border-b p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <Input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="h-12 border-0 bg-transparent px-4 text-5xl font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Note title"
            disabled={disabled}
          />
          <div className="text-muted-foreground flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              <span>{folderName}</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  isSaving
                    ? "bg-yellow-500"
                    : hasChanges
                      ? "bg-orange-500"
                      : "bg-green-500"
                }`}
              ></span>
              <span>
                {isSaving
                  ? "Saving..."
                  : hasChanges
                    ? "Unsaved changes"
                    : "All changes saved"}
              </span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <span>
              Updated:{" "}
              {new Date(updatedAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
        <Button
          onClick={onSave}
          size="sm"
          disabled={isSaving || !hasChanges}
          className="shrink-0"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
