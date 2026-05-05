import pickle
import sys

def inspect_model():
    try:
        with open('random_forest_model.pkl', 'rb') as f:
            model = pickle.load(f)
        print("Model loaded successfully")
        print("Model type:", type(model))
    except Exception as e:
        print("Error loading model:", e)

    try:
        with open('label_encoder.pkl', 'rb') as f:
            le = pickle.load(f)
        print("Encoder loaded successfully")
        print("Encoder type:", type(le))
        if hasattr(le, 'classes_'):
            print("Classes:", le.classes_)
    except Exception as e:
        print("Error loading encoder:", e)

inspect_model()
