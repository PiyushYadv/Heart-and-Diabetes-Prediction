# routes/heart_routes.py
from flask import Blueprint, render_template, request
import tensorflow as tf
import joblib
import pandas as pd
from utils.mappings import heart_mappings
from utils.preprocess import prepare_input

heart_bp = Blueprint('heart_bp', __name__)

# Load models, scalers, and dataset
heart_model = tf.keras.models.load_model("models/heart_model.keras")
heart_scaler = joblib.load("scaler/heart_scaler.pkl")
heart_df = pd.read_csv("data/heart.csv")
heart_columns = heart_df.drop(columns=["target"]).columns.tolist()
heart_means = heart_df.drop(columns=["target"]).mean().to_dict()

@heart_bp.route('/', methods=['GET', 'POST'])
def heart_form():
    result = None
    probability = None
    if request.method == 'POST':
        data = dict(request.form)
        X_scaled = prepare_input(data, heart_columns, heart_mappings, heart_means, heart_scaler)
        prob = float(heart_model.predict(X_scaled)[0][0])
        result = "Positive" if prob >= 0.5 else "Negative"
        probability = round(prob, 3)

    return render_template("heart_form.html", result=result, probability=probability)
