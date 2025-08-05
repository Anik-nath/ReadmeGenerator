import Footer from "@/components/home/Footer";
import Navigation from "@/components/home/Navigation";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "READMEs - Create Beautiful Readme Generators",
  description:
    "The easiest way to create professional README files for your github projects",
  keywords: ["README generator"],
  authors: [{ name: "Anik Deb Nath", url: "https://aniknath.netlify.app/" }],
  openGraph: {
    title: "README Generator - Create Beautiful READMEs",
    description:
      "The easiest way to create professional README files for your projects",
    url: "https://xponent.dev",
    siteName: "README.ai",
    images: [
      {
        url: "https://aniknath.netlify.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "README.ai - Create Beautiful READMEs",
      },
    ],
  },
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navigation />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
