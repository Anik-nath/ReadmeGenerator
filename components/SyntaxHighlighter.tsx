"use client";

import type React from "react";

interface SyntaxHighlighterProps {
  markdownContent: string;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export default function SyntaxHighlighter({
  markdownContent,
  textareaRef,
}: SyntaxHighlighterProps) {
  // Enhanced VS Code-like Markdown Syntax Highlighting with comprehensive color coding
  const highlightMarkdownLine = (line: string) => {
    if (!line.trim()) return <span>&nbsp;</span>;

    // Headers with distinct colors for each level
    if (line.match(/^#{1,6}\s/)) {
      const level = line.match(/^#+/)?.[0].length || 1;
      const headerColors = {
        1: "text-red-400 dark:text-red-300", // H1 - Red
        2: "text-orange-400 dark:text-orange-300", // H2 - Orange
        3: "text-yellow-400 dark:text-yellow-300", // H3 - Yellow
        4: "text-green-400 dark:text-green-300", // H4 - Green
        5: "text-blue-400 dark:text-blue-300", // H5 - Blue
        6: "text-purple-400 dark:text-purple-300", // H6 - Purple
      };
      return (
        <span>
          <span className="text-gray-500 dark:text-gray-400 font-bold">
            {line.match(/^#+/)?.[0]}
          </span>
          <span
            className={`font-bold ${
              headerColors[level as keyof typeof headerColors] ||
              "text-red-400 dark:text-red-300"
            }`}
          >
            {line.replace(/^#+\s?/, " ")}
          </span>
        </span>
      );
    }

    // Code blocks - Green with background
    if (line.match(/^```/)) {
      const language = line.match(/^```(\w+)/)?.[1] || "";
      return (
        <span className="text-green-300 dark:text-green-200 bg-green-900/30 dark:bg-green-800/30 px-2 py-1 rounded font-mono">
          <span className="text-green-400 dark:text-green-300">\`\`\`</span>
          {language && (
            <span className="text-emerald-300 dark:text-emerald-200 ml-1">
              {language}
            </span>
          )}
        </span>
      );
    }

    // Lists with different colors for bullets and numbers
    if (line.match(/^\s*[-*+]\s/) || line.match(/^\s*\d+\.\s/)) {
      const listMatch = line.match(/^(\s*)([-*+]|\d+\.)\s(.*)$/);
      if (listMatch) {
        const isBullet = listMatch[2].match(/[-*+]/);
        const isTaskList = listMatch[3].match(/^\[[ x]\]/);

        return (
          <span>
            <span className="text-gray-500 dark:text-gray-400">
              {listMatch[1]}
            </span>
            <span
              className={
                isBullet
                  ? "text-cyan-400 dark:text-cyan-300 font-bold"
                  : "text-pink-400 dark:text-pink-300 font-bold"
              }
            >
              {listMatch[2]}
            </span>
            {isTaskList ? (
              <span>
                <span className="text-indigo-400 dark:text-indigo-300 font-bold ml-1">
                  {listMatch[3].match(/^\[[ x]\]/)?.[0]}
                </span>
                <span className="text-gray-200 dark:text-gray-100 ml-1">
                  {listMatch[3].replace(/^\[[ x]\]\s?/, "")}
                </span>
              </span>
            ) : (
              <span className="text-gray-200 dark:text-gray-100">
                {" "}
                {processInlineMarkdown(listMatch[3])}
              </span>
            )}
          </span>
        );
      }
    }

    // Blockquotes - Blue with background
    if (line.match(/^\s*>/)) {
      return (
        <span>
          <span className="text-blue-400 dark:text-blue-300 font-bold">
            {line.match(/^\s*>+/)?.[0]}
          </span>
          <span className="text-blue-200 dark:text-blue-100 italic bg-blue-900/20 dark:bg-blue-800/20 px-1 rounded ml-1">
            {line.replace(/^\s*>+\s?/, "")}
          </span>
        </span>
      );
    }

    // Tables - Purple borders with backgrounds
    if (line.includes("|")) {
      const parts = line.split("|");
      const isHeaderSeparator = line.match(/^\s*\|?\s*:?-+:?\s*\|/);

      return (
        <span>
          {parts.map((part, index) => (
            <span key={index}>
              {index > 0 && (
                <span className="text-purple-400 dark:text-purple-300 font-bold">
                  |
                </span>
              )}
              <span
                className={
                  isHeaderSeparator
                    ? "text-purple-300 dark:text-purple-200 bg-purple-900/30 dark:bg-purple-800/30 px-1"
                    : "text-cyan-200 dark:text-cyan-100 bg-gray-800/30 dark:bg-gray-700/30 px-1"
                }
              >
                {part}
              </span>
            </span>
          ))}
        </span>
      );
    }

    // Horizontal rules - Gray with background
    if (
      line.match(/^---+$/) ||
      line.match(/^\*\*\*+$/) ||
      line.match(/^___+$/)
    ) {
      return (
        <span className="text-gray-400 dark:text-gray-300 font-bold bg-gray-800/30 dark:bg-gray-700/30 px-2 py-1 rounded block">
          {line}
        </span>
      );
    }

    // Images - Magenta
    if (line.match(/!\[.*?\]$$.*?$$/)) {
      return (
        <span className="text-magenta-400 dark:text-magenta-300">
          {processInlineMarkdown(line)}
        </span>
      );
    }

    // Links - Blue and cyan (handled in processInlineMarkdown)
    if (line.match(/\[.*?\]$$.*?$$/)) {
      return (
        <span className="text-gray-200 dark:text-gray-100">
          {processInlineMarkdown(line)}
        </span>
      );
    }

    // Regular text with inline formatting
    return (
      <span className="text-gray-200 dark:text-gray-100">
        {processInlineMarkdown(line)}
      </span>
    );
  };

  // Enhanced inline markdown processing with comprehensive color coding
  const processInlineMarkdown = (text: string) => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    // Bold **text** - Yellow markers, white text
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      parts.push(
        <span key={match.index} className="text-white font-bold">
          <span className="text-yellow-400 dark:text-yellow-300 font-bold">
            **
          </span>
          {match[1]}
          <span className="text-yellow-400 dark:text-yellow-300 font-bold">
            **
          </span>
        </span>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      let remainingText = text.slice(lastIndex);

      // Italic *text* - Green markers
      remainingText = remainingText.replace(
        /(?<!\*)\*([^*]+)\*(?!\*)/g,
        '<span class="text-green-400 dark:text-green-300 font-bold">*</span><span class="text-white italic">$1</span><span class="text-green-400 dark:text-green-300 font-bold">*</span>'
      );

      // Inline code `code` - Orange with background
      remainingText = remainingText.replace(
        /`([^`]+)`/g,
        '<span class="text-orange-400 dark:text-orange-300 font-bold">`</span><span class="text-orange-100 dark:text-orange-100 bg-orange-900/40 dark:bg-orange-800/40 px-1.5 py-0.5 rounded font-mono">$1</span><span class="text-orange-400 dark:text-orange-300 font-bold">`</span>'
      );

      // Images ![alt](url) - Magenta
      remainingText = remainingText.replace(
        /!\[([^\]]*)\]$$([^)]+)$$/g,
        '<span class="text-magenta-400 dark:text-magenta-300 font-bold">![</span><span class="text-magenta-200 dark:text-magenta-200">$1</span><span class="text-magenta-400 dark:text-magenta-300 font-bold">](</span><span class="text-magenta-300 dark:text-magenta-300 underline">$2</span><span class="text-magenta-400 dark:text-magenta-300 font-bold">)</span>'
      );

      // Links [text](url) - Blue and cyan
      remainingText = remainingText.replace(
        /(?<!!)\[([^\]]+)\]$$([^)]+)$$/g,
        '<span class="text-blue-400 dark:text-blue-300 font-bold">[</span><span class="text-blue-100 dark:text-blue-100">$1</span><span class="text-blue-400 dark:text-blue-300 font-bold">](</span><span class="text-cyan-400 dark:text-cyan-300 underline">$2</span><span class="text-blue-400 dark:text-blue-300 font-bold">)</span>'
      );

      // Strikethrough ~~text~~ - Red
      remainingText = remainingText.replace(
        /~~(.*?)~~/g,
        '<span class="text-red-400 dark:text-red-300 font-bold">~~</span><span class="text-gray-300 dark:text-gray-200 line-through">$1</span><span class="text-red-400 dark:text-red-300 font-bold">~~</span>'
      );

      // Emojis and special characters - Keep original color
      remainingText = remainingText.replace(
        /([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/gu,
        '<span class="text-yellow-300 dark:text-yellow-200">$1</span>'
      );

      parts.push(
        <span
          key="remaining"
          dangerouslySetInnerHTML={{ __html: remainingText }}
        />
      );
    }

    return parts.length > 0 ? parts : text;
  };

  if (!markdownContent || textareaRef.current?.matches(":focus")) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 p-3 sm:p-4 font-mono text-sm pointer-events-none z-10"
      style={{
        fontFamily:
          'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
        lineHeight: "20px",
        fontSize: "14px",
        top: "0px",
        left: "0px",
        wordWrap: "break-word",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
      }}
    >
      {markdownContent.split("\n").map((line, lineIndex) => (
        <div
          key={lineIndex}
          style={{
            minHeight: "20px",
            lineHeight: "20px",
          }}
        >
          {highlightMarkdownLine(line)}
        </div>
      ))}
    </div>
  );
}
