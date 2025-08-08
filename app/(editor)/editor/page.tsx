"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor } from "@/hooks/useEditor";
import Navbar from "@/components/Navbar";
import DesktopSidebar from "@/components/DesktopSidebar";
import EditorPanel from "@/components/EditorPanel";
import PreviewPanel from "@/components/PreviewPanel";
import MarkdownEditor from "@/components/MarkdownEditor";

interface CustomSection {
  id: string;
  title: string;
  template: string;
}

export default function ReadmeGenerator() {
  const [markdownContent, setMarkdownContent] = useState("");
  const [customSections, setCustomSections] = useState<CustomSection[]>([]);
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCustomSectionDialogOpen, setIsCustomSectionDialogOpen] =
    useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionTemplate, setNewSectionTemplate] = useState("");
  const [editorWidth, setEditorWidth] = useState(50); // Percentage width for editor
  const [isResizing, setIsResizing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    textareaRef,
    addSection,
    addCustomSection: handleAddCustomSection,
    removeCustomSection,
  } = useEditor({
    markdownContent,
    setMarkdownContent,
    customSections,
    setCustomSections,
    setNewSectionTitle,
    setNewSectionTemplate,
    setIsCustomSectionDialogOpen,
    setIsMobileSidebarOpen,
  });

  const addCustomSection = useCallback(() => {
    handleAddCustomSection(newSectionTitle, newSectionTemplate);
  }, [handleAddCustomSection, newSectionTitle, newSectionTemplate]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const getGridCols = () => {
    if (isPreviewExpanded) return "grid-cols-1";
    if (isSidebarCollapsed) return "xl:grid-cols-1";
    return "xl:grid-cols-5";
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Navbar
        markdownContent={markdownContent}
        setMarkdownContent={setMarkdownContent}
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        isCustomSectionDialogOpen={isCustomSectionDialogOpen}
        setIsCustomSectionDialogOpen={setIsCustomSectionDialogOpen}
        newSectionTitle={newSectionTitle}
        setNewSectionTitle={setNewSectionTitle}
        newSectionTemplate={newSectionTemplate}
        setNewSectionTemplate={setNewSectionTemplate}
        addCustomSection={addCustomSection}
        customSections={customSections}
        addSection={addSection}
        removeCustomSection={removeCustomSection}
        textareaRef={textareaRef}
      />

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-0 py-3 sm:py-8">
        <div
          className={`grid gap-3 sm:gap-6 h-[calc(100vh-100px)] sm:h-[calc(100vh-140px)] ${getGridCols()}`}
        >
          {/* Desktop Sections Sidebar */}
          <DesktopSidebar
            isPreviewExpanded={isPreviewExpanded}
            isSidebarCollapsed={isSidebarCollapsed}
            isCustomSectionDialogOpen={isCustomSectionDialogOpen}
            setIsCustomSectionDialogOpen={setIsCustomSectionDialogOpen}
            newSectionTitle={newSectionTitle}
            setNewSectionTitle={setNewSectionTitle}
            newSectionTemplate={newSectionTemplate}
            setNewSectionTemplate={setNewSectionTemplate}
            addCustomSection={addCustomSection}
            customSections={customSections}
            addSection={addSection}
            removeCustomSection={removeCustomSection}
          />

          {/* Editor/Preview Panel */}
          <EditorPanel
            markdownContent={markdownContent}
            setMarkdownContent={setMarkdownContent}
            isPreviewExpanded={isPreviewExpanded}
            setIsPreviewExpanded={setIsPreviewExpanded}
            isSidebarCollapsed={isSidebarCollapsed}
            setIsSidebarCollapsed={setIsSidebarCollapsed}
            editorWidth={editorWidth}
            setEditorWidth={setEditorWidth}
            isResizing={isResizing}
            setIsResizing={setIsResizing}
            textareaRef={textareaRef}
            containerRef={containerRef}
          >
            {/* Editor */}
            {!isPreviewExpanded && (
              <MarkdownEditor
                markdownContent={markdownContent}
                setMarkdownContent={setMarkdownContent}
                isPreviewExpanded={isPreviewExpanded}
                editorWidth={editorWidth}
                textareaRef={textareaRef}
              />
            )}

            {/* Preview */}
            <PreviewPanel
              markdownContent={markdownContent}
              isPreviewExpanded={isPreviewExpanded}
              editorWidth={editorWidth}
            />
          </EditorPanel>
        </div>
      </div>
    </div>
  );
}
