from flask import Blueprint, request, jsonify
import joblib
import numpy as np
from tensorflow.keras.models import load_model
import pandas as pd

from utils.mappings import heart_mappings

heart_bp = Blueprint("heart_bp", __name__)

# Load model & preprocessor once
model = load_model("./models/heart_model.keras")
scaler = joblib.load("./scaler/heart_scaler.pkl")

# ✅ Load feature means if available
df_train = pd.read_csv("./data/heart.csv")
feature_means = df_train.mean(numeric_only=True).to_dict()

@heart_bp.route("/heart", methods=["POST"])
def predict_heart():
    try:
        data = request.get_json()
        print("Received data:", data)
        if not data:
            return jsonify({"error": "No input received"}), 400

        # Convert friendly text inputs to numerical values
        for field, mapping in heart_mappings.items():
            if field in data and data[field] in mapping:
                data[field] = mapping[data[field]]

        # Convert form data to DataFrame
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
