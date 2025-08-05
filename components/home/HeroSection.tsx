import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, Sparkles } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 ">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-primary/20 mb-8 animate-pulse">
            <Sparkles className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">
              New: Built for Devs
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Create
            <span className="relative mx-4">
              <span className="bg-gradient-to-r from-blue-800 via-purple-500 to-purple-800 bg-clip-text text-transparent animate-gradient">
                Beautiful READMEs
              </span>
            </span>
            <br className="hidden sm:block" />
            Instantly
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            The fastest way to create professional README files for your
            projects. No more blank pages, just beautiful documentation that
            helps your code shine.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/editor">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-6 text-lg cursor-pointer"
              >
                <span className="relative z-10 flex items-center">
                  Start Creating
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg group  cursor-pointer"
            >
              <Eye className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              View Examples
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
