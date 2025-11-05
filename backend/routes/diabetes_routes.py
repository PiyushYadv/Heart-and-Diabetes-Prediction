# routes/diabetes_routes.py
from flask import Blueprint, render_template, request
import tensorflow as tf
import joblib
import pandas as pd
from utils.mappings import diabetes_mappings
from utils.preprocess import prepare_input

diabetes_bp = Blueprint('diabetes_bp', __name__)

# Load models, scalers, and dataset
diabetes_model = tf.keras.models.load_model("models/diabetes_model.keras")
diabetes_scaler = joblib.load("scaler/diabetes_scaler.pkl")
diabetes_df = pd.read_csv("data/diabetes.csv")
diabetes_columns = diabetes_df.drop(columns=["Outcome"]).columns.tolist()
diabetes_means = diabetes_df.drop(columns=["Outcome"]).mean().to_dict()

@diabetes_bp.route('/', methods=['GET', 'POST'])
def diabetes_form():
    result = None
    probability = None
    if request.method == 'POST':
        data = dict(request.form)
        X_scaled = prepare_input(data, diabetes_columns, diabetes_mappings, diabetes_means, diabetes_scaler)
        prob = float(diabetes_model.predict(X_scaled)[0][0])
        result = "Positive" if prob >= 0.5 else "Negative"
        probability = round(prob, 3)

    return render_template("diabetes_form.html", result=result, probability=probability)
