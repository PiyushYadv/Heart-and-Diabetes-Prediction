# Mappings dictionaries

# --------------------------
# Heart disease mappings
# --------------------------

heart_mappings = {
    "sex": {"Male": 1, "Female": 0},
    "cp": {
        "Typical Angina": 0,
        "Atypical Angina": 1,
        "Non-anginal Pain": 2,
        "Asymptomatic": 3,
    },
    "fbs": {"True": 1, "False": 0},
    "restecg": {
        "Normal": 0,
        "ST-T Wave Abnormality": 1,
        "Left Ventricular Hypertrophy": 2,
    },
    "exang": {"Yes": 1, "No": 0},
    "slope": {"Upsloping": 0, "Flat": 1, "Downsloping": 2},
    "thal": {
        "Normal": 1,
        "Fixed Defect": 2,
        "Reversible Defect": 3,
    },
}

# --------------------------
# Diabetes mappings (few categorical simplifications)
# --------------------------

diabetes_mappings = {
    # none categorical but allows default friendly labels if needed
    "Pregnancies": "Number of times pregnant",
    "Glucose": "Plasma glucose concentration",
    "BloodPressure": "Diastolic blood pressure (mm Hg)",
    "SkinThickness": "Triceps skin fold thickness (mm)",
    "Insulin": "2-Hour serum insulin (mu U/ml)",
    "BMI": "Body mass index",
    "DiabetesPedigreeFunction": "Diabetes pedigree function",
    "Age": "Age (years)",
}


diabetes_mappings = {
    "FamilyHistory": {"Yes": 1.0, "No": 0.0}
}
