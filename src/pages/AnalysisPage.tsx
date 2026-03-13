import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalysisResults from "@/components/AnalysisResults";

const AnalysisPage = () => {
  const { ticker } = useParams();
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticker) {
      navigate("/");
      return;
    }

    const fetchAnalysis = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [response] = await Promise.all([
         axios.get(`${import.meta.env.VITE_API_URL}/api/analyze?ticker=${ticker.toUpperCase()}`),
          new Promise(resolve => setTimeout(resolve, 4000)) // Guarantee 4 sec animation
        ]);
        setAnalysisData(response.data);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.detail || "Failed to fetch data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [ticker, navigate]);

  return (
    <div className="min-h-screen bg-background grain-overlay flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <AnalysisResults data={analysisData} loading={isLoading} error={error} />
      </main>
      <Footer />
    </div>
  );
};

export default AnalysisPage;
