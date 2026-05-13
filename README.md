# Diabetes Predictor

Full-stack diabetes prediction project for women using the Pima Indian Diabetes dataset fields.

- Frontend: React.js with Vite
- Backend: Spring Boot with Gradle
- Model: sklearn MLP pipeline loaded from `diabetes_mlp_model.pkl`
- Inference bridge: Spring Boot calls `model/predict.py`

## Input Parameters

The app accepts all eight Pima Indian Diabetes dataset parameters:

1. Pregnancies
2. Glucose
3. Blood pressure
4. Skin thickness
5. Insulin
6. BMI
7. Diabetes pedigree function
8. Age

## Setup

Install Python model dependencies:

```powershell
cd C:\coding\DiabetesPredictor
python -m pip install -r model\requirements.txt
```

Run the Spring Boot backend:

```powershell
cd C:\coding\DiabetesPredictor\backend
gradle bootRun
```

Run the React frontend:

```powershell
cd C:\coding\DiabetesPredictor\frontend
npm.cmd install
npm.cmd run dev
```

Open the frontend at:

```text
http://localhost:5173
```

The backend API runs at:

```text
http://localhost:8080/api/predict
```

## Example API Request

```powershell
Invoke-RestMethod -Uri http://localhost:8080/api/predict `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"pregnancies":6,"glucose":148,"bloodPressure":72,"skinThickness":35,"insulin":0,"bmi":33.6,"diabetesPedigreeFunction":0.627,"age":50}'
```

## Notes

This is a prediction support tool, not a medical diagnosis. The UI and API message remind users to consult a clinician for confirmation.
