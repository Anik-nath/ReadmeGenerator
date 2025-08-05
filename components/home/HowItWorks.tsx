import { Card, CardContent } from "@/components/ui/card";
import {
  Code2,
  Download,
  Sparkles
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Code2,
      title: "Choose Template",
      description:
        "Select from our curated collection of professional README templates",
    },
    {
      icon: Sparkles,
      title: "Customize",
      description:
        "Add your project details with our intuitive form-based editor",
    },
    {
      icon: Download,
      title: "Export",
      description: "Download your polished README.md file instantly",
    },
  ];
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How it works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to create a professional README that makes your
            project stand out
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-border/50 animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Step number */}
                <div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-chart-1 to-chart-2 rounded-full flex items-center justify-center text-white font-bold text-sm animate-bounce-in"
                  style={{ animationDelay: `${index * 300 + 500}ms` }}
                >
                  {index + 1}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
