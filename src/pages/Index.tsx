import Navbar from "@/components/Navbar";
import TickerRibbon from "@/components/TickerRibbon";
import CommandCenter from "@/components/CommandCenter";
import AlgorithmSection from "@/components/AlgorithmSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background grain-overlay flex flex-col">
      <Navbar />
      <TickerRibbon />
      <main className="flex-1">
        <CommandCenter />
        <AlgorithmSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
