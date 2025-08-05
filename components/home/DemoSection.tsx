"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import demoimage from "@/public/demo.webp";

const DemoSection = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See it in action
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Watch how easy it is to create professional documentation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="animated-border bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-1">
            <div className="bg-white rounded-xl">
              <div className="aspect-video rounded-lg relative overflow-hidden">
                <Image
                  src={demoimage}
                  alt="Demo video thumbnail"
                  fill
                  className="object-contain"
                  priority
                  quality={100}
                  placeholder="blur"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;
