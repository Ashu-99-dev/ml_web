AgriPredict - ML Crop Recommendation Engine

AgriPredict is a modern, full-stack web application that uses a trained Machine Learning model to recommend the best crop to plant based on soil and environmental parameters.

Features
Sleek, Modern UI:A beautiful glassmorphism-inspired interface with subtle animations.
Real-Time Predictions:Get instant crop recommendations via a FastAPI backend.
Input Parameters:
 - Nitrogen (N)
 - Phosphorus (P)
 - Potassium (K)
 - Temperature (°C)
 - Humidity (%)
 - pH Level
 - Rainfall (mm)

Tech Stack
 - Frontend:** HTML5, CSS3 (Modern Glassmorphism Design), Vanilla JavaScript
 - Backend:** Python, FastAPI, Uvicorn
 - Machine Learning:** Scikit-Learn (v1.6.1), Random Forest Classifier

How to Run Locally

1. Clone the Repository
2. Set Up a Virtual Environment (Recommended)
3. Install Dependencies
4. Run the Application
 - Start the FastAPI server using Uvicorn:
5. Access the Dashboard
Open your favorite web browser and go to:
http://localhost:8000](http://localhost:8000)

Project Structure
- `main.py` - The FastAPI backend application and API endpoints.
- `static/` - Directory containing frontend files (`index.html`, `style.css`, `script.js`).
- `random_forest_model.pkl` - The pre-trained scikit-learn model.
- `label_encoder.pkl` - Encoder used to map ML predictions back to readable crop names.
- `requirements.txt` - Python package dependencies.

