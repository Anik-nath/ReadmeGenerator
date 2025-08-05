"use client";

import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Code,
  GripVertical,
  Maximize2,
  Minimize2,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

interface EditorPanelProps {
  markdownContent: string;
  setMarkdownContent: (content: string) => void;
  isPreviewExpanded: boolean;
  setIsPreviewExpanded: (expanded: boolean) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  editorWidth: number;
  setEditorWidth: (width: number) => void;
  isResizing: boolean;
  setIsResizing: (resizing: boolean) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

export default function EditorPanel({
  markdownContent,
  setMarkdownContent,
  isPreviewExpanded,
  setIsPreviewExpanded,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  editorWidth,
  setEditorWidth,
  isResizing,
  setIsResizing,
  textareaRef,
  containerRef,
  children,
}: EditorPanelProps) {
  // Resizer functionality
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
    },
    [setIsResizing]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const newWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;

      // Constrain between 20% and 80%
      const constrainedWidth = Math.min(Math.max(newWidth, 20), 80);
      setEditorWidth(constrainedWidth);
    },
    [isResizing, containerRef, setEditorWidth]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, [setIsResizing]);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <Card
      className={`${
        isPreviewExpanded
          ? "col-span-1"
          : isSidebarCollapsed
          ? "xl:col-span-1"
          : "xl:col-span-4"
      } flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200/60 dark:border-gray-600/60 shadow-xl`}
    >
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-blue-200/60 dark:border-gray-600/60">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
            README Editor
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Badge
            variant="secondary"
            className="gap-1 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 text-xs"
          >
            <Sparkles className="w-3 h-3" />
            <span className="hidden sm:inline">Live Preview</span>
          </Badge>
          {!isPreviewExpanded && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="gap-1 sm:gap-2 text-xs hidden xl:flex border-gray-300 dark:border-gray-600 cursor-pointer"
            >
              {isSidebarCollapsed ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
              <span className="hidden lg:inline">
                {isSidebarCollapsed ? "Show" : "Hide"} Sidebar
              </span>
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
            className="gap-1 sm:gap-2 text-xs border-gray-300 dark:border-gray-600 cursor-pointer"
          >
            {isPreviewExpanded ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
              {isPreviewExpanded ? "Split View" : "Expand Preview"}
            </span>
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        className={`flex-1 overflow-hidden ${
          isPreviewExpanded ? "grid grid-cols-1" : "flex flex-col lg:flex-row"
        } gap-0 relative max-h-[calc(100vh-160px)]`}
      >
        {children}

        {/* Resize Handle - Only show on desktop */}
        {!isPreviewExpanded && (
          <div
            className="hidden lg:block w-1 bg-blue-200 dark:bg-gray-600 hover:bg-blue-300 dark:hover:bg-gray-500 cursor-col-resize flex items-center justify-center group transition-colors relative"
            onMouseDown={handleMouseDown}
          >
            <div className="absolute inset-y-0 -left-1 -right-1 flex items-center justify-center">
              <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
