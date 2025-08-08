//@ts-nocheck
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const MarkDownPreview = ({ markdownContent }: { markdownContent: any }) => {
  return (
    <div className="markdown-content max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkEmoji]}
        components={{
          // Headers with proper hierarchy and styling
          h1: ({ children }) => (
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 mt-8 pb-3 border-b-2 border-blue-200 dark:border-blue-600 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-5 pb-2 border-b border-gray-300 dark:border-gray-600">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-4">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mt-5 mb-3">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mt-4 mb-2">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-xs sm:text-base font-medium text-gray-800 dark:text-gray-200 mt-4 mb-2">
              {children}
            </h6>
          ),

          // Improved paragraph styling
          p: ({ children }) => (
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-sm sm:text-base break-words">
              {children}
            </p>
          ),

          // Enhanced code blocks with syntax highlighting
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";

            return !inline ? (
              <div className="relative my-auto max-w-full">
                {language && (
                  <div className="absolute top-3 right-3 text-xs font-mono text-gray-400 bg-gray-800 px-2 py-1 rounded z-10">
                    {language}
                  </div>
                )}
                <SyntaxHighlighter
                  style={oneDark}
                  language={language || "text"}
                  PreTag="div"
                  className="rounded-lg border border-gray-200 dark:border-gray-600 text-sm"
                  showLineNumbers={language && language !== "text"}
                  wrapLines={true}
                  wrapLongLines={true}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code
                className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono text-pink-600 dark:text-pink-400 border border-gray-200 dark:border-gray-600"
                {...props}
              >
                {children}
              </code>
            );
          },

          // Clean table styling matching your reference image with special endpoint handling
          table({ children }) {
            return (
              <div className="overflow-x-auto my-6 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
                <table className="min-w-full border-collapse">{children}</table>
              </div>
            );
          },
          thead({ children }) {
            return (
              <thead className="bg-gray-50 dark:bg-gray-700">{children}</thead>
            );
          },
          tbody({ children }) {
            return (
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                {children}
              </tbody>
            );
          },
          tr({ children }) {
            return (
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                {children}
              </tr>
            );
          },
          th({ children }) {
            return (
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-600 border-r border-gray-200 dark:border-gray-600 last:border-r-0 bg-gray-50 dark:bg-gray-700">
                {children}
              </th>
            );
          },
          td({ children }) {
            // Check if this cell contains an API endpoint (starts with /)
            const content = String(children);
            const isEndpoint =
              content.startsWith("/") || content.startsWith("`/");

            if (isEndpoint) {
              return (
                <td className="px-0 py-0 border-b border-gray-200 dark:border-gray-600 border-r border-gray-200 dark:border-gray-600 last:border-r-0">
                  <div className="bg-gray-800 dark:bg-gray-700 text-white px-4 py-3 font-mono text-sm">
                    {children}
                  </div>
                </td>
              );
            }

            return (
              <td className="px-4 py-1 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600 border-r border-gray-200 dark:border-gray-600 last:border-r-0 whitespace-nowrap">
                {children}
              </td>
            );
          },

          // Improved blockquote
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2 my-6 bg-blue-50 dark:bg-blue-900/20 rounded-r-md">
                <div className="text-gray-700 dark:text-gray-300 italic">
                  {children}
                </div>
              </blockquote>
            );
          },

          // Enhanced lists
          ul({ children, ...props }) {
            const isNested = props.depth > 0;
            return (
              <ul
                className={`mb-4 space-y-2 text-gray-700 dark:text-gray-300 ${
                  isNested ? "ml-4" : ""
                } list-disc list-outside ml-6`}
              >
                {children}
              </ul>
            );
          },
          ol({ children, ...props }) {
            const isNested = props.depth > 0;
            return (
              <ol
                className={`mb-4 space-y-2 text-gray-700 dark:text-gray-300 ${
                  isNested ? "ml-4" : ""
                } list-decimal list-outside ml-6`}
              >
                {children}
              </ol>
            );
          },
          li({ children }) {
            return (
              <li className="text-gray-700 dark:text-gray-300 leading-relaxed pl-2">
                {children}
              </li>
            );
          },

          // Enhanced images with special handling for badges and version images
          img({ src, alt, title }) {
            // Check if it's a version badge or shield
            const isVersionBadge =
              src?.includes("shields.io") ||
              src?.includes("badge") ||
              src?.includes("img.shields") ||
              alt?.toLowerCase().includes("badge") ||
              alt?.toLowerCase().includes("version") ||
              title?.toLowerCase().includes("badge") ||
              alt?.toLowerCase().includes("oas") ||
              alt?.toLowerCase().includes("oas_version");

            // Version showing images with your preferred styling
            if (isVersionBadge) {
              return (
                <div className="my-6 text-left">
                  <img
                    src={src || "/placeholder.svg"}
                    alt={alt || "Image"}
                    title={title}
                    className="max-w-full h-auto rounded border border-gray-200 dark:border-gray-600 shadow-md inline-block"
                    loading="lazy"
                  />
                </div>
              );
            }

            // Regular images with different styling
            return (
              <div className="my-8 text-center">
                <img
                  src={src || "/placeholder.svg"}
                  alt={alt || "Image"}
                  title={title}
                  className="max-w-full h-auto rounded-xl border-2 border-gray-300 dark:border-gray-500 shadow-lg inline-block transition-transform hover:scale-105"
                  loading="lazy"
                />
                {alt && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 italic font-medium">
                    {alt}
                  </p>
                )}
              </div>
            );
          },

          // Enhanced links with better badge and version handling
          a({ href, children }) {
            // Check if it's an internal link (starts with #)
            const isInternal = href?.startsWith("#");

            // Check if it's an image badge or contains an image
            const hasImage = React.Children.toArray(children).some(
              (child) =>
                child && typeof child === "object" && child.type === "img"
            );

            // Check if it's a version or badge link
            const isBadgeLink =
              href?.includes("shields.io") ||
              href?.includes("badge") ||
              hasImage;

            if (isBadgeLink || hasImage) {
              return (
                <a
                  href={href}
                  className="inline-block hover:opacity-80 transition-opacity duration-200 mx-1"
                  target={isInternal ? "_self" : "_blank"}
                  rel={isInternal ? "" : "noopener noreferrer"}
                >
                  {children}
                </a>
              );
            }

            return (
              <a
                href={href}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline font-medium transition-colors duration-150"
                target={isInternal ? "_self" : "_blank"}
                rel={isInternal ? "" : "noopener noreferrer"}
              >
                {children}
              </a>
            );
          },

          // Text formatting
          strong({ children }) {
            return (
              <strong className="font-bold text-gray-900 dark:text-gray-100">
                {children}
              </strong>
            );
          },
          em({ children }) {
            return (
              <em className="italic text-gray-700 dark:text-gray-300">
                {children}
              </em>
            );
          },
          del({ children }) {
            return (
              <del className="line-through text-gray-500 dark:text-gray-400">
                {children}
              </del>
            );
          },

          // Horizontal rule
          hr: () => (
            <hr className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-500 to-transparent" />
          ),

          // Checkbox support for task lists
          input({ type, checked, ...props }) {
            if (type === "checkbox") {
              return (
                <input
                  type="checkbox"
                  checked={checked}
                  readOnly
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  {...props}
                />
              );
            }
            return <input type={type} {...props} />;
          },

          // Special handling for directory structure
          pre({ children, ...props }) {
            // Check if this is a directory structure
            const content = String(children);
            const isDirectoryStructure =
              content.includes("├──") ||
              content.includes("└──") ||
              content.includes("│");

            if (isDirectoryStructure) {
              return (
                <div className="my-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <pre className="font-mono text-sm text-gray-800 dark:text-gray-200 overflow-x-auto whitespace-pre">
                    {children}
                  </pre>
                </div>
              );
            }

            return (
              <pre
                className="my-4 bg-gray-50 dark:bg-gray-800 p-2 overflow-x-auto border border-gray-200 dark:border-gray-600"
                {...props}
              >
                {children}
              </pre>
            );
          },
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkDownPreview;
