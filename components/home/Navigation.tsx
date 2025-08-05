import { Button } from "@/components/ui/button";
import { Code, FileText, Github } from "lucide-react";
import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-100 dark:bg-gray-800/70 dark:border-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
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
          <div className="flex items-center">
            <Link href="/editor">
              <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg text-xs sm:text-sm cursor-pointer">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
