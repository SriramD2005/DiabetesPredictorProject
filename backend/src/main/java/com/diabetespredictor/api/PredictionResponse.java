package com.diabetespredictor.api;

public record PredictionResponse(
        int prediction,
        String diagnosis,
        double probability,
        String message
) {
}
