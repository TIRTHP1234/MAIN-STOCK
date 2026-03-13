import { TrendingUp, Info } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-heading text-lg font-bold leading-tight text-foreground">
              StockPredict.AI
            </h1>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Market Analysis Platform
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Info className="h-4 w-4" />
          About Project
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
