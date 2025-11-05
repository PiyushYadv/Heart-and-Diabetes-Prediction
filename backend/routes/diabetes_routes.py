from flask import Blueprint, request, jsonify
import joblib
import numpy as np
from tensorflow.keras.models import load_model
import pandas as pd

diabetes_bp = Blueprint("diabetes_bp", __name__)

# Load model and scaler
model = load_model("./models/diabetes_model.keras")
scaler = joblib.load("./scaler/diabetes_scaler.pkl")

@diabetes_bp.route("/diabetes", methods=["POST"])
def predict_diabetes():
    try:
        data = request.get_json()
        print("Received data:", data)

        if not data:
            return jsonify({"error": "No input received"}), 400

        # Convert input to DataFrame
        df = pd.DataFrame([data])
        expected_cols = scaler.feature_names_in_
        df = df.reindex(columns=expected_cols, fill_value=0)
        X = scaler.transform(df)

        prob = float(model.predict(X)[0][0])
        pred = "High Risk" if prob >= 0.5 else "Low Risk"

        return jsonify({"probability": prob, "prediction": pred}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500
