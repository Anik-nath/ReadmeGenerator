//@ts-nochec
"use client";

import SidebarContent from "@/components/SidebarContent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Code,
  Copy,
  Download,
  ExternalLink,
  FileImage,
  FileText,
  GalleryThumbnailsIcon as Gallery,
  HelpCircle,
  Menu,
  Moon,
  RotateCcw,
  Star,
  Sun,
} from "lucide-react";
import { downloadPDF } from "../lib/utils/downloadPDF";
import { toast } from "sonner";
import { ReadmeExample, readmeExamples } from "@/lib/utils/readmeExamples";
import { useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

const Navbar = ({
  markdownContent,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
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
  setMarkdownContent,
  textareaRef,
}: any) => {
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { theme, setTheme } = useTheme();

  const resetContent = () => {
    setMarkdownContent("");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
    toast.success("Content reset successfully!");
  };

  const copyRawCode = async () => {
    try {
      const content =
        markdownContent || "# README\n\nStart writing your README here...";
      await navigator.clipboard.writeText(content);
      toast.success("Raw markdown copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const downloadMarkdown = () => {
    const content =
      markdownContent || "# README\n\nStart writing your README here...";
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("README.md downloaded successfully!");
  };

  const useExampleTemplate = (example: ReadmeExample) => {
    setMarkdownContent(example.content);
    setIsGalleryDialogOpen(false);
    toast.success(`Template "${example.title}" loaded successfully!`);
  };
  // Filter examples by category
  const filteredExamples =
    selectedCategory === "All"
      ? readmeExamples
      : readmeExamples.filter(
          (example) => example.category === selectedCategory
        );

  const categories = [
    "All",
    ...Array.from(new Set(readmeExamples.map((example) => example.category))),
  ];
  return (
    <div className="border-b border-gray-100 dark:border-gray-600/60 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-800/70 sticky top-0 z-50 ">
      <div className="container mx-auto px-3 sm:px-0 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
              <Code className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-blue-900 to-purple-700 dark:from-gray-100 dark:to-blue-300 bg-clip-text text-transparent">
                READMEs
              </h1>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile Sections Menu */}
          <Sheet
            open={isMobileSidebarOpen}
            onOpenChange={setIsMobileSidebarOpen}
          >
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="xl:hidden hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-80 p-4 bg-white dark:bg-gray-800"
            >
              <SheetHeader>
                <SheetTitle className="text-gray-900 dark:text-gray-100">
                  Sections
                </SheetTitle>
              </SheetHeader>
              <div className="mt-4">
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
              </div>
            </SheetContent>
          </Sheet>

          {/* Copy Raw Code Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={copyRawCode}
            className="hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer"
            title="Copy raw markdown"
          >
            <Copy className="w-4 h-4" />
          </Button>

          {/* Gallery Button */}
          <Dialog
            open={isGalleryDialogOpen}
            onOpenChange={setIsGalleryDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <Gallery className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle className="text-gray-900 dark:text-gray-100">
                  README Gallery
                </DialogTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Browse examples of well-crafted READMEs for inspiration
                </p>
              </DialogHeader>

              <div className="space-y-4">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category: any) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="text-xs cursor-pointer"
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* Examples Grid */}
                <ScrollArea className="h-[60vh]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4">
                    {filteredExamples.map((example: any) => {
                      const useExampleTemplateLocal = () => {
                        useExampleTemplate(example);
                      };
                      return (
                        <Card
                          key={example.id}
                          className="p-4 hover:shadow-lg transition-shadow"
                        >
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                  {example.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {example.description}
                                </p>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {example.category}
                              </Badge>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                <span>{example.stars.toLocaleString()}</span>
                              </div>
                              <span>by {example.author}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                onClick={useExampleTemplateLocal}
                                className="flex-1 cursor-pointer"
                              >
                                Use Template
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  window.open(example.githubUrl, "_blank")
                                }
                                className="cursor-pointer"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </ScrollArea>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isHelpDialogOpen} onOpenChange={setIsHelpDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle className="text-gray-900 dark:text-gray-100">
                  README Generator Documentation
                </DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="usage" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="usage" className="cursor-pointer">
                    How to Use
                  </TabsTrigger>
                  <TabsTrigger value="markdown" className="cursor-pointer">
                    Markdown Guide
                  </TabsTrigger>
                  <TabsTrigger value="tips" className="cursor-pointer">
                    Tips & Best Practices
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="usage" className="mt-4">
                  <ScrollArea className="h-[60vh] pr-4">
                    <div className="space-y-4 text-sm">
                      <div>
                        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          Getting Started
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                          <li>
                            Use the left sidebar to add pre-built sections to
                            your README
                          </li>
                          <li>
                            Click any section template to insert it at your
                            cursor position
                          </li>
                          <li>
                            Edit the content directly in the markdown editor
                          </li>
                          <li>See live preview on the right side</li>
                          <li>
                            Drag the resize handle between editor and preview to
                            adjust sizes
                          </li>
                          <li>Browse the gallery for README inspiration</li>
                          <li>Copy raw markdown with the copy button</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          Key Features
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                          <li>
                            <strong>Live Preview:</strong> See your README
                            rendered in real-time
                          </li>
                          <li>
                            <strong>Resizable Split View:</strong> Adjust editor
                            and preview sizes
                          </li>
                          <li>
                            <strong>VS Code Theme:</strong> Professional editor
                            with syntax highlighting
                          </li>
                          <li>
                            <strong>Section Templates:</strong> Pre-built
                            sections for common README parts
                          </li>
                          <li>
                            <strong>Custom Sections:</strong> Create and save
                            your own templates
                          </li>
                          <li>
                            <strong>Export Options:</strong> Download as
                            Markdown or PDF
                          </li>
                          <li>
                            <strong>GitHub Compatible:</strong> Full support for
                            GitHub Flavored Markdown
                          </li>
                          <li>
                            <strong>Gallery:</strong> Browse examples of great
                            READMEs
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          Controls
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                          <li>
                            <strong>Resize Handle:</strong> Drag the vertical
                            handle to resize editor/preview
                          </li>
                          <li>
                            <strong>Expand Preview:</strong> Toggle full-width
                            preview mode
                          </li>
                          <li>
                            <strong>Collapse Sidebar:</strong> Hide the sections
                            panel for more editing space
                          </li>
                          <li>
                            <strong>Reset:</strong> Clear all content and start
                            fresh
                          </li>
                          <li>
                            <strong>Copy Raw:</strong> Copy markdown to
                            clipboard
                          </li>
                          <li>
                            <strong>Gallery:</strong> Browse README examples for
                            inspiration
                          </li>
                          <li>
                            <strong>Theme Toggle:</strong> Switch between light
                            and dark modes
                          </li>
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="markdown" className="mt-4">
                  <ScrollArea className="h-[60vh] pr-4">
                    <div className="space-y-4 text-sm">
                      <div>
                        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          Headers
                        </h3>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs text-gray-800 dark:text-gray-200">
                          {`# H1 Header
## H2 Header  
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header`}
                        </pre>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          Text Formatting
                        </h3>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs text-gray-800 dark:text-gray-200">
                          {`**Bold text**
*Italic text*
~~Strikethrough~~
\`Inline code\`
> Blockquote`}
                        </pre>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          Lists
                        </h3>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs text-gray-800 dark:text-gray-200">
                          {`- Unordered list item
- Another item
  - Nested item

1. Ordered list item
2. Another item

- [x] Completed task
- [ ] Incomplete task`}
                        </pre>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          Code Blocks
                        </h3>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs text-gray-800 dark:text-gray-200">
                          {`\`\`\`javascript
function hello() {
  console.log("Hello World!");
}
\`\`\``}
                        </pre>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          Tables
                        </h3>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs text-gray-800 dark:text-gray-200">
                          {`| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | More     |
| Row 2    | Data     | More     |`}
                        </pre>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          Links & Images
                        </h3>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs text-gray-800 dark:text-gray-200">
                          {`[Link text](https://example.com)
![Alt text](image-url.jpg)
![Badge](https://img.shields.io/badge/status-active-green)`}
                        </pre>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="tips" className="mt-4">
                  <ScrollArea className="h-[60vh] pr-4">
                    <div className="space-y-4 text-sm">
                      <div>
                        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          README Best Practices
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                          <li>Start with a clear, descriptive title</li>
                          <li>
                            Include a brief description of what your project
                            does
                          </li>
                          <li>Add installation instructions</li>
                          <li>Provide usage examples</li>
                          <li>Include screenshots or demos when possible</li>
                          <li>Add contribution guidelines</li>
                          <li>Include license information</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          Structure Tips
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                          <li>Use consistent heading hierarchy</li>
                          <li>Keep paragraphs short and scannable</li>
                          <li>Use bullet points for lists</li>
                          <li>Add badges for build status, version, etc.</li>
                          <li>Include a table of contents for long READMEs</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          Common Sections
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                          <li>
                            <strong>Title & Description:</strong> What your
                            project does
                          </li>
                          <li>
                            <strong>Installation:</strong> How to install/setup
                          </li>
                          <li>
                            <strong>Usage:</strong> How to use your project
                          </li>
                          <li>
                            <strong>API Reference:</strong> For libraries/APIs
                          </li>
                          <li>
                            <strong>Contributing:</strong> How others can
                            contribute
                          </li>
                          <li>
                            <strong>License:</strong> Legal information
                          </li>
                          <li>
                            <strong>Acknowledgments:</strong> Credits and thanks
                          </li>
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={resetContent}
            className="gap-2 border-blue-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 bg-transparent hidden sm:flex cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden md:inline">Reset</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg text-xs sm:text-sm cursor-pointer">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
              <DropdownMenuItem
                onClick={downloadMarkdown}
                className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <FileText className="w-4 h-4 mr-2" />
                Download Markdown
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => downloadPDF(markdownContent, "editor")}
                className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <FileImage className="w-4 h-4 mr-2" />
                Download Editor PDF
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => downloadPDF(markdownContent, "preview")}
                className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <FileImage className="w-4 h-4 mr-2" />
                Download Preview PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
