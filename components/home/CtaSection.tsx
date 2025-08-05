import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-primary/5 via-chart-1/5 to-chart-2/5">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 animate-fade-in">
          Ready to create your first README?
        </h2>
        <p
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          Join thousands of developers who trust us to make their projects
          shine. Start creating professional documentation today.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          <Button size="lg" className="px-8 py-6 text-lg group">
            <span className="flex items-center">
              Get Started for Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>

          <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
            <Clock className="w-5 h-5 mr-2" />2 min setup
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
