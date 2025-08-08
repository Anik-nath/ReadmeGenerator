"use client";

import SidebarContent from "@/components/SidebarContent";
import { Card } from "@/components/ui/card";

interface CustomSection {
  id: string;
  title: string;
  template: string;
}

interface DesktopSidebarProps {
  isPreviewExpanded: boolean;
  isSidebarCollapsed: boolean;
  isCustomSectionDialogOpen: boolean;
  setIsCustomSectionDialogOpen: (open: boolean) => void;
  newSectionTitle: string;
  setNewSectionTitle: (title: string) => void;
  newSectionTemplate: string;
  setNewSectionTemplate: (template: string) => void;
  addCustomSection: () => void;
  customSections: CustomSection[];
  addSection: (templateKey: string) => void;
  removeCustomSection: (id: string) => void;
}

export default function DesktopSidebar({
  isPreviewExpanded,
  isSidebarCollapsed,
  isCustomSectionDialogOpen,
  setIsCustomSectionDialogOpen,
  newSectionTitle,
  setNewSectionTitle,
  newSectionTemplate,
  setNewSectionTemplate,
  addCustomSection,
  customSections,
  addSection,
  removeCustomSection,
}: DesktopSidebarProps) {
  if (isPreviewExpanded || isSidebarCollapsed) {
    return null;
  }

  return (
    <Card className="hidden xl:block xl:col-span-1 py-4 sm:py-2.5 px-4 sm:px-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200/60 dark:border-gray-600/60 shadow-xl">
      <SidebarContent
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
    </Card>
  );
}
