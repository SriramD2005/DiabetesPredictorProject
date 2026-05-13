# Diabetes Prediction System for Women

A full-stack Machine Learning web application that predicts whether a woman is diabetic or not using the **Pima Indians Diabetes Dataset** and a **Multi-Layer Perceptron (MLP)** model.

The application allows users to enter medical parameters through a React frontend, sends the data to a Spring Boot backend, performs ML inference using a trained Python model, and returns the prediction result.

---

# Tech Stack

## Frontend
- React.js
- CSS

## Backend
- Spring Boot
- REST API
- Java ProcessBuilder

## Machine Learning
- Python
- Scikit-learn
- MLPClassifier
- Pandas
- NumPy

---

# Machine Learning Model

The prediction model is trained using:

- **Dataset:** Pima Indians Diabetes Dataset
- **Algorithm:** Multi-Layer Perceptron (MLP)
- **Framework:** Scikit-learn

The notebook includes:

- Data Cleaning
- Missing Value Handling
- Feature Scaling
- Train-Test Split
- Model Training
- Evaluation
- Model Serialization using `joblib`

---

# Project Architecture

```text
React Frontend
       ↓
Spring Boot Backend
       ↓
Python ML Script
       ↓
MLP Model Prediction
```

---

# Project Structure

```text
diabetes-predictor/

├── frontend/                  # React Frontend
│
├── backend/                   # Spring Boot Backend
│
├── ml-model/
│   ├── notebook.ipynb         # Training Notebook
│   ├── diabetes_mlp_model.pkl
│   └── predict.py             # Python Inference Script
│
└── README.md
```

---

# Input Parameters

The system uses the following medical parameters:

| Parameter | Description |
|---|---|
| Pregnancies | Number of pregnancies |
| Glucose | Glucose level |
| Blood Pressure | Blood pressure value |
| Skin Thickness | Skin fold thickness |
| Insulin | Insulin level |
| BMI | Body Mass Index |
| Diabetes Pedigree Function | Genetic diabetes score |
| Age | Age of the patient |

---

# Backend Inference Flow

The Spring Boot backend directly invokes the Python inference script using Java `ProcessBuilder`.

The backend:

1. Receives request data from React frontend
2. Validates all medical inputs
3. Executes the Python prediction script
4. Passes all feature values as command-line arguments
5. Reads JSON prediction output from Python
6. Returns prediction response to frontend

---

# Prediction Response

The backend returns:

- Prediction value
- Diagnosis result
- Prediction probability
- Medical guidance message

Example:

```json
{
  "prediction": 1,
  "diagnosis": "Diabetes likely",
  "probability": 0.87,
  "message": "The model predicts signs associated with diabetes. Please consult a clinician for confirmation."
}
```

---

# How to Run the Project

## Clone Repository

```bash
git clone https://github.com/your-username/diabetes-predictor.git
cd diabetes-predictor
```

---

## Install Python Dependencies

```bash
pip install pandas numpy scikit-learn joblib
```

---

## Run Spring Boot Backend

```bash
cd backend
./gradlew bootRun
```

Backend runs on:

```text
http://localhost:8080
```

---

## Run React Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---


# Features

- Full-stack ML integration
- React form-based UI
- Spring Boot REST API
- Python model inference integration
- Real-time diabetes prediction
- Data preprocessing pipeline
- Probability-based prediction response
- Input validation
- Timeout handling for model inference
- Clean layered backend architecture

---

# Future Improvements

- User authentication with JWT
- Prediction history storage
- MySQL integration
- Dashboard analytics
- Docker deployment
- Cloud deployment
- Improved model tuning

---

# Dataset Reference

Pima Indians Diabetes Dataset from the National Institute of Diabetes and Digestive and Kidney Diseases.

---

# Author

Sriram D
