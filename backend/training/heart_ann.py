# heart_ann.py
import numpy as np, pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, roc_auc_score, confusion_matrix
import tensorflow as tf
from tensorflow.keras import layers, models, regularizers, callbacks

SEED=42
tf.random.set_seed(SEED)
np.random.seed(SEED)

# Load dataset (example: CSV with last column 'target' 0/1)
df = pd.read_csv("./data/heart.csv")            # replace with actual path
X = df.drop(columns=["target"])
y = df["target"]

# Basic preprocessing
X = pd.get_dummies(X, drop_first=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=SEED)
scaler = StandardScaler().fit(X_train)
X_train = scaler.transform(X_train)
X_test  = scaler.transform(X_test)

# Model
model = models.Sequential([
    layers.Input(shape=(X_train.shape[1],)),
    layers.Dense(64, activation='relu', kernel_regularizer=regularizers.l2(1e-4)),
    layers.Dropout(0.3),
    layers.Dense(32, activation='relu', kernel_regularizer=regularizers.l2(1e-4)),
    layers.Dense(1, activation='sigmoid')
])
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy', tf.keras.metrics.AUC(name='auc')])
es = callbacks.EarlyStopping(monitor='val_auc', mode='max', patience=10, restore_best_weights=True)

history = model.fit(X_train, y_train, validation_split=0.15, epochs=200, batch_size=32, callbacks=[es], verbose=2)

# Eval
probs = model.predict(X_test).ravel()
preds = (probs >= 0.5).astype(int)
print(classification_report(y_test, preds))
print("AUC:", roc_auc_score(y_test, probs))
print("Confusion matrix:\n", confusion_matrix(y_test, preds))

import joblib
model.save("models/heart_model.keras")
joblib.dump(scaler, "scaler/heart_scaler.pkl")
