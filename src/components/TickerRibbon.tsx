const tickers = [
  { symbol: "AAPL", sector: "Tech" },
  { symbol: "TSLA", sector: "Auto" },
  { symbol: "NIFTY", sector: "Index" },
  { symbol: "BANKNIFTY", sector: "Index" },
  { symbol: "RELIANCE", sector: "Energy" },
  { symbol: "TCS", sector: "IT" },
  { symbol: "BTC", sector: "Crypto" },
  { symbol: "ETH", sector: "Crypto" },
  { symbol: "GOOGL", sector: "Tech" },
  { symbol: "AMZN", sector: "Retail" },
  { symbol: "MSFT", sector: "Tech" },
  { symbol: "INFY", sector: "IT" },
  { symbol: "HDFCBANK", sector: "Finance" },
  { symbol: "NVDA", sector: "Tech" },
  { symbol: "META", sector: "Tech" },
  { symbol: "GOLD", sector: "Commodity" },
  { symbol: "CRUDE", sector: "Commodity" },
];

const TickerRibbon = () => {
  return (
    <section className="border-b border-border bg-secondary/50 py-6">
      <div className="container mx-auto px-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-positive animate-pulse" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Supported Instruments
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="flex flex-wrap gap-2">
          {tickers.map((t) => (
            <div
              key={t.symbol}
              className="group relative cursor-default border border-border bg-card px-3 py-1.5 transition-all hover:border-foreground/40 hover:-translate-y-0.5 hover:shadow-sm"
            >
              <span className="font-mono text-xs font-semibold text-foreground">
                {t.symbol}
              </span>
              <span className="ml-2 font-mono text-[9px] uppercase text-muted-foreground">
                {t.sector}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TickerRibbon;
