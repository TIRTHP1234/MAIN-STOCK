import Navbar from "@/components/Navbar";
import TickerMarquee from "@/components/TickerMarquee";
import HeroSearch from "@/components/HeroSearch";
import AlgorithmCards from "@/components/AlgorithmCards";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <TickerMarquee />
      <HeroSearch />
      <AlgorithmCards />
    </div>
  );
};

export default Index;
