package com.diabetespredictor.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class PredictionService {
    private static final Duration MODEL_TIMEOUT = Duration.ofSeconds(20);

    private final ObjectMapper objectMapper;
    private final String pythonCommand;
    private final Path modelScript;
    private final Path modelFile;

    public PredictionService(
            ObjectMapper objectMapper,
            @Value("${diabetes.python.command}") String pythonCommand,
            @Value("${diabetes.model.script}") String modelScript,
            @Value("${diabetes.model.file}") String modelFile
    ) {
        this.objectMapper = objectMapper;
        this.pythonCommand = pythonCommand;
        this.modelScript = Path.of(modelScript).toAbsolutePath().normalize();
        this.modelFile = Path.of(modelFile).toAbsolutePath().normalize();
    }

    public PredictionResponse predict(PredictionRequest request) {
        validate(request);

        List<String> command = new ArrayList<>();
        command.add(pythonCommand);
        command.add(modelScript.toString());
        command.add(modelFile.toString());
        command.add(Double.toString(request.pregnancies()));
        command.add(Double.toString(request.glucose()));
        command.add(Double.toString(request.bloodPressure()));
        command.add(Double.toString(request.skinThickness()));
        command.add(Double.toString(request.insulin()));
        command.add(Double.toString(request.bmi()));
        command.add(Double.toString(request.diabetesPedigreeFunction()));
        command.add(Double.toString(request.age()));

        try {
            Process process = new ProcessBuilder(command)
                    .redirectErrorStream(true)
                    .start();

            String output;
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
                output = reader.lines().reduce("", (left, right) -> left + right);
            }

            boolean finished = process.waitFor(MODEL_TIMEOUT.toSeconds(), TimeUnit.SECONDS);
            if (!finished) {
                process.destroyForcibly();
                throw new PredictionException("Model inference timed out.");
            }

            if (process.exitValue() != 0) {
                throw new PredictionException("Model inference failed: " + output);
            }

            JsonNode json = objectMapper.readTree(output);
            int prediction = json.get("prediction").asInt();
            double probability = json.get("probability").asDouble();
            String diagnosis = prediction == 1 ? "Diabetes likely" : "Diabetes unlikely";
            String message = prediction == 1
                    ? "The model predicts signs associated with diabetes. Please consult a clinician for confirmation."
                    : "The model predicts no diabetes indication from these values. Keep monitoring health with a clinician.";

            return new PredictionResponse(prediction, diagnosis, probability, message);
        } catch (IOException e) {
            throw new PredictionException("Could not run model inference. Check Python and model dependencies.", e);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new PredictionException("Model inference was interrupted.", e);
        }
    }

    private void validate(PredictionRequest request) {
        if (request.glucose() < 0 || request.bloodPressure() < 0 || request.skinThickness() < 0
                || request.insulin() < 0 || request.bmi() < 0 || request.age() < 0
                || request.diabetesPedigreeFunction() < 0 || request.pregnancies() < 0) {
            throw new PredictionException("All input values must be zero or positive.");
        }
    }
}
