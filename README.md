# 🩺 Heart & Diabetes Detection using Artificial Neural Networks (ANN)

A full-stack **AI-powered health prediction system** that detects the likelihood of **heart disease** and **diabetes** using trained neural network models (TensorFlow + Flask backend) and an interactive **React + Tailwind** frontend with beautiful charts and animations.

---

## 🚀 Project Overview

This project predicts the probability of **heart disease** and **diabetes** based on medical data input by users.  
It integrates:
- **Machine Learning models (ANN)** trained using TensorFlow/Keras
- **Flask backend API** for prediction
- **React frontend** built with Vite, Tailwind CSS, and Framer Motion
- **Interactive charts** and awareness data using Recharts

---

## 🧠 Features

✅ **Two separate AI models**:
- 🫀 Heart Disease Prediction  
- 💉 Diabetes Prediction  

✅ **Frontend**:
- Clean, responsive UI built with **React + Tailwind CSS**
- Animated charts (Pie, Bar) for awareness
- Separate forms for both diseases
- Animated circular risk meter with **Framer Motion**
- Real-time personalized advice (based on prediction percentage)

✅ **Backend**:
- Flask + TensorFlow-based inference API  
- Robust preprocessing and input handling  
- Auto-handles missing or invalid fields  
- Returns clean JSON responses to frontend  
- Logs all predictions for later analysis

✅ **Model Training**:
- Trained ANN models on public Kaggle datasets:
  - [Heart Disease Dataset](https://www.kaggle.com/ronitf/heart-disease-uci)
  - [Pima Indians Diabetes Dataset](https://www.kaggle.com/uciml/pima-indians-diabetes-database)
- Feature scaling using StandardScaler
- EarlyStopping callbacks for stable convergence

---

## 🧩 Tech Stack

| Layer | Tools / Libraries |
|-------|-------------------|
| **Frontend** | React (Vite), Tailwind CSS, Framer Motion, Recharts, Axios |
| **Backend** | Flask, Flask-CORS, TensorFlow/Keras, Pandas, NumPy, Scikit-learn, Joblib |
| **Models** | ANN trained on structured CSV data (binary classification) |

---

## ⚙️ Installation & Setup

### 🔧 1. Clone the repository
```bash
git clone https://github.com/<your-username>/heart-diabetes-detection.git
cd heart-diabetes-detection
```

---

### 🧠 2. Setup Python backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # On macOS/Linux
.venv\Scripts\activate      # On Windows

pip install -r requirements.txt
python app.py
```

Backend runs on → `http://127.0.0.1:5000`

---

### 🖥️ 3. Setup React frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on → `http://localhost:5173`

---

## 🧪 API Endpoints

| Endpoint            | Method             | Description                       |
| ------------------- | ------------------ | --------------------------------- |
| `/predict/heart`    | `POST`             | Predicts heart disease risk       |
| `/predict/diabetes` | `POST`             | Predicts diabetes risk            |
| `/data/awareness`   | `GET` *(optional)* | Returns awareness data for charts |

**Sample Request:**

```json
POST /predict/heart
{
  "age": 52,
  "sex": "Male",
  "cp": "Typical Angina",
  "chol": 210,
  "thalach": 150,
  ...
}
```

**Sample Response:**

```json
{
  "probability": 0.82,
  "prediction": "High Risk"
}
```

---

## 🧬 Model Architecture (Example: Heart ANN)

```
Input Layer (13 features)
Dense (64, relu)
Dropout (0.3)
Dense (32, relu)
Dense (1, sigmoid)
```

Trained with:

* Optimizer: Adam
* Loss: Binary Crossentropy
* Metrics: Accuracy, AUC
* EarlyStopping (patience=10)

---

## 📊 Visualizations

* Confusion Matrix (Seaborn heatmap)
* ROC Curve
* Metrics Bar Chart (Accuracy, Precision, Recall, F1, AUC)
* Animated circular percentage meter for frontend results

---

## 🧠 Example Advice Logic

| Probability | Advice                                    |
| ----------- | ----------------------------------------- |
| ≥ 90%       | 🚨 Visit a hospital immediately           |
| ≥ 70%       | ⚠️ Consult a doctor soon                  |
| ≥ 40%       | 🟠 Moderate risk, adopt healthy lifestyle |
| < 40%       | ✅ Low risk, maintain regular check-ups    |

---

## 📁 Folder Structure

```
heart-diabetes-detection/
├── backend/
│   ├── app.py
│   ├── routes/
│   │   ├── heart_routes.py
│   │   └── diabetes_routes.py
│   ├── models/
│   ├── scaler/
│   ├── utils/
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── api/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    └── package.json
```

---

## 🎓 How It Works

1. User inputs medical data in the web form.
2. React sends data to Flask via REST API.
3. Flask preprocesses data, loads model & scaler, and predicts.
4. Backend returns probability → frontend displays animated percentage and advice.

---

## 🤝 Contributors

**👨‍💻 Piyush Yadav**
UI/UX Designer | Full-stack Developer | AI Enthusiast
📍 *Delhi Technological University*
💼 [LinkedIn](https://www.linkedin.com/in/piyush-yadav) • [Portfolio](#)

---

## 🧾 License

This project is released under the [MIT License](LICENSE).

---

## ❤️ Acknowledgments

* Kaggle datasets used for model training
* TensorFlow/Keras team for ANN support
* Tailwind CSS & Framer Motion for frontend magic

---

### ⭐ If you like this project, consider starring the repo!

> “Health is wealth — a small prediction today can prevent a big problem tomorrow.” 💡
