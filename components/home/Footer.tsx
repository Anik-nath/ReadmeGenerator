import { Code, FileText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">READMEs</span>
        </div>
        <p className="text-slate-400 mb-4">
          The easiest way to create beautiful README files for your projects.
        </p>
        <p className="text-slate-500 text-sm">
          &copy; 2025 READMEs. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
