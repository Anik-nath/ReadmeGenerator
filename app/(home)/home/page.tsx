import DemoSection from "@/components/home/DemoSection";
import Featured from "@/components/home/Featured";
import HeroSection from "@/components/home/HeroSection";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <HeroSection />
      <DemoSection />
      <Featured />
    </div>
  );
}
