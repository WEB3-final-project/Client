import HeroSection from "@/components/public/home/HeroSection";
import FeaturesSection from "@/components/public/home/FeaturesSection";
import HowItWorksSection from "@/components/public/home/HowItWorksSection";
import "@/styles/home.css";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
    </>
  );
}
