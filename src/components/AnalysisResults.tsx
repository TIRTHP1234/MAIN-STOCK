import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface MetaInfo {
  symbol: string;
  shortName: string;
  currentPrice: number;
  previousClose: number;
  currency: string;
}

interface AnalysisResultsProps {
  data: {
    meta: MetaInfo;
    analysis: {
      dates: string[];
      historical: (number | null)[];
      predictions: {
        linear_regression: number[];
        arima: number[];
        knn: number[];
        svm: number[];
      };
      insights: {
        volume_price_correlation: number;
        rolling_correlation: number[];
        trend: string;
      };
    };
  } | null;
  loading: boolean;
  error: string | null;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-32 space-y-12" style={{ perspective: "1000px" }}>
        {/* 3D Animated Candlestick Chart Loading */}
        <div className="relative flex items-end gap-3 h-32" style={{ transformStyle: "preserve-3d", transform: "rotateX(15deg) rotateY(-25deg)" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="relative w-8 bg-gradient-to-t from-accent to-accent/60 shadow-[0_0_15px_rgba(var(--accent),0.4)] rounded-sm"
              style={{
                height: "20%",
                animation: `pulse-height-3d 2s ease-in-out ${i * 0.2}s infinite alternate`,
                boxShadow: "-5px 5px 15px rgba(0,0,0,0.4), inset -2px 0 5px rgba(255,255,255,0.3)"
              }}
            >
              {/* Candlestick Wicks */}
              <div className="absolute -top-4 left-1/2 w-[2px] h-4 -translate-x-1/2 bg-accent/80" />
              <div className="absolute -bottom-4 left-1/2 w-[2px] h-4 -translate-x-1/2 bg-accent/80" />
              
              {/* 3D Side Faces (Left & Top) */}
              <div className="absolute top-0 -left-[6px] w-[6px] h-full bg-accent/40 origin-right skew-y-[45deg]" />
              <div className="absolute -top-[6px] left-0 w-full h-[6px] bg-accent/70 origin-bottom skew-x-[45deg]" />
            </div>
          ))}
        </div>
        
        <style>{`
          @keyframes pulse-height-3d {
            0% { height: 15%; transform: translateZ(0); filter: hue-rotate(0deg); }
            50% { height: 100%; transform: translateZ(20px); filter: hue-rotate(15deg); }
            100% { height: 40%; transform: translateZ(5px); filter: hue-rotate(-10deg); }
          }
        `}</style>
        
        <div className="flex flex-col items-center">
          <span className="font-heading text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-accent via-gold to-accent animate-pulse uppercase">
            Synthesizing Data
          </span>
          <span className="mt-2 text-sm text-muted-foreground font-mono tracking-wide">
            Deploying Machine Learning Models...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-negative/10 border-l-4 border-negative p-6 my-8 rounded-md">
        <p className="text-negative font-mono font-bold text-lg">Error processing sequence</p>
        <p className="text-foreground/80 mt-2">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  // Transform data for Recharts
  const chartData = data.analysis.dates.map((date, index) => ({
    date: date.substring(0, 10), // Shorten date
    Historical: data.analysis.historical[index],
    'Linear Regression': data.analysis.predictions.linear_regression.values[index],
    ARIMA: data.analysis.predictions.arima.values[index],
    KNN: data.analysis.predictions.knn.values[index],
    SVM: data.analysis.predictions.svm.values[index],
  }));

  const { meta, analysis } = data;
  const priceChange = meta.currentPrice - meta.previousClose;
  const isPositive = priceChange >= 0;

  // Calculate Average Prediction for the 5th day
  const p_lr = analysis.predictions.linear_regression.values;
  const p_arima = analysis.predictions.arima.values;
  const p_knn = analysis.predictions.knn.values;
  const p_svm = analysis.predictions.svm.values;
  
  const currentLen = data.analysis.historical.filter(h => h !== null).length;
  const forecastLen = p_lr.length - currentLen;
  
  // The `predictions` arrays contain both historical and future values.
  // The future values start at index `currentLen`.
  // 5 days ahead = currentLen + 5 - 1
  // 30 days ahead = currentLen + 30 - 1 (which should equal p_lr.length - 1)
  const idx5Day = currentLen + Math.min(4, forecastLen - 1); // 0-indexed offset of +4 for Day 5
  const idx30Day = p_lr.length - 1;

  // Short Term (5 Day)
  const lastPre5 = [
    p_lr[idx5Day] ?? p_lr[p_lr.length - 1],
    p_arima[idx5Day] ?? p_arima[p_arima.length - 1],
    p_knn[idx5Day] ?? p_knn[p_knn.length - 1],
    p_svm[idx5Day] ?? p_svm[p_svm.length - 1],
  ];
  const avg5 = lastPre5.reduce((a, b) => a + b, 0) / 4;
  const diff5 = avg5 - meta.currentPrice;
  const pct5 = (diff5 / meta.currentPrice) * 100;

  // Long Term (30 Day)
  const lastPre30 = [
    p_lr[idx30Day] ?? p_lr[p_lr.length - 1],
    p_arima[idx30Day] ?? p_arima[p_arima.length - 1],
    p_knn[idx30Day] ?? p_knn[p_knn.length - 1],
    p_svm[idx30Day] ?? p_svm[p_svm.length - 1],
  ];
  const avg30 = lastPre30.reduce((a, b) => a + b, 0) / 4;
  const diff30 = avg30 - meta.currentPrice;
  const pct30 = (diff30 / meta.currentPrice) * 100;
  
  const getSuggestion = (pct: number) => {
    if (pct > 2) return { label: "STRONG BUY", color: "bg-accent text-accent-foreground", border: "border-accent/50", text: "text-accent", icon: "🚀" };
    if (pct < -2) return { label: "STRONG SELL", color: "bg-negative text-negative-foreground", border: "border-negative/50", text: "text-negative", icon: "⚠️" };
    if (pct > 0.5) return { label: "BUY", color: "bg-accent/80 text-background", border: "border-accent/30", text: "text-accent/80", icon: "📈" };
    if (pct < -0.5) return { label: "SELL", color: "bg-negative/80 text-background", border: "border-negative/30", text: "text-negative/80", icon: "📉" };
    return { label: "HOLD / NEUTRAL", color: "bg-gold text-gold-foreground", border: "border-gold/50", text: "text-gold", icon: "⚖️" };
  };

  const sug5 = getSuggestion(pct5);
  const sug30 = getSuggestion(pct30);

  const algorithmList = [
    { id: 'linear_regression', name: 'Linear Regression', icon: '📈' },
    { id: 'arima', name: 'ARIMA', icon: '⏱️' },
    { id: 'knn', name: 'KNN', icon: '📊' },
    { id: 'svm', name: 'SVM', icon: '🧠' }
  ];

  return (
    <div className="container mx-auto px-6 space-y-8 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-4xl font-heading font-black">{meta.symbol}</h2>
            <Badge variant="outline" className="font-mono">{meta.currency}</Badge>
          </div>
          <p className="text-muted-foreground text-lg">{meta.shortName}</p>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-muted-foreground mb-1 font-mono uppercase tracking-wider">Current Price</p>
          <div className="flex items-center gap-3 justify-end">
            <span className="text-4xl font-bold font-mono">
              ₹{meta.currentPrice.toFixed(2)}
            </span>
            <span className={`text-lg font-bold flex items-center ${isPositive ? 'text-accent' : 'text-negative'}`}>
              {isPositive ? '↑' : '↓'} ₹{Math.abs(priceChange).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <Card className="border-2 border-foreground/10 bg-card shadow-lg">
        <CardHeader className="border-b border-border">
          <CardTitle className="font-heading tracking-wide flex justify-between items-center">
            <span>Aggregated Predictive Models</span>
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">30-Day Forecast Horizon</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }}
                  minTickGap={30}
                />
                <YAxis 
                  domain={['auto', 'auto']} 
                  tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  itemStyle={{ fontSize: 13, fontFamily: 'monospace' }}
                  labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: '8px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '13px' }} />
                
                <Line type="monotone" dataKey="Historical" stroke="hsl(var(--foreground))" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="Linear Regression" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="ARIMA" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="KNN" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="SVM" stroke="#8b5cf6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Individual Algorithm Metrics */}
      <h3 className="font-heading text-2xl font-bold mt-12 mb-4">Algorithm Performance</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {algorithmList.map(algo => {
          const metrics = (analysis.predictions as any)[algo.id].metrics;
          return (
            <Card key={algo.id} className="border border-border/50 bg-background/50 hover:border-accent/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono flex items-center gap-2 text-foreground">
                  <span className="text-xl">{algo.icon}</span> {algo.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">MSE</span>
                    <span className="text-sm font-mono">{metrics.mse.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">RMSE</span>
                    <span className="text-sm font-mono">{metrics.rmse.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">R² SCORE</span>
                    <span className="text-sm font-mono">{(metrics.r2 * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-border/30 pt-3 mt-2">
                    <span className="text-xs text-foreground font-bold uppercase tracking-widest">Accuracy</span>
                    <span className="text-sm font-mono font-bold text-accent">{metrics.accuracy.toFixed(2)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Insights Grid */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card className="border border-border/50 bg-background/50">
          <CardHeader>
            <CardTitle className="text-lg font-mono flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent"></span>
              Correlation Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-border/30 pb-3">
                <span className="text-muted-foreground">Volume-Price Correlation</span>
                <span className="font-mono font-bold text-lg">{(analysis.insights.volume_price_correlation * 100).toFixed(2)}%</span>
              </div>
              <div className="flex justify-between items-center pb-3">
                <span className="text-muted-foreground">Detected Trend</span>
                <Badge variant={analysis.insights.trend.includes('Strong') ? 'default' : 'secondary'} className="bg-accent text-accent-foreground">
                  {analysis.insights.trend}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`border border-border/50 bg-background/50 relative overflow-hidden`}>
          <div className={`absolute -top-10 -right-10 w-40 h-40 opacity-10 blur-3xl rounded-full ${sug30.color}`} />
          <CardHeader>
            <CardTitle className="text-lg font-mono gap-2 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gold"></span>
                  AI Forecast Summary
                </div>
                <Badge className={`${sug30.color} font-bold font-heading px-3 py-1 text-sm shadow-md`}>
                  {sug30.icon} {sug30.label}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 relative z-10">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/40 rounded-md p-3 border border-border/40">
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">5-Day Target</p>
                <p className="text-xl font-bold font-mono">₹{avg5.toFixed(2)}</p>
                <p className={`text-xs font-mono font-bold mt-0.5 ${pct5 >= 0 ? 'text-accent' : 'text-negative'}`}>
                  {(pct5 > 0 ? '+' : '') + pct5.toFixed(2)}%
                </p>
              </div>
              <div className="bg-muted/40 rounded-md p-3 border border-border/40">
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">30-Day Target</p>
                <p className="text-xl font-bold font-mono">₹{avg30.toFixed(2)}</p>
                <p className={`text-xs font-mono font-bold mt-0.5 ${pct30 >= 0 ? 'text-accent' : 'text-negative'}`}>
                  {(pct30 > 0 ? '+' : '') + pct30.toFixed(2)}%
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-mono leading-relaxed pt-1 border-t border-border/30">
              <span className={`font-bold ${sug30.text}`}>Consensus across Linear Regression, ARIMA, KNN & SVM: </span>
              Models indicate a <strong>{pct30 >= 0 ? 'bullish' : 'bearish'}</strong> trajectory. 
              Near-term target ₹{avg5.toFixed(2)} ({(pct5 > 0 ? '+' : '') + pct5.toFixed(2)}%), 
              and a month-out target of ₹{avg30.toFixed(2)} ({(pct30 > 0 ? '+' : '') + pct30.toFixed(2)}%) versus today's ₹{meta.currentPrice.toFixed(2)}.
            </p>
          </CardContent>
        </Card>
      </div>
      
    </div>
  );
};

export default AnalysisResults;
