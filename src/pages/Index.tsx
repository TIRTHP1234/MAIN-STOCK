import Navbar from "@/components/Navbar";
import TickerRibbon from "@/components/TickerRibbon";
import CommandCenter from "@/components/CommandCenter";
import AlgorithmSection from "@/components/AlgorithmSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background grain-overlay">
      <Navbar />
      <TickerRibbon />
      <CommandCenter />
      <AlgorithmSection />
      <Footer />
    </div>
  );
};

export default Index;
