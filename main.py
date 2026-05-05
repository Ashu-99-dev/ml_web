import pickle
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import uvicorn

app = FastAPI(title="Crop Recommendation API")

# Load models
try:
    with open('random_forest_model.pkl', 'rb') as f:
        model = pickle.load(f)
    with open('label_encoder.pkl', 'rb') as f:
        label_encoder = pickle.load(f)
    print("Models loaded successfully")
except Exception as e:
    print(f"Error loading models: {e}")
    model = None
    label_encoder = None

class PredictionRequest(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

@app.post("/predict")
async def predict_crop(data: PredictionRequest):
    if model is None or label_encoder is None:
        raise HTTPException(status_code=500, detail="Models not loaded properly. Check server logs.")
    
    try:
        # Prepare the feature array
        features = [[
            data.N,
            data.P,
            data.K,
            data.temperature,
            data.humidity,
            data.ph,
            data.rainfall
        ]]
        
        # Predict
        prediction = model.predict(features)
        
        # Decode the prediction
        crop_name = label_encoder.inverse_transform(prediction)[0]
        
        return {"prediction": crop_name}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction error: {str(e)}")

# Mount static files (serve index.html at /)
app.mount("/", StaticFiles(directory="static", html=True), name="static")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
