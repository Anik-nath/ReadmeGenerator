//@ts-nocheck
"use client";
import { CheckCircle, Code, Download, Eye, Palette, Zap } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};
const Featured = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Create stunning documentation in minutes, not hours. Our intuitive interface gets you started instantly.",
    },
    {
      icon: Palette,
      title: "Beautiful Templates",
      description:
        "Choose from dozens of professionally designed templates that make your project stand out.",
    },
    {
      icon: Code,
      title: "Markdown Support",
      description:
        "Full markdown support with live preview. Write naturally and see results in real-time.",
    },
    {
      icon: Eye,
      title: "Live Preview",
      description: "See your README rendered in real-time as you make changes",
    },
    {
      icon: Download,
      title: "Multiple Formats",
      description: "Export as Markdown, HTML, or PDF. Perfect for any platform",
    },
    {
      icon: CheckCircle,
      title: "Best Practices",
      description:
        "Templates follow industry standards and community guidelines",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to create
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              amazing docs
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Powerful features that make documentation creation effortless and
            enjoyable
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="bg-card border border-border/50 rounded-lg p-6 shadow-lg transition-all duration-300 hover:border-primary/30 h-full group-hover:bg-card/80">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Featured;
