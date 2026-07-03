import pandas as pd
import os
import pickle
import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# 1. Define the Modern Lifespan Handler for your developer guide
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("\n" + "=" * 60)
    print("GLOBAL HEALTH METRICS BACKEND IS FULLY OPERATIONAL")
    print("=" * 60)
    print("To interact with and test this API, follow these steps:")
    print("\n1.  OPEN THE INTERACTIVE TESTING URL:")
    print("    http://127.0.0.1:8000/docs ")
    print("   (Hold Ctrl or Cmd and click the link above to open it in your browser)")
    print("\n2.  HOW TO TEST THE PREDICTION MODEL:")
    print("   - Click on the green 'POST /api/predict' box.")
    print("   - Click the 'Try it out' button on the right.")
    print("   - Enter numbers for Schooling, GDP, etc., and hit 'Execute'.")
    print("=" * 60 + "\n")
    yield

# 2. Initialize the FastAPI app with the lifespan guide linked right away
app = FastAPI(title="Global Health Metrics API", lifespan=lifespan)

# 3. Enable CORS so your React frontend (Vite) can talk to this backend safely
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Define the data structure our API expects to receive for a prediction
class PredictionInput(BaseModel):
    schooling: float
    income_composition: float
    hiv_aids: float
    gdp: float

# 5. Load the saved ML model and scaler when the server starts
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "scaler.pkl")

if os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH):
    with open(MODEL_PATH, "rb") as m_file:
        model = pickle.load(m_file)
    with open(SCALER_PATH, "rb") as s_file:
        scaler = pickle.load(s_file)
    print("Success: Model and Scaler loaded perfectly into FastAPI!")
else:
    model = None
    scaler = None
    print("Warning: model.pkl or scaler.pkl not found. Prediction endpoint will fail.")

# 6. Create a basic baseline endpoint to make sure the server is alive
@app.get("/")
def home():
    return {"status": "online", "message": "Global Health Metrics Backend is running"}

# 7. Create the prediction endpoint that React will call
@app.post("/api/predict")
def predict_life_expectancy(data: PredictionInput):
    if not model or not scaler:
        raise HTTPException(status_code=500, detail="Prediction model is not loaded on the server.")

    try:
        # Create a pandas DataFrame matching the EXACT column names used during your training fit
        input_df = pd.DataFrame([{
            "Schooling": data.schooling,
            "Income composition of resources": data.income_composition,
            "HIV/AIDS": data.hiv_aids,
            "GDP": data.gdp
        }])

        # Standardize the features using the saved scaler (No warning, no errors!)
        scaled_features = scaler.transform(input_df)

        # Run the prediction
        prediction = model.predict(scaled_features)

        # Return the result rounded to two decimals
        return {
            "predicted_life_expectancy": round(float(prediction[0]), 2)
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error generating prediction: {str(e)}")

# Port load
if __name__ == "__main__":
    # This instructs Python to turn on the Uvicorn server automatically when clicking Play
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=False)