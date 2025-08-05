//@ts-nocheck
import { useCallback, useRef } from "react";
import { defaultSectionTemplates } from "@/lib/utils/defaultSectionTemplates";
import { toast } from "sonner";

interface CustomSection {
  id: string;
  title: string;
  template: string;
}

interface UseEditorProps {
  markdownContent: string;
  setMarkdownContent: (content: string) => void;
  customSections: CustomSection[];
  setCustomSections: (sections: CustomSection[]) => void;
  setNewSectionTitle: (title: string) => void;
  setNewSectionTemplate: (template: string) => void;
  setIsCustomSectionDialogOpen: (open: boolean) => void;
  setIsMobileSidebarOpen: (open: boolean) => void;
}

export const useEditor = ({
  markdownContent,
  setMarkdownContent,
  customSections,
  setCustomSections,
  setNewSectionTitle,
  setNewSectionTemplate,
  setIsCustomSectionDialogOpen,
  setIsMobileSidebarOpen,
}: UseEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const allSectionTemplates = {
    ...defaultSectionTemplates,
    ...customSections.reduce(
      (acc, section) => ({
        ...acc,
        [section.id]: { title: section.title, template: section.template },
      }),
      {}
    ),
  };

  const addSection = useCallback(
    (templateKey: string) => {
      const template =
        allSectionTemplates[templateKey as keyof typeof allSectionTemplates];
      if (!template) return;

      const textarea = textareaRef.current;
      if (textarea) {
        const cursorPosition = textarea.selectionStart;
        const textBefore = markdownContent.substring(0, cursorPosition);
        const textAfter = markdownContent.substring(cursorPosition);

        const needsSpaceBefore =
          textBefore.length > 0 && !textBefore.endsWith("\n\n");
        const spaceBefore = needsSpaceBefore ? "\n\n" : "";

        const newContent =
          textBefore + spaceBefore + template.template + textAfter;
        setMarkdownContent(newContent);

        setTimeout(() => {
          const newCursorPosition =
            cursorPosition + spaceBefore.length + template.template.length;
          textarea.setSelectionRange(newCursorPosition, newCursorPosition);
          textarea.focus();
        }, 0);
      } else {
        setMarkdownContent(
          (prev) => prev + (prev ? "\n\n" : "") + template.template
        );
      }

      // Close mobile sidebar after adding section
      setIsMobileSidebarOpen(false);
    },
    [
      markdownContent,
      setMarkdownContent,
      allSectionTemplates,
      setIsMobileSidebarOpen,
    ]
  );

  const addCustomSection = useCallback(
    (newSectionTitle: string, newSectionTemplate: string) => {
      if (!newSectionTitle.trim() || !newSectionTemplate.trim()) return;

      const newSection: CustomSection = {
        id: `custom-${Date.now()}`,
        title: newSectionTitle,
        template: newSectionTemplate + "\n\n",
      };

      setCustomSections([...customSections, newSection]);
      setNewSectionTitle("");
      setNewSectionTemplate("");
      setIsCustomSectionDialogOpen(false);
      toast.success("Custom section created successfully!");
    },
    [
      customSections,
      setCustomSections,
      setNewSectionTitle,
      setNewSectionTemplate,
      setIsCustomSectionDialogOpen,
    ]
  );

  const removeCustomSection = useCallback(
    (id: string) => {
      setCustomSections(customSections.filter((section) => section.id !== id));
      toast.success("Custom section removed!");
    },
    [customSections, setCustomSections]
  );

  return {
    textareaRef,
    addSection,
    addCustomSection,
    removeCustomSection,
  };
};
