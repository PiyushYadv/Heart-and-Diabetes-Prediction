# Mappings dictionaries

heart_mappings = {
    "sex": {"Male": 1, "Female": 0},
    "cp": {
        "Typical Angina": 0,
        "Atypical Angina": 1,
        "Non-anginal Pain": 2,
        "Asymptomatic": 3
    },
    "fbs": {"True": 1, "False": 0},
    "restecg": {
        "Normal": 0,
        "ST-T Abnormality": 1,
        "Left Ventricular Hypertrophy": 2
    },
    "exang": {"Yes": 1, "No": 0},
    "slope": {"Upsloping": 0, "Flat": 1, "Downsloping": 2},
    "thal": {"Normal": 1, "Fixed Defect": 2, "Reversible Defect": 3}
}

diabetes_mappings = {
    "FamilyHistory": {"Yes": 1.0, "No": 0.0}
}
