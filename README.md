# Diabetes Prediction System for Women

A full-stack Machine Learning web application that predicts whether a woman is diabetic or not using the **Pima Indians Diabetes Dataset** and a **Multi-Layer Perceptron (MLP)** model.

The application allows users to enter medical parameters through a React frontend, sends the data to a Spring Boot backend, performs ML inference using a Python FastAPI service, and returns the prediction result.

---

# Tech Stack

## Frontend
- React.js
- Axios
- CSS

## Backend
- Spring Boot
- REST API

## Machine Learning
- Python
- Scikit-learn
- MLPClassifier
- Pandas
- NumPy

## Model Serving
- FastAPI
- Uvicorn

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
FastAPI ML Service
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
│   └── app.py                 # FastAPI Inference Server
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

# How to Run the Project

## Clone Repository

```bash
git clone https://github.com/your-username/diabetes-predictor.git
cd diabetes-predictor
```

---

## Run ML FastAPI Server

### Install Dependencies

```bash
pip install fastapi uvicorn scikit-learn pandas numpy joblib
```

### Start Server

```bash
cd ml-model
uvicorn app:app --reload --port 8000
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

# API Endpoint

## Predict Diabetes

```http
POST /api/diabetes/predict
```

### Request Body

```json
{
  "pregnancies": 2,
  "glucose": 120,
  "bloodPressure": 70,
  "skinThickness": 20,
  "insulin": 85,
  "bmi": 25.5,
  "diabetesPedigreeFunction": 0.5,
  "age": 33
}
```

### Response

```json
{
  "result": "Not Diabetic"
}
```

---

# Model Performance

| Metric | Score |
|---|---|
| Accuracy | ~75% to 80% |
| Model | MLPClassifier |

---

# Features

- Full-stack ML integration
- React form-based UI
- Spring Boot REST API
- FastAPI model serving
- Real-time diabetes prediction
- Clean architecture
- Data preprocessing pipeline
- Scalable backend design

---

# Future Improvements

- User authentication with JWT
- Prediction history storage
- MySQL integration
- Dashboard analytics
- Docker deployment
- Cloud deployment (AWS / Render)
- Model improvement with hyperparameter tuning

---

# Dataset Reference

Pima Indians Diabetes Dataset from the National Institute of Diabetes and Digestive and Kidney Diseases.

---

# Author

Developed as a Machine Learning + Full Stack project using React, Spring Boot, and Python ML integration.
