import { useState } from "react";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CommandCenter = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (!query.trim()) return;
    navigate(`/analyze/${query.toUpperCase()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnalyze();
    }
  };

  return (
    <section className="container mx-auto px-6 py-16">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left — Editorial copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
            Analysis Terminal
          </span>
          <h2 className="mt-3 font-heading text-5xl font-black leading-[1.1] text-foreground lg:text-6xl">
            Stock Market
            <br />
            <span className="italic">Analysis</span>
          </h2>
          <div className="mt-6 h-px w-20 bg-foreground" />
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Harness the power of five predictive algorithms to decode market patterns, 
            forecast price movements, and uncover hidden correlations in real-time trading data.
          </p>
          <div className="mt-8 flex gap-4 font-mono text-xs text-muted-foreground">
            <div className="border-l-2 border-accent pl-3">
              <span className="text-2xl font-bold text-foreground">5</span>
              <br />ML Models
            </div>
            <div className="border-l-2 border-foreground/20 pl-3">
              <span className="text-2xl font-bold text-foreground">17+</span>
              <br />Instruments
            </div>
            <div className="border-l-2 border-foreground/20 pl-3">
              <span className="text-2xl font-bold text-foreground">∞</span>
              <br />Data Points
            </div>
          </div>
        </motion.div>

        {/* Right — Command Center Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="border-2 border-foreground/10 bg-card p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border-2 border-accent bg-accent/20" />
            <span className="h-3 w-3 rounded-full border-2 border-gold bg-gold/20" />
            <span className="h-3 w-3 rounded-full border-2 border-negative bg-negative/20" />
            <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Command Center
            </span>
          </div>
          <h3 className="font-heading text-xl font-bold text-foreground">
            Initialize Analysis
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter a stock ticker symbol to begin predictive modeling.
          </p>
          <div className="mt-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search Symbol (e.g., AAPL)..."
                className="h-13 w-full border-2 border-border bg-background pl-11 pr-16 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground/40 focus:outline-none transition-colors"
              />
              <kbd className="absolute right-4 top-1/2 -translate-y-1/2 border border-border bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                ↵
              </kbd>
            </div>
            <button 
              onClick={handleAnalyze}
              disabled={!query.trim()}
              className="flex h-12 w-full items-center justify-center gap-2 bg-foreground font-mono text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed hover:gap-3"
            >
              <>
                Run Analysis
                <ArrowRight className="h-4 w-4" />
              </>
            </button>
          </div>
          <div className="mt-6 border-t border-border pt-4">
            <p className="font-mono text-[10px] text-muted-foreground">
              Powered by Linear Regression • ARIMA • KNN • SVM • Correlation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommandCenter;
