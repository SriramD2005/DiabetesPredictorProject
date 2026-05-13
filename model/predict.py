import json
import sys

import joblib
import pandas as pd


FEATURES = [
    "pregnancies",
    "glucose",
    "blood_pressure",
    "skin_thickness",
    "insulin",
    "bmi",
    "diabetes_pedigree_function",
    "age",
]


def main() -> int:
    if len(sys.argv) != 10:
        print(
            json.dumps(
                {
                    "error": "Usage: predict.py <model_path> pregnancies glucose blood_pressure "
                    "skin_thickness insulin bmi diabetes_pedigree_function age"
                }
            )
        )
        return 2

    model_path = sys.argv[1]
    values = [float(value) for value in sys.argv[2:]]

    model = joblib.load(model_path)
    sample = pd.DataFrame([values], columns=FEATURES)

    prediction = int(model.predict(sample)[0])
    probability = None
    if hasattr(model, "predict_proba"):
        probability = float(model.predict_proba(sample)[0][1])

    print(
        json.dumps(
            {
                "prediction": prediction,
                "probability": probability if probability is not None else float(prediction),
            }
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
