# diabetes_ann.py
import numpy as np, pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, roc_auc_score, confusion_matrix
import tensorflow as tf
from tensorflow.keras import layers, models, callbacks

SEED=42
tf.random.set_seed(SEED)
np.random.seed(SEED)

df = pd.read_csv("./data/diabetes.csv")  # expects 'Outcome' column (0/1)
X = df.drop(columns=["Outcome"])
y = df["Outcome"]

# Clean zeros in certain columns (optional):
cols_nonzero = ["Glucose","BloodPressure","SkinThickness","Insulin","BMI"]
for c in cols_nonzero:
    X[c] = X[c].replace(0, np.nan).fillna(X[c].median())

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=SEED)
scaler = StandardScaler().fit(X_train)
X_train = scaler.transform(X_train)
X_test  = scaler.transform(X_test)

model = models.Sequential([
    layers.Input(shape=(X_train.shape[1],)),
    layers.Dense(32, activation='relu'),
    layers.Dense(16, activation='relu'),
    layers.Dropout(0.25),
    layers.Dense(1, activation='sigmoid')
])
model.compile('adam', 'binary_crossentropy', metrics=['accuracy', tf.keras.metrics.AUC(name='auc')])
es = callbacks.EarlyStopping(monitor='val_auc', mode='max', patience=8, restore_best_weights=True)

model.fit(X_train, y_train, validation_split=0.15, epochs=150, batch_size=32, callbacks=[es], verbose=2)

probs = model.predict(X_test).ravel()
preds = (probs >= 0.5).astype(int)
print(classification_report(y_test, preds))
print("AUC:", roc_auc_score(y_test, probs))
print("Confusion matrix:\n", confusion_matrix(y_test, preds))

import joblib
model.save("models/diabetes_model.keras")
joblib.dump(scaler, "scaler/diabetes_scaler.pkl")
