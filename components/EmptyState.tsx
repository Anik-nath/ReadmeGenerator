import { Code } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-48 sm:h-64 text-gray-500 dark:text-gray-400">
      <Code className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 opacity-50" />
      <h3 className="text-base sm:text-lg font-semibold mb-2">
        Start Writing Your README
      </h3>
      <p className="text-sm text-center max-w-md px-4">
        Click on sections from the sidebar to insert templates, or start typing
        directly in the editor.
      </p>
    </div>
  );
};

export default EmptyState;
