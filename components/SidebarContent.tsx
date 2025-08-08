//@ts-nochec
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { defaultSectionTemplates } from "@/lib/utils/defaultSectionTemplates";
import { Plus, Settings, Trash2 } from "lucide-react";

const SidebarContent = ({
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
}: any) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-xs">
        Add Sections
      </h3>
      <Dialog
        open={isCustomSectionDialogOpen}
        onOpenChange={setIsCustomSectionDialogOpen}
      >
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="w-7 h-7 bg-transparent border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer"
            title="Create custom section"
          >
            <Settings className="w-3 h-3" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[95vw] max-w-md">
          <DialogHeader>
            <DialogTitle>Create Custom Section</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="section-title">Section Title</Label>
              <Input
                id="section-title"
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
                placeholder="e.g., Deployment"
              />
            </div>
            <div>
              <Label htmlFor="section-template">Template Content</Label>
              <Textarea
                id="section-template"
                value={newSectionTemplate}
                onChange={(e) => setNewSectionTemplate(e.target.value)}
                placeholder="## Deployment&#10;&#10;Add deployment instructions here..."
                className="min-h-[120px] font-mono text-sm"
              />
            </div>
            <Button
              onClick={addCustomSection}
              className="w-full cursor-pointer"
            >
              Create Section
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    <p className="text-xs md:text-[11px] text-blue-600 dark:text-blue-400 mb-4">
      Click any section to insert it at your cursor position
    </p>
    <ScrollArea className="h-[calc(100vh-200px)] sm:h-[calc(100vh-300px)]">
      <div className="space-y-0.5 ">
        {Object.entries(defaultSectionTemplates).map(([key, template]) => (
          <Button
            key={key}
            size="sm"
            className="w-full bg-white dark:bg-transparent !pl-0 border-b last:border-0 justify-start text-left h-auto py-2 sm:py-3 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-none cursor-pointer"
            onClick={() => addSection(key)}
          >
            <Plus className="w-3 h-3 mr-1 flex-shrink-0 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {template.title}
            </span>
          </Button>
        ))}

        {customSections.length > 0 && (
          <>
            <div className="pt-4 pb-2">
              <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Custom Sections
              </h4>
            </div>
            {customSections.map((section: any) => (
              <div key={section.id} className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 justify-start text-left h-auto p-2 sm:p-3 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
                  onClick={() => addSection(section.id)}
                >
                  <Plus className="w-3 h-3 mr-2 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {section.title}
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 cursor-pointer"
                  onClick={() => removeCustomSection(section.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </>
        )}
      </div>
    </ScrollArea>
  </div>
);

export default SidebarContent;
