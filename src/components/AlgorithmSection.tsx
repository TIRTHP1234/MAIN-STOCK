import { motion } from "framer-motion";
import { TrendingUp, Clock, Grid3X3, Cpu, Activity } from "lucide-react";
import type { ReactNode } from "react";

type Algorithm = {
  icon: ReactNode;
  number: string;
  title: string;
  subtitle: string;
  description: string;
};

const algorithms: Algorithm[] = [
  {
    icon: <TrendingUp className="h-5 w-5" />,
    number: "01",
    title: "Linear Regression",
    subtitle: "Statistical Foundation",
    description:
      "A fundamental statistical method that models the relationship between a dependent variable (stock price) and one or more independent variables (time, past prices). It assumes a linear trend, making it useful for identifying the general direction of the market.",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    number: "02",
    title: "ARIMA",
    subtitle: "AutoRegressive Integrated Moving Average",
    description:
      "A popular time-series forecasting model that captures temporal structures in data. It uses past values (AutoRegressive), differencing to make data stationary (Integrated), and past forecast errors (Moving Average) to predict future prices.",
  },
  {
    icon: <Grid3X3 className="h-5 w-5" />,
    number: "03",
    title: "KNN",
    subtitle: "K-Nearest Neighbors",
    description:
      "A non-parametric algorithm that predicts the stock price based on the average of the 'k' most similar historical data points. It assumes that similar market conditions in the past will lead to similar future outcomes.",
  },
  {
    icon: <Cpu className="h-5 w-5" />,
    number: "04",
    title: "SVM",
    subtitle: "Support Vector Machine",
    description:
      "A powerful machine learning model that finds the optimal hyperplane to separate data in a high-dimensional space. In regression (SVR), it attempts to fit the best line within a threshold of error, effectively handling non-linear trends.",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    number: "05",
    title: "Correlation Analysis",
    subtitle: "Pattern Recognition",
    description:
      "This method calculates the statistical relationship between the current price movement and historical lagging periods. It helps identify cyclical patterns and how strongly past price changes influence current trends.",
  },
];

const AlgorithmSection = () => {
  return (
    <section className="border-t-2 border-foreground/10 bg-background py-16">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="mb-12 max-w-xl">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
            Methodology
          </span>
          <h2 className="mt-3 font-heading text-4xl font-black text-foreground">
            Why These Algorithms?
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Each model brings a unique lens to market data — from classical statistics 
            to modern machine learning — creating a comprehensive analytical framework.
          </p>
        </div>

        {/* Algorithm list — editorial style */}
        <div className="space-y-0">
          {algorithms.map((algo, i) => (
            <motion.article
              key={algo.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group grid gap-6 border-t border-border py-8 md:grid-cols-12 md:gap-10"
            >
              {/* Number + Icon */}
              <div className="flex items-start gap-4 md:col-span-3">
                <span className="font-mono text-3xl font-bold text-border group-hover:text-accent transition-colors">
                  {algo.number}
                </span>
                <div>
                  <div className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground group-hover:border-accent group-hover:text-accent transition-colors">
                    {algo.icon}
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="md:col-span-3">
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {algo.title}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {algo.subtitle}
                </p>
              </div>

              {/* Description */}
              <div className="md:col-span-6">
                <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/70 transition-colors">
                  {algo.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlgorithmSection;
