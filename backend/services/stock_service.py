import yfinance as yf
import pandas as pd

def get_stock_data(ticker_symbol: str, period: str = "1y"):
    """
    Fetches historical stock data from Yahoo Finance.
    
    Args:
        ticker_symbol (str): The stock ticker (e.g., 'AAPL', 'TCS.NS')
        period (str): The time period to fetch (e.g., '1y', '6mo', 'max')
        
    Returns:
        tuple: (DataFrame of historical data, Dictionary of meta info)
    """
    try:
        ticker = yf.Ticker(ticker_symbol)
        
        # Get historical market data
        hist = ticker.history(period=period)
        
        if hist.empty:
            return pd.DataFrame(), {}
            
        # Get metadata with robust failbacks
        # ticker.info is notoriously slow/unreliable, use fast_info where possible
        fast_info = getattr(ticker, 'fast_info', {})
        
        current_price = 0.0
        try:
            current_price = float(fast_info.get("lastPrice", hist["Close"].iloc[-1]))
        except Exception:
            current_price = float(hist["Close"].iloc[-1])

        previous_close = 0.0
        try:
            previous_close = float(fast_info.get("previousClose", hist["Close"].iloc[-2] if len(hist) > 1 else current_price))
        except Exception:
            previous_close = float(hist["Close"].iloc[-2] if len(hist) > 1 else current_price)

        meta_info = {
            "symbol": str(ticker_symbol.upper()),
            "shortName": str(ticker_symbol.upper()),
            "currentPrice": float(f"{current_price:.2f}"),
            "previousClose": float(f"{previous_close:.2f}"),
            "currency": str(fast_info.get('currency', 'USD'))
        }
            
        return hist, meta_info
        
    except Exception as e:
        print(f"Error fetching data for {ticker_symbol}: {e}")
        return pd.DataFrame(), {}
