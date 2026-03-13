import { motion } from "framer-motion";
import { TrendingUp, Clock, Grid3X3, Cpu, Activity } from "lucide-react";
import type { ReactNode } from "react";

type Algorithm = {
  icon: ReactNode;
  title: string;
  description: string;
};

const algorithms: Algorithm[] = [
  {
    icon: <TrendingUp className="h-6 w-6 text-accent" />, 
    title: "Linear Regression",
    description:
      "A fundamental statistical method that models the relationship between a dependent variable (stock price) and one or more independent variables (time, past prices). It assumes a linear trend, making it useful for identifying the general direction of the market.",
  },
  {
    icon: <Clock className="h-6 w-6 text-accent" />,
    title: "ARIMA (AutoRegressive Integrated Moving Average)",
    description:
      "A popular time-series forecasting model that captures temporal structures in data. It uses past values (AutoRegressive), differencing to make data stationary (Integrated), and past forecast errors (Moving Average) to predict future prices.",
  },
  {
    icon: <Grid3X3 className="h-6 w-6 text-accent" />,
    title: "KNN (K-Nearest Neighbors)",
    description:
      "A non-parametric algorithm that predicts the stock price based on the average of the 'k' most similar historical data points. It assumes that similar market conditions in the past will lead to similar future outcomes.",
  },
  {
    icon: <Cpu className="h-6 w-6 text-accent" />,
    title: "SVM (Support Vector Machine)",
    description:
      "A powerful machine learning model that finds the optimal hyperplane to separate data in a high-dimensional space. In regression (SVR), it attempts to fit the best line within a threshold of error, effectively handling non-linear trends.",
  },
  {
    icon: <Activity className="h-6 w-6 text-accent" />,
    title: "Correlation Analysis",
    description:
      "This method calculates the statistical relationship between the current price movement and historical lagging periods. It helps identify cyclical patterns and how strongly past price changes influence current trends.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const AlgorithmCards = () => {
  return (
    <section className="container mx-auto px-6 pb-20">
      <h2 className="text-center font-heading text-3xl font-bold text-foreground">
        Why These Algorithms?
      </h2>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {algorithms.map((algo) => (
          <motion.div
            key={algo.title}
            variants={item}
            className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-accent/10">
              {algo.icon}
            </div>
            <h3 className="font-heading text-lg font-bold text-foreground">
              {algo.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {algo.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AlgorithmCards;
