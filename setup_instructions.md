# StockPredict AI — Setup Instructions

A full-stack AI stock prediction app using Python (FastAPI) as the backend and React/Vite as the frontend.

---

## Prerequisites

| Tool | Version | Download |
|------|---------|----------|
| Python | 3.10+ | https://python.org |
| Node.js + npm | 18+ | https://nodejs.org |

---

## Step 1 — Clone the Repository

```bash
git clone <YOUR_GIT_URL>
cd Stock2
```

---

## Step 2 — Backend Setup (Terminal 1)

Navigate to the `backend` folder and set up a Python virtual environment:

```bash
cd backend
python -m venv venv
```

**Activate the virtual environment:**

- **Windows:**
  ```bash
  venv\Scripts\activate
  ```
- **Mac / Linux:**
  ```bash
  source venv/bin/activate
  ```

**Install all Python dependencies:**

```bash
pip install -r requirements.txt
```

**Start the API server:**

```bash
python main.py
```

> ✅ The backend will now be running at `http://127.0.0.1:8000`

---

## Step 3 — Frontend Setup (Terminal 2)

Open a **new terminal** in the project root directory (not inside `backend/`):

```bash
npm install
npm run dev
```

> ✅ The frontend will now be running at `http://localhost:5173` (or similar port shown in your terminal)

---

## How to Use

1. Open the frontend URL in your browser.
2. Type any **stock ticker symbol** in the Command Center (e.g., `AAPL`, `TCS.NS`, `RELIANCE.NS`).
3. Press **Enter** or click **Run Analysis**.
4. Wait for the 3D loading animation to complete (~4 seconds).
5. View the AI-generated chart, algorithm metrics, and the unified **AI Forecast Summary** with 5-day and 30-day price targets.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, Vite, Tailwind CSS, shadcn-ui, Recharts |
| Backend | Python, FastAPI, Uvicorn |
| Data | Yahoo Finance (`yfinance`) |
| ML Models | Linear Regression, ARIMA, KNN, SVM (scikit-learn, statsmodels) |

---

## Backend API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/api/analyze?ticker=AAPL` | GET | Run full ML analysis on given ticker |
