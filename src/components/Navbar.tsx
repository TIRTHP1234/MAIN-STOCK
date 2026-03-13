import { BarChart3, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const Navbar = () => {
  const { theme, toggle } = useTheme();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="border-b-2 border-foreground/80 bg-background">
      <div className="container mx-auto px-6">
        {/* Top line */}
        <div className="flex items-center justify-between border-b border-border py-2 text-xs text-muted-foreground">
          <span className="font-mono uppercase tracking-widest">Est. 2025 — Algorithmic Market Intelligence</span>
          <div className="flex items-center gap-4">
            <span className="font-mono hidden sm:block">{today}</span>
            {/* Dark / Light Toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="relative flex items-center justify-center w-14 h-7 rounded-full border-2 border-foreground/20 bg-muted transition-colors hover:border-foreground/40 focus:outline-none"
            >
              {/* Track fill */}
              <span
                className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                  theme === "dark" ? "bg-foreground/10" : "bg-foreground/5"
                }`}
              />
              {/* Sliding thumb */}
              <span
                className={`absolute left-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-foreground shadow transition-transform duration-300 ${
                  theme === "dark" ? "translate-x-7" : "translate-x-0"
                }`}
              >
                {theme === "dark" ? (
                  <Moon className="h-3 w-3 text-background" />
                ) : (
                  <Sun className="h-3 w-3 text-background" />
                )}
              </span>
            </button>
          </div>
        </div>
        {/* Main brand */}
        <div className="flex items-center justify-center py-5">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <BarChart3 className="h-7 w-7 text-foreground" strokeWidth={1.5} />
              <h1 className="font-heading text-4xl font-black tracking-tight text-foreground md:text-5xl">
                StockPredict
              </h1>
              <span className="mt-1 rounded-sm bg-foreground px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                AI
              </span>
            </div>
            <div className="mt-1 flex items-center justify-center gap-4">
              <span className="h-px flex-1 bg-foreground/30" />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Predictive Analytics & Market Forecasting
              </p>
              <span className="h-px flex-1 bg-foreground/30" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

