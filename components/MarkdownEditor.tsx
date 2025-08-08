"use client";

import type React from "react";
import { useEffect, useState, useCallback, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Code } from "lucide-react";

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
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [lineCount, setLineCount] = useState(1);
  const highlightRef = useRef<HTMLDivElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Constants for consistent styling
  const LINE_HEIGHT = 22;
  const FONT_SIZE = 14;
  const PADDING_TOP = 16;
  const PADDING_LEFT = 16;
  const PADDING_RIGHT = 16;
  const PADDING_BOTTOM = 16;

  // Calculate line count whenever content changes
  useEffect(() => {
    const lines = markdownContent ? markdownContent.split("\n").length : 1;
    setLineCount(lines);
  }, [markdownContent]);

  // Sync scroll between textarea and highlight layer
  const handleScroll = useCallback((e: React.UIEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const newScrollTop = target.scrollTop;
    const newScrollLeft = target.scrollLeft;

    setScrollTop(newScrollTop);
    setScrollLeft(newScrollLeft);

    // Sync highlight layer scroll
    if (highlightRef.current) {
      highlightRef.current.scrollTop = newScrollTop;
      highlightRef.current.scrollLeft = newScrollLeft;
    }

    // Sync line numbers scroll
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = newScrollTop;
    }
  }, []);

  // Generate line numbers
  const renderLineNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= lineCount; i++) {
      numbers.push(
        <div
          key={i}
          style={{
            height: `${LINE_HEIGHT}px`,
            lineHeight: `${LINE_HEIGHT}px`,
            fontSize: `${FONT_SIZE - 2}px`,
            color: "#858585",
            textAlign: "right",
            paddingRight: "8px",
            userSelect: "none",
            minHeight: `${LINE_HEIGHT}px`,
          }}
        >
          {i}
        </div>
      );
    }
    return numbers;
  };

  // Enhanced syntax highlighting
  const renderHighlightedContent = () => {
    if (!markdownContent) {
      return (
        <div
          style={{
            height: `${LINE_HEIGHT}px`,
            lineHeight: `${LINE_HEIGHT}px`,
            fontSize: `${FONT_SIZE}px`,
            color: "transparent",
            minHeight: `${LINE_HEIGHT}px`,
          }}
        >
          &nbsp;
        </div>
      );
    }

    const lines = markdownContent.split("\n");
    return lines.map((line, index) => {
      let highlightedLine = line.length === 0 ? "&nbsp;" : line; // Handle empty lines properly

      // Headers (# ## ### etc.)
      if (line.match(/^#{1,6}\s/)) {
        const level = line.match(/^#{1,6}/)?.[0].length || 1;
        const color = level <= 2 ? "#4fc3f7" : "#81c784";
        highlightedLine = `<span style="color: ${color}; font-weight: bold;">${line}</span>`;
      }
      // Code blocks
      else if (line.match(/^```/)) {
        highlightedLine = `<span style="color: #f48fb1; font-weight: 500;">${line}</span>`;
      }
      // Bold text
      else if (line.includes("**")) {
        highlightedLine = line.replace(
          /(\*\*)(.*?)(\*\*)/g,
          '<span style="color: #ffab40; font-weight: bold;">$1$2$3</span>'
        );
      }
      // Italic text (but not bold)
      else if (line.includes("*") && !line.includes("**")) {
        highlightedLine = line.replace(
          /(\*)((?:(?!\*).)+)(\*)/g,
          '<span style="color: #ffab40; font-style: italic;">$1$2$3</span>'
        );
      }
      // Links
      else if (line.includes("[") && line.includes("](")) {
        highlightedLine = line.replace(
          /(\[)([^\]]+)(\])(\()([^)]+)(\))/g,
          '<span style="color: #81c784;">$1$2$3</span><span style="color: #ffcc02;">$4$5$6</span>'
        );
      }
      // Inline code
      else if (line.includes("`") && !line.match(/^```/)) {
        highlightedLine = line.replace(
          /(`)((?:(?!`).)+)(`)/g,
          '<span style="color: #f48fb1; background-color: rgba(255,255,255,0.1); padding: 1px 2px; border-radius: 2px;">$1$2$3</span>'
        );
      }
      // Lists
      else if (line.match(/^[\s]*[-*+]\s/) || line.match(/^[\s]*\d+\.\s/)) {
        highlightedLine = line.replace(
          /^(\s*)([-*+]|\d+\.)(\s)/,
          '<span style="color: #ab47bc; font-weight: 500;">$1$2</span>$3'
        );
      }
      // Blockquotes
      else if (line.match(/^>\s/)) {
        highlightedLine = `<span style="color: #7986cb; font-style: italic;">${line}</span>`;
      }

      return (
        <div
          key={index}
          style={{
            height: `${LINE_HEIGHT}px`,
            lineHeight: `${LINE_HEIGHT}px`,
            fontSize: `${FONT_SIZE}px`,
            fontFamily:
              'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            color: "#d4d4d4",
            minHeight: `${LINE_HEIGHT}px`,
            width: "100%",
          }}
          dangerouslySetInnerHTML={{ __html: highlightedLine }}
        />
      );
    });
  };

  return (
    <>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #404040;
          border-radius: 3px;
          transition: background-color 0.2s ease;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #525252;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:active {
          background: #606060;
        }

        .custom-scrollbar::-webkit-scrollbar-corner {
          background: transparent;
        }

        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #404040 transparent;
        }
      `}</style>

      <div
        className={`flex flex-col border-b lg:border-b-0 lg:border-r border-blue-200/60 dark:border-gray-600/60 ${
          isPreviewExpanded ? "w-full" : "w-full lg:w-1/2"
        }`}
        style={
          typeof window !== "undefined" &&
          window.innerWidth >= 1024 &&
          !isPreviewExpanded
            ? { width: `${editorWidth}%` }
            : {}
        }
      >
        {/* Header */}
        <div className="flex items-center gap-2 p-2 sm:p-3 border-b border-blue-200/60 dark:border-gray-600/60 bg-[#1e1e1e] text-white">
          <Code className="w-4 h-4 text-blue-400" />
          <span className="font-medium text-sm text-gray-200">README.md</span>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-400">Markdown</span>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 relative bg-[#1e1e1e] overflow-hidden">
          {/* Line Numbers */}
          <div
            ref={lineNumbersRef}
            className="absolute left-0 top-0 bottom-6 w-12 bg-[#1e1e1e] border-r border-[#2d2d30] z-20 overflow-hidden custom-scrollbar"
            style={{
              paddingTop: `${PADDING_TOP}px`,
              paddingBottom: `${PADDING_BOTTOM}px`,
            }}
          >
            <div style={{ height: "fit-content" }}>{renderLineNumbers()}</div>
          </div>

          {/* Editor Container */}
          <div className="absolute left-12 top-0 right-0 bottom-6 overflow-hidden">
            {/* Syntax Highlighting Layer */}
            <div
              ref={highlightRef}
              className="absolute inset-0 overflow-auto pointer-events-none z-10 custom-scrollbar"
              style={{
                padding: `${PADDING_TOP}px ${PADDING_RIGHT}px ${PADDING_BOTTOM}px ${PADDING_LEFT}px`,
                fontFamily:
                  'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                fontSize: `${FONT_SIZE}px`,
                lineHeight: `${LINE_HEIGHT}px`,
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div style={{ height: "fit-content", minHeight: "100%" }}>
                {renderHighlightedContent()}
              </div>
            </div>

            {/* Textarea */}
            <div className="absolute inset-0">
              <Textarea
                ref={textareaRef}
                value={markdownContent}
                onChange={(e) => setMarkdownContent(e.target.value)}
                onScroll={handleScroll}
                className="w-full h-full resize-none border-0 rounded-none font-mono focus-visible:ring-0 bg-transparent relative z-15 overflow-auto custom-scrollbar"
                placeholder="Start writing your README here... Click sections from the sidebar to insert templates"
                style={{
                  fontFamily:
                    'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                  background: "transparent",
                  caretColor: "#ffffff",
                  lineHeight: `${LINE_HEIGHT}px`,
                  fontSize: `${FONT_SIZE}px`,
                  padding: `${PADDING_TOP}px ${PADDING_RIGHT}px ${PADDING_BOTTOM}px ${PADDING_LEFT}px`,
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  overflowWrap: "break-word",
                  color: markdownContent ? "transparent" : "#6b7280",
                  WebkitTextFillColor: markdownContent
                    ? "transparent"
                    : "#6b7280",
                  minHeight: "100%",
                }}
              />
            </div>
          </div>

          {/* Status Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#007acc] text-white text-xs flex items-center px-3 gap-4 z-30">
            <span>
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
              <span>{markdownContent.length} chars</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
