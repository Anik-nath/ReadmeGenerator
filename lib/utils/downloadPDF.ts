import { toast } from "sonner";

export const downloadPDF = async (
  markdownContent: string,
  type: "editor" | "preview"
) => {
  try {
    const html2pdf = (await import("html2pdf.js")).default;
    const content =
      markdownContent || "# README\n\nStart writing your README here...";

    if (type === "editor") {
      const element = document.createElement("div");
      element.innerHTML = `
          <div style="font-family: 'Courier New', monospace; white-space: pre-wrap; padding: 20px; font-size: 12px; line-height: 1.4;">
            ${content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
          </div>
        `;

      const opt = {
        margin: 1,
        filename: "README-source.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf().set(opt).from(element).save();
      toast.success("Editor PDF downloaded successfully!");
    } else {
      const previewElement = document.querySelector(".preview-content");
      if (previewElement) {
        const opt = {
          margin: 1,
          filename: "README-preview.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };

        html2pdf().set(opt).from(previewElement).save();
        toast.success("Preview PDF downloaded successfully!");
      }
    }
  } catch (error) {
    console.error("PDF generation failed:", error);
    const content =
      markdownContent || "# README\n\nStart writing your README here...";
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = type === "editor" ? "README-source.txt" : "README-preview.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("File downloaded as text format!");
  }
};
