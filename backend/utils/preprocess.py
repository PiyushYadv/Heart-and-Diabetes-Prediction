# Preprocessing

import numpy as np
import pandas as pd

def prepare_input(data, columns, mappings, means, scaler):
    """
    Convert form data to correct numeric vector, apply mappings,
    fill missing values with dataset means, and scale.
    """
    processed = {}
    for col in columns:
        val = data.get(col, "")
        if col in mappings and val in mappings[col]:
            processed[col] = mappings[col][val]
        elif val == "" or val is None:
            processed[col] = means[col]
        else:
            processed[col] = float(val)

    df = pd.DataFrame([processed], columns=columns)
    scaled = scaler.transform(df)
    return scaled
