from flask import Flask, render_template, request
import numpy as np
import tensorflow as tf
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__, template_folder="templates")
CORS(app)

# Load models & scalers
heart_model = tf.keras.models.load_model("./models/heart_model.keras")
diabetes_model = tf.keras.models.load_model("./models/diabetes_model.keras")
heart_scaler = joblib.load("./scaler/heart_scaler.pkl")
diabetes_scaler = joblib.load("./scaler/diabetes_scaler.pkl")

# Load columns for dynamic form
heart_columns = pd.read_csv("./data/heart.csv").drop(columns=["target"]).columns.tolist()
diabetes_columns = pd.read_csv("./data/diabetes.csv").drop(columns=["Outcome"]).columns.tolist()

@app.route('/')
def index():
  return render_template("index.html")

@app.route('/heart', methods=['GET', 'POST'])
def heart():
    result = None
    probability = None
    if request.method == 'POST':
        data = request.form
        features = np.array([list(map(float, data.values()))]).reshape(1, -1)
        scaled = heart_scaler.transform(features)
        prob = heart_model.predict(scaled)[0][0]
        result = "Positive" if prob >= 0.5 else "Negative"
        probability = round(prob, 3)
    return render_template("heart_form.html", columns=heart_columns, result=result, probability=probability)

@app.route('/diabetes', methods=['GET', 'POST'])
def diabetes():
    result = None
    probability = None
    if request.method == 'POST':
        data = request.form
        features = np.array([list(map(float, data.values()))]).reshape(1, -1)
        scaled = diabetes_scaler.transform(features)
        prob = diabetes_model.predict(scaled)[0][0]
        result = "Positive" if prob >= 0.5 else "Negative"
        probability = round(prob, 3)
    return render_template("diabetes_form.html", columns=diabetes_columns, result=result, probability=probability)

if __name__ == "__main__":
    app.run(debug=True)
