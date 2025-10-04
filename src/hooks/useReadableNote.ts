"use client";
import { useMemo } from "react";

type DocContent = {
  type: string;
  content?: DocContent[];
  text?: string;
  attrs?: { level?: number };
  marks?: { type: string }[];
};

type TiptapDoc = {
  type: string;
  content?: DocContent[];
};

export function useReadableNote(jsonString: string) {
  return useMemo(() => {
    try {
      const parsed = JSON.parse(jsonString) as TiptapDoc;

      // Recursive parser untuk ambil plain text tanpa markdown
      const parseNode = (node: DocContent): string => {
        // Base case: text node
        if (node.type === "text") {
          return node.text ?? "";
        }

        // Paragraph - ambil text saja
        if (node.type === "paragraph") {
          const content = node.content?.map(parseNode).join("") ?? "";
          return content;
        }

        // Heading - ambil text tanpa # markdown
        if (node.type === "heading") {
          const content = node.content?.map(parseNode).join("") ?? "";
          return content;
        }

        // Blockquote - ambil text tanpa > markdown
        if (node.type === "blockquote") {
          const content = node.content?.map(parseNode).join("") ?? "";
          return content;
        }

        // List items
        if (node.type === "bulletList" || node.type === "orderedList") {
          const items = node.content?.map(parseNode).join(" ") ?? "";
          return items;
        }

        if (node.type === "listItem") {
          const content = node.content?.map(parseNode).join(" ") ?? "";
          return content;
        }

        // Code block - ambil text saja
        if (node.type === "codeBlock") {
          const content = node.content?.map(parseNode).join("") ?? "";
          return content;
        }

        // Hard break
        if (node.type === "hardBreak") {
          return " ";
        }

        // Recursive untuk node lain yang punya children
        if (node.content) {
          return node.content.map(parseNode).join(" ");
        }

        return "";
      };

      // Parse semua content dan join dengan spasi
      const plainText = parsed.content?.map(parseNode).join(" ") ?? "";

      // Clean up: remove multiple spaces, trim
      return plainText.replace(/\s+/g, " ").trim();
    } catch (e) {
      console.error("Error parsing note:", e);
      return "";
    }
  }, [jsonString]);
}
