"use client";

import MarkDownPreview from "@/components/MarkDownPreview";
import EmptyState from "@/components/EmptyState";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye } from "lucide-react";

interface PreviewPanelProps {
  markdownContent: string;
  isPreviewExpanded: boolean;
  editorWidth: number;
}

export default function PreviewPanel({
  markdownContent,
  isPreviewExpanded,
  editorWidth,
}: PreviewPanelProps) {
  return (
    <div
      className={`flex flex-col ${
        isPreviewExpanded ? "w-full" : "w-full lg:w-1/2"
      }`}
      style={
        window.innerWidth >= 1024 && !isPreviewExpanded
          ? { width: `${100 - editorWidth}%` }
          : {}
      }
    >
      <div className="flex items-center gap-2 p-2 sm:p-3 border-b border-blue-200/60 dark:border-gray-600/60 bg-blue-50/50 dark:bg-gray-700/50">
        <Eye className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        <span className="font-medium text-sm text-gray-700 dark:text-gray-200">
          Live Preview
        </span>
      </div>
      <ScrollArea className="flex-1 min-h-[300px] lg:min-h-0 max-h-[calc(100vh-200px)]">
        <div className="preview-content p-3 sm:p-6 bg-white dark:bg-gray-800 max-w-full overflow-hidden">
          <div className="github-markdown-body prose prose-sm sm:prose max-w-none">
            {markdownContent ? (
              <MarkDownPreview markdownContent={markdownContent} />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
