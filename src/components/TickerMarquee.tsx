const tickers = [
  "AAPL", "TSLA", "NIFTY", "BANKNIFTY", "RELIANCE", "TCS",
  "BTC", "ETH", "GOOGL", "AMZN", "MSFT", "INFY",
  "HDFCBANK", "NVDA", "META", "GOLD", "CRUDE",
];

const TickerMarquee = () => {
  return (
    <div className="relative overflow-hidden border-b border-border bg-muted/50 py-3">
      <div className="ticker-scroll flex w-max gap-4">
        {[...tickers, ...tickers].map((ticker, i) => (
          <span
            key={`${ticker}-${i}`}
            className="inline-flex items-center rounded-md border border-border bg-card px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
          >
            {ticker}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TickerMarquee;
