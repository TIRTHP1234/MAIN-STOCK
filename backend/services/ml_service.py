import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.neighbors import KNeighborsRegressor
from sklearn.svm import SVR
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score
from statsmodels.tsa.arima.model import ARIMA
import warnings
from typing import Dict, Any, List

warnings.filterwarnings('ignore')

def run_analysis(hist_data: pd.DataFrame, forecast_days: int = 5) -> Dict[str, Any]:
    """
    Runs 5 analytical models on the historical stock data.
    """
    # Prepare Data
    df = hist_data.copy()
    df.reset_index(inplace=True)
    
    # We'll use 'Close' price for predictions
    # Ensure Date is datetime and timezone-naive
    if 'Date' in df.columns:
        df['Date'] = pd.to_datetime(df['Date']).dt.tz_localize(None)
    
    prices = df['Close'].values
    dates = df['Date'].dt.strftime('%Y-%m-%d').tolist()
    
    # Feature Engineering for dynamic predictions
    df['Trend'] = np.arange(len(df))
    df['Day'] = df['Date'].dt.day
    df['DayOfWeek'] = df['Date'].dt.dayofweek
    
    X = df[['Trend', 'Day', 'DayOfWeek']].values
    y = df['Close'].values
    
    # Predict for the current days + future days
    future_dates = pd.date_range(start=df['Date'].iloc[-1] + pd.Timedelta(days=1), periods=forecast_days)
    all_dates = dates + future_dates.strftime('%Y-%m-%d').tolist()
    
    future_df = pd.DataFrame({'Date': future_dates})
    future_df['Trend'] = np.arange(len(df), len(df) + forecast_days)
    future_df['Day'] = future_df['Date'].dt.day
    future_df['DayOfWeek'] = future_df['Date'].dt.dayofweek
    X_future_only = future_df[['Trend', 'Day', 'DayOfWeek']].values
    
    X_future = np.vstack((X, X_future_only))
    
    predictions: Dict[str, Any] = {}

    def calculate_metrics(y_true, y_pred):
        try:
            from sklearn.metrics import mean_squared_error, r2_score
            mse = mean_squared_error(y_true, y_pred)
            rmse = np.sqrt(mse)
            r2 = r2_score(y_true, y_pred)
            
            # Directional accuracy: % of times predicted direction matches actual direction
            actual_diffs = np.diff(y_true)
            pred_diffs = np.diff(y_pred)
            if len(actual_diffs) > 0 and len(pred_diffs) > 0:
                correct_directions = np.sum(np.sign(actual_diffs) == np.sign(pred_diffs))
                accuracy = (correct_directions / len(actual_diffs)) * 100
            else:
                accuracy = 0.0
                
            return {
                "mse": float(mse),
                "rmse": float(rmse),
                "r2": float(r2),
                "accuracy": float(accuracy)
            }
        except Exception as e:
            print(f"Metrics error: {e}")
            return {"mse": 0.0, "rmse": 0.0, "r2": 0.0, "accuracy": 0.0}

    # 1. Linear Regression
    lr_model = LinearRegression()
    lr_model.fit(X, y)
    lr_pred_train = lr_model.predict(X)
    lr_pred = lr_model.predict(X_future)
    lr_metrics = calculate_metrics(y, lr_pred_train)
    predictions["linear_regression"] = {
        "values": lr_pred.tolist(),
        "metrics": lr_metrics
    }

    # 2. ARIMA
    try:
        arima_model = ARIMA(y, order=(5, 1, 0))
        arima_fit = arima_model.fit()
        arima_pred = arima_fit.predict(start=0, end=len(y) - 1).tolist()
        
        # Add slight historical rolling volatility to ARIMA so it's not a perfectly flat curve
        base_forecast = np.array(arima_fit.forecast(steps=forecast_days))
        returns = np.diff(y) / y[:-1] if len(y) > 1 else np.array([0.01])
        volatility = np.std(returns) if len(returns) > 0 else 0.01
        
        # Generate a structured random walk for the forecast component to simulate realistic trading range
        np.random.seed(42)  # Deterministic for consistent UI demo
        random_walk = np.cumprod(1 + np.random.normal(0, volatility * 0.5, forecast_days))
        dynamic_forecast = base_forecast * random_walk
        
        arima_metrics = calculate_metrics(y, arima_pred)
        predictions["arima"] = {
            "values": arima_pred + dynamic_forecast.tolist(),
            "metrics": arima_metrics
        }
    except Exception as e:
        print(f"ARIMA error: {e}")
        predictions["arima"] = {
            "values": [float(y[-1])] * len(X_future),
            "metrics": {"mse": 0.0, "rmse": 0.0, "r2": 0.0, "accuracy": 0.0}
        }

    # 3. KNN
    # Increase neighbors slightly for smoothness but allow date features to cause flux
    knn_model = KNeighborsRegressor(n_neighbors=min(8, len(y)), weights='distance')
    # Scale features for KNN so Trend doesn't completely dominate Day/DayOfWeek
    scaler_knn = StandardScaler()
    X_knn = scaler_knn.fit_transform(X)
    X_future_knn = scaler_knn.transform(X_future)
    
    knn_model.fit(X_knn, y)
    knn_pred_train = knn_model.predict(X_knn)
    knn_pred = knn_model.predict(X_future_knn)
    knn_metrics = calculate_metrics(y, knn_pred_train)
    
    # KNN tends to flatline out of bounds. We add the LR trend component to its future predictions.
    # Future trend adjustment based on LR slope:
    lr_slope = lr_model.coef_[0] # Trend coef
    for i in range(len(y), len(X_future)):
        knn_pred[i] = knn_pred[i] + (lr_slope * (i - len(y) + 1) * 0.5) 

    predictions["knn"] = {
        "values": knn_pred.tolist(),
        "metrics": knn_metrics
    }

    # 4. SVM
    scaler_x = StandardScaler()
    scaler_y = StandardScaler()
    
    X_scaled = scaler_x.fit_transform(X)
    X_future_scaled = scaler_x.transform(X_future)
    y_scaled = scaler_y.fit_transform(y.reshape(-1, 1)).ravel()
    
    # Use polynomial kernel for SVM so it can extrapolate trend better than RBF
    svm_model = SVR(kernel='poly', degree=2, C=100, gamma='scale', epsilon=.1)
    svm_model.fit(X_scaled, y_scaled)
    
    svm_pred_train_scaled = svm_model.predict(X_scaled)
    svm_pred_train = scaler_y.inverse_transform(svm_pred_train_scaled.reshape(-1, 1)).ravel()
    
    svm_pred_scaled = svm_model.predict(X_future_scaled)
    svm_pred = scaler_y.inverse_transform(svm_pred_scaled.reshape(-1, 1)).ravel()
    
    svm_metrics = calculate_metrics(y, svm_pred_train)
    
    predictions["svm"] = {
        "values": svm_pred.tolist(),
        "metrics": svm_metrics
    }

    # 5. Correlation Analysis
    insights: Dict[str, Any] = {}
    try:
        # Calculate correlation. Ensure we handle NaNs and cast to float.
        corr_raw = df['Close'].corr(df['Volume'])
        corr = float(corr_raw) if not np.isnan(corr_raw) else 0.0
        
        df['Rolling_Corr'] = df['Close'].rolling(window=20).corr(df['Volume'])
        rolling_corr = df['Rolling_Corr'].fillna(0).tolist()
        
        insights = {
            "volume_price_correlation": float(np.round(corr, 4)),
            "rolling_correlation": rolling_corr + [0] * forecast_days,
            "trend": "Strong Positive" if corr > 0.5 else "Strong Negative" if corr < -0.5 else "Neutral"
        }
    except Exception as e:
        print(f"Correlation error: {e}")
        insights = {
             "volume_price_correlation": 0,
             "rolling_correlation": [0] * (len(prices) + forecast_days),
             "trend": "Unknown"
        }

    return {
        "dates": all_dates,
        "historical": y.tolist() + [None] * forecast_days,
        "predictions": predictions,
        "insights": insights
    }
