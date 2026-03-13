from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services.stock_service import get_stock_data
from services.ml_service import run_analysis

app = FastAPI(title="Market View Pro API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Market View Pro API"}

@app.get("/api/analyze")
def analyze_stock(ticker: str):
    print(f"Request received for ticker: {ticker}")
    try:
        # Fetch historical data
        hist_data, meta_info = get_stock_data(ticker)
        
        if hist_data.empty:
            print(f"No data found for {ticker}")
            raise HTTPException(status_code=404, detail=f"No data found for ticker: {ticker}")
            
        print(f"Running ML analysis for {ticker}")
        # Run ML Algorithms for 30 days (Long Term)
        analysis_results = run_analysis(hist_data, forecast_days=30)
        
        print(f"Analysis complete for {ticker}")
        # Prepare response
        return {
            "meta": meta_info,
            "analysis": analysis_results
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error during analysis for {ticker}: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
