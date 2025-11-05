from flask import Blueprint, request, jsonify
import joblib
import numpy as np
from tensorflow.keras.models import load_model
import pandas as pd

heart_bp = Blueprint("heart_bp", __name__)

# Load model & preprocessor once
model = load_model("./models/heart_model.keras")
preprocessor = joblib.load("./scaler/heart_scaler.pkl")

@heart_bp.route("/heart", methods=["POST"])
def predict_heart():
    try:
        data = request.get_json()
        print("Received data:", data)
        if not data:
            return jsonify({"error": "No input received"}), 400

        # Convert form data to DataFrame
        df = pd.DataFrame([data])
        expected_cols = preprocessor.feature_names_in_
        df = df.reindex(columns=expected_cols, fill_value=0)
        X = preprocessor.transform(df)

        # Predict
        prob = float(model.predict(X)[0][0])
        pred = "High Risk" if prob >= 0.5 else "Low Risk"

        return jsonify({"probability": prob, "prediction": pred}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
