from flask import Blueprint, request, jsonify
import joblib
import numpy as np
from tensorflow.keras.models import load_model
import pandas as pd

diabetes_bp = Blueprint("diabetes_bp", __name__)

# Load model and scaler
model = load_model("./models/diabetes_model.keras")
scaler = joblib.load("./scaler/diabetes_scaler.pkl")

# ✅ Load feature means if available
df_train = pd.read_csv("./data/diabetes.csv")
feature_means = df_train.mean(numeric_only=True).to_dict()

@diabetes_bp.route("/diabetes", methods=["POST"])
def predict_diabetes():
    try:
        data = request.get_json()
        print("Received data:", data)

        if not data:
            return jsonify({"error": "No input received"}), 400

        # Convert input to DataFrame
        df = pd.DataFrame([data])
                 # 🔹 Convert all blank or invalid entries to NaN
        df = df.replace(["", " ", "None", None], np.nan)

        # Align with scaler's expected columns
        expected_cols = scaler.feature_names_in_
        df = df.reindex(columns=expected_cols)

        # 🔹 Fill NaN with feature means if available
        for col in df.columns:
            if df[col].isnull().any():
                df[col].fillna(feature_means.get(col, 0), inplace=True)

        # 🔹 Ensure all columns are numeric
        df = df.apply(pd.to_numeric, errors="coerce").fillna(0)

        # Transform using preprocessor
        X = scaler.transform(df)

        # Predict
        prob = float(model.predict(X)[0][0])
        pred = "High Risk" if prob >= 0.5 else "Low Risk"

        return jsonify({"probability": prob, "prediction": pred}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500
