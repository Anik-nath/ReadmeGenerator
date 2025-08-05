"use client";

import type React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Code } from "lucide-react";
import SyntaxHighlighter from "./SyntaxHighlighter";

interface MarkdownEditorProps {
  markdownContent: string;
  setMarkdownContent: (content: string) => void;
  isPreviewExpanded: boolean;
  editorWidth: number;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export default function MarkdownEditor({
  markdownContent,
  setMarkdownContent,
  isPreviewExpanded,
  editorWidth,
  textareaRef,
}: MarkdownEditorProps) {
  // Get line numbers for empty content
  const getLineNumbers = () => {
    if (!markdownContent) {
      return [1]; // Show at least line 1 for empty content
    }
    return markdownContent.split("\n").map((_, index) => index + 1);
  };

  return (
    <div
      className={`flex flex-col border-b lg:border-b-0 lg:border-r border-blue-200/60 dark:border-gray-600/60 ${
        isPreviewExpanded ? "w-full" : "w-full lg:w-1/2"
      }`}
      style={
        window.innerWidth >= 1024 && !isPreviewExpanded
          ? { width: `${editorWidth}%` }
          : {}
      }
    >
      <div className="flex items-center gap-2 p-2 sm:p-3 border-b border-blue-200/60 dark:border-gray-600/60 bg-[#1e1e1e] text-white">
        <Code className="w-4 h-4 text-blue-400" />
        <span className="font-medium text-sm text-gray-200">README.md</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-xs text-gray-400">Markdown</span>
        </div>
      </div>
      <div className="flex-1 relative bg-[#1e1e1e] overflow-hidden min-h-[300px] lg:min-h-0 max-h-full">
        {/* Line Numbers */}
        <div className="absolute left-0 top-0 bottom-6 w-8 sm:w-12 bg-[#1e1e1e] border-r border-[#2d2d30] flex flex-col text-right pr-1 sm:pr-2 pt-3 sm:pt-4 text-xs text-gray-500 font-mono select-none z-10">
          {getLineNumbers().map((lineNum) => (
            <div
              key={lineNum}
              style={{ height: "20px", lineHeight: "20px" }}
              className="flex items-center justify-end"
            >
              {lineNum}
            </div>
          ))}
        </div>

        {/* Enhanced Textarea with Syntax Highlighting Overlay */}
        <div className="relative ml-8 sm:ml-12 h-full overflow-auto">
          {/* Actual Textarea */}
          <Textarea
            ref={textareaRef}
            value={markdownContent}
            onChange={(e) => setMarkdownContent(e.target.value)}
            className="w-full h-full resize-none border-0 rounded-none font-mono text-sm p-3 sm:p-4 focus-visible:ring-0 bg-transparent text-gray-200 dark:text-gray-300 caret-white relative z-30 focus:text-white overflow-y-auto cursor-text"
            placeholder="Start writing your README here... Click sections from the sidebar to insert templates"
            style={{
              fontFamily:
                'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              background: "transparent",
              caretColor: "#ffffff",
              lineHeight: "20px",
              fontSize: "14px",
              minHeight: "calc(100vh - 300px)",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
            }}
          />

          {/* Syntax Highlighting Layer */}
          <SyntaxHighlighter
            markdownContent={markdownContent}
            textareaRef={textareaRef}
          />
        </div>

        {/* VS Code-like Status Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#007acc] text-white text-xs flex items-center px-2 sm:px-3 gap-2 sm:gap-4">
          <span className="text-xs">
            Ln{" "}
            {
              markdownContent
                .substring(0, textareaRef.current?.selectionStart || 0)
                .split("\n").length
            }
            , Col{" "}
            {Math.max(
              1,
              (textareaRef.current?.selectionStart || 0) -
                markdownContent
                  .substring(0, textareaRef.current?.selectionStart || 0)
                  .lastIndexOf("\n")
            )}
          </span>
          <span className="hidden sm:inline">UTF-8</span>
          <span>Markdown</span>
          <div className="ml-auto">
            <span className="text-xs">{markdownContent.length} chars</span>
          </div>
        </div>
      </div>
    </div>
  );
}
