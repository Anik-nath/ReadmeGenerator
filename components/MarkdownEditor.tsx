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
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync scroll between all components
  const handleScroll = useCallback((e: React.UIEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const newScrollTop = target.scrollTop;
    const newScrollLeft = target.scrollLeft;

    setScrollTop(newScrollTop);
    setScrollLeft(newScrollLeft);

    // Sync highlight layer
    if (highlightRef.current) {
      highlightRef.current.scrollTop = newScrollTop;
      highlightRef.current.scrollLeft = newScrollLeft;
    }

    // Sync line numbers
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = newScrollTop;
    }
  }, []);

  // Calculate accurate line count including wrapped lines
  useEffect(() => {
    if (!textareaRef.current || !markdownContent) {
      setLineCount(1);
      return;
    }

    const textarea = textareaRef.current;
    const lines = markdownContent.split("\n");
    let totalLines = 0;

    // Create a temporary element to measure text
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.visibility = "hidden";
    tempDiv.style.height = "auto";
    tempDiv.style.width = `${textarea.clientWidth - 32}px`; // Account for padding
    tempDiv.style.fontSize = "14px";
    tempDiv.style.lineHeight = "22px";
    tempDiv.style.fontFamily =
      'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace';
    tempDiv.style.whiteSpace = "pre-wrap";
    tempDiv.style.wordWrap = "break-word";
    tempDiv.style.overflowWrap = "break-word";
    document.body.appendChild(tempDiv);

    lines.forEach((line) => {
      tempDiv.textContent = line || " ";
      const height = tempDiv.offsetHeight;
      const lineHeight = 22;
      const wrappedLines = Math.max(1, Math.ceil(height / lineHeight));
      totalLines += wrappedLines;
    });

    document.body.removeChild(tempDiv);
    setLineCount(totalLines);
  }, [markdownContent, textareaRef]);

  // Generate line numbers
  const renderLineNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= lineCount; i++) {
      numbers.push(
        <div
          key={i}
          style={{
            height: "22px",
            lineHeight: "22px",
            fontSize: "12px",
            color: "#6b7280",
            textAlign: "right",
            paddingRight: "8px",
            userSelect: "none",
            flexShrink: 0,
            fontFamily:
              'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          }}
        >
          {i}
        </div>
      );
    }
    return numbers;
  };

  // Syntax highlighting function
  const applySyntaxHighlighting = (text: string) => {
    let highlighted = text;

    // Headers
    highlighted = highlighted.replace(
      /^(#{1,6})\s(.+)$/gm,
      '<span style="color: #4fc3f7; font-weight: bold;">$1 $2</span>'
    );

    // Code blocks
    highlighted = highlighted.replace(
      /^```(.*)$/gm,
      '<span style="color: #f48fb1; font-weight: 500;">```$1</span>'
    );

    // Bold text
    highlighted = highlighted.replace(
      /(\*\*)((?:(?!\*\*).)+)(\*\*)/g,
      '<span style="color: #ffab40; font-weight: bold;">$1$2$3</span>'
    );

    // Italic text
    highlighted = highlighted.replace(
      /(?<!\*)\*([^*\n]+)\*(?!\*)/g,
      '<span style="color: #ffab40; font-style: italic;">*$1*</span>'
    );

    // Links
    highlighted = highlighted.replace(
      /(\[)([^\]]+)(\])(\()([^)]+)(\))/g,
      '<span style="color: #81c784;">$1$2$3</span><span style="color: #ffcc02;">$4$5$6</span>'
    );

    // Inline code
    highlighted = highlighted.replace(
      /(?<!`)`([^`\n]+)`(?!`)/g,
      '<span style="color: #f48fb1; background-color: rgba(255,255,255,0.1); padding: 1px 3px; border-radius: 3px;">$&</span>'
    );

    // Lists
    highlighted = highlighted.replace(
      /^(\s*)([-*+]|\d+\.)\s/gm,
      '$1<span style="color: #ab47bc; font-weight: 500;">$2</span> '
    );

    // Blockquotes
    highlighted = highlighted.replace(
      /^>\s(.+)$/gm,
      '<span style="color: #7986cb; font-style: italic;">> $1</span>'
    );

    return highlighted;
  };

  return (
    <>
      {/* Custom Scrollbar Styles */}
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

        .highlight-layer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: auto;
          padding: 16px;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas,
            "Liberation Mono", Menlo, monospace;
          font-size: 14px;
          line-height: 22px;
          white-space: pre-wrap;
          word-wrap: break-word;
          overflow-wrap: break-word;
          color: #d4d4d4;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .highlight-layer::-webkit-scrollbar {
          display: none;
        }

        .editor-textarea {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: transparent !important;
          border: none !important;
          outline: none !important;
          resize: none !important;
          padding: 16px;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas,
            "Liberation Mono", Menlo, monospace;
          font-size: 14px;
          line-height: 22px;
          white-space: pre-wrap;
          word-wrap: break-word;
          overflow-wrap: break-word;
          caret-color: #ffffff;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }

        .editor-textarea::placeholder {
          color: #6b7280;
          -webkit-text-fill-color: #6b7280;
        }

        .editor-textarea:focus {
          outline: none !important;
          box-shadow: none !important;
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
        <div
          className="flex-1 relative bg-[#1e1e1e] overflow-hidden"
          ref={containerRef}
        >
          {/* Line Numbers */}
          <div
            ref={lineNumbersRef}
            className="absolute left-0 top-0 bottom-6 w-12 bg-[#1e1e1e] border-r border-[#2d2d30] z-20 overflow-hidden custom-scrollbar"
            style={{
              paddingTop: "16px",
              paddingBottom: "16px",
            }}
          >
            <div style={{ height: "fit-content", minHeight: "100%" }}>
              {renderLineNumbers()}
            </div>
          </div>

          {/* Editor Container */}
          <div className="absolute left-12 top-0 right-0 bottom-6">
            {/* Syntax Highlighting Layer */}
            <div
              ref={highlightRef}
              className="highlight-layer custom-scrollbar"
              dangerouslySetInnerHTML={{
                __html: markdownContent
                  ? applySyntaxHighlighting(markdownContent)
                  : "",
              }}
            />

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={markdownContent}
              onChange={(e) => setMarkdownContent(e.target.value)}
              onScroll={handleScroll}
              className="editor-textarea custom-scrollbar"
              placeholder="Start writing your README here... Click sections from the sidebar to insert templates"
              spellCheck={false}
            />
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
