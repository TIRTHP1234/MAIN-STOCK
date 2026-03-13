import { useState } from "react";
import { Search, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const HeroSearch = () => {
  const [query, setQuery] = useState("");

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="container mx-auto px-6 py-16"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Stock Market Analysis
        </h2>
        <div className="mx-auto mt-10 rounded-lg border border-border bg-card p-8 shadow-sm">
          <h3 className="font-heading text-2xl font-bold text-foreground">
            Market Command Center
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter a stock ticker to initialize analysis.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Symbol (e.g., TCS.NS)..."
                className="h-12 w-full rounded-md border border-input bg-background pl-11 pr-16 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <kbd className="absolute right-4 top-1/2 -translate-y-1/2 rounded border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                ⌘K
              </kbd>
            </div>
            <button className="inline-flex h-12 items-center gap-2 rounded-md bg-accent px-6 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90">
              <TrendingUp className="h-4 w-4" />
              Analyze
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSearch;
