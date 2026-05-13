package com.diabetespredictor.api;

public record PredictionRequest(
        double pregnancies,
        double glucose,
        double bloodPressure,
        double skinThickness,
        double insulin,
        double bmi,
        double diabetesPedigreeFunction,
        double age
) {
}
