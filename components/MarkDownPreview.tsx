//@ts-nocheck
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";

const MarkDownPreview = ({ markdownContent }: { markdownContent: any }) => {
  return (
    <>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkEmoji]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 pb-2 border-b border-gray-200 dark:border-gray-600">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 sm:mt-8 mb-3 sm:mb-4 pb-2 border-b border-gray-200 dark:border-gray-600">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4 sm:mt-6 mb-2 sm:mb-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mt-3 sm:mt-4 mb-2">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 mt-3 sm:mt-4 mb-2">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 mt-3 sm:mt-4 mb-2">
              {children}
            </h6>
          ),
          p: ({ children }) => (
            <p className="text-gray-700 dark:text-gray-200 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base break-words overflow-wrap-anywhere">
              {children}
            </p>
          ),
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";

            return !inline ? (
              <div className="relative my-3 sm:my-4 max-w-full">
                {language && (
                  <div className="absolute top-2 right-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded border border-gray-200 dark:border-gray-600 z-10">
                    {language}
                  </div>
                )}
                <pre className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-600 text-sm max-w-full">
                  <code
                    className="font-mono text-gray-800 dark:text-gray-100 break-words whitespace-pre-wrap"
                    {...props}
                  >
                    {children}
                  </code>
                </pre>
              </div>
            ) : (
              <code
                className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-600 break-words"
                {...props}
              >
                {children}
              </code>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-3 sm:my-4">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return (
              <thead className="bg-gray-100 dark:bg-gray-700">{children}</thead>
            );
          },
          th({ children }) {
            return (
              <th className="border border-gray-300 dark:border-gray-600 px-3 sm:px-4 py-2 font-semibold text-left text-gray-900 dark:text-gray-100 text-sm">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="border border-gray-300 dark:border-gray-600 px-3 sm:px-4 py-2 text-gray-700 dark:text-gray-200 text-sm">
                {children}
              </td>
            );
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-3 sm:pl-4 italic my-3 sm:my-4 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 py-2 rounded-r">
                {children}
              </blockquote>
            );
          },
          ul({ children }) {
            return (
              <ul className="list-disc list-inside mb-3 sm:mb-4 text-gray-700 dark:text-gray-200 space-y-1 text-sm sm:text-base">
                {children}
              </ul>
            );
          },
          ol({ children }) {
            return (
              <ol className="list-decimal list-inside mb-3 sm:mb-4 text-gray-700 dark:text-gray-200 space-y-1 text-sm sm:text-base">
                {children}
              </ol>
            );
          },
          li({ children }) {
            return (
              <li className="text-gray-700 dark:text-gray-200">{children}</li>
            );
          },
          img({ src, alt }) {
            return (
              <img
                src={src || "/placeholder.svg"}
                alt={alt}
                className="max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-600 my-3 sm:my-4 shadow-sm"
                loading="lazy"
              />
            );
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          },
          strong({ children }) {
            return (
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                {children}
              </strong>
            );
          },
          em({ children }) {
            return (
              <em className="italic text-gray-700 dark:text-gray-200">
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
          hr: () => (
            <hr className="my-6 sm:my-8 border-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
          ),
          input({ type, checked, ...props }) {
            if (type === "checkbox") {
              return (
                <input
                  type="checkbox"
                  checked={checked}
                  readOnly
                  className="mr-2 accent-blue-600"
                  {...props}
                />
              );
            }
            return <input type={type} {...props} />;
          },
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </>
  );
};

export default MarkDownPreview;
