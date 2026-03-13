# StockPredict AI 📈

An AI-powered stock analysis and prediction platform built with **React** (frontend) and **FastAPI** (backend). Enter any stock ticker to get real-time data, interactive charts, and multi-model machine learning predictions for both short-term (5-day) and long-term (30-day) price targets.

**Live Demo:** https://main-stock.onrender.com

---

## Features

- 🤖 **4 ML Models** — Linear Regression, ARIMA, KNN, and SVM predictions
- 📊 **Interactive Charts** — Historical price + all 4 model forecast lines
- 🎯 **AI Forecast Summary** — Unified 5-day & 30-day price targets with BUY/SELL/HOLD signals
- ⚡ **Algorithm Metrics** — MSE, RMSE, R² Score, and Directional Accuracy per model
- 💱 **Indian Rupee (₹)** formatting
- 🌙 **Dark / Light Mode** toggle
- 🎬 **3D Loading Animation** during analysis

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Recharts |
| Backend | Python, FastAPI, Uvicorn |
| Data | Yahoo Finance via `yfinance` |
| ML | scikit-learn (Linear Regression, KNN, SVM), statsmodels (ARIMA) |

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+ and npm

### 1. Clone the Repository

```bash
git clone https://github.com/TIRTHP1234/MAIN-STOCK.git
cd MAIN-STOCK
```

### 2. Run the Backend (Terminal 1)

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac / Linux
source venv/bin/activate

pip install -r requirements.txt
python main.py
```

Backend runs at: `http://127.0.0.1:8000`

### 3. Run the Frontend (Terminal 2)

```bash
# From the project root directory
npm install
npm run dev
```

Frontend runs at: `http://localhost:8080`

---

## Usage

1. Open the frontend URL in your browser
2. Type a stock ticker symbol in the search box (e.g., `AAPL`, `TSLA`, `INFY.NS`)
3. Press **Enter** or click **Analyze**
4. Watch the 3D loading animation while AI models process the data
5. Explore the interactive chart, algorithm metrics, and the **AI Forecast Summary**

### Supported Tickers

| Exchange | Examples |
|----------|---------|
| NASDAQ / NYSE | `AAPL`, `MSFT`, `TSLA`, `GOOGL`, `AMZN` |
| NSE (India) | `RELIANCE.NS`, `INFY.NS`, `HDFCBANK.NS`, `WIPRO.NS` |
| BSE (India) | `RELIANCE.BO`, `TCS.BO` |

---

## API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/api/analyze?ticker=AAPL` | GET | Run full ML analysis |

---

## Deployment

This project is deployed on **Render**:

- **Backend:** Render Web Service (`backend/` directory)
  - Build: `pip install -r requirements.txt`
  - Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`

- **Frontend:** Render Static Site (root directory)
  - Build: `npm install && npm run build`
  - Publish: `dist/`

---

## Project Structure

```
MAIN-STOCK/
├── backend/
│   ├── main.py                 # FastAPI app & routes
│   ├── requirements.txt        # Python dependencies
│   └── services/
│       ├── stock_service.py    # yfinance data fetching
│       └── ml_service.py       # ML model training & prediction
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Header with dark/light toggle
│   │   ├── AnalysisResults.tsx # Charts & prediction display
│   │   └── CommandCenter.tsx   # Search input
│   ├── pages/
│   │   ├── Index.tsx           # Home page
│   │   └── AnalysisPage.tsx    # Analysis results page
│   └── hooks/
│       └── useTheme.ts         # Dark/light mode hook
├── setup_instructions.md       # Detailed setup guide
└── README.md
```

---

## License

MIT
