import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Activity, HeartPulse, Loader2, RotateCcw, Send } from "lucide-react";
import "./styles.css";

const API_URL = "http://localhost:8080/api/predict";

const fields = [
  { name: "pregnancies", label: "Pregnancies", step: "1", placeholder: "6" },
  { name: "glucose", label: "Glucose", unit: "mg/dL", placeholder: "148" },
  { name: "bloodPressure", label: "Blood pressure", unit: "mm Hg", placeholder: "72" },
  { name: "skinThickness", label: "Skin thickness", unit: "mm", placeholder: "35" },
  { name: "insulin", label: "Insulin", unit: "mu U/mL", placeholder: "0" },
  { name: "bmi", label: "BMI", step: "0.1", placeholder: "33.6" },
  {
    name: "diabetesPedigreeFunction",
    label: "Diabetes pedigree function",
    step: "0.001",
    placeholder: "0.627",
  },
  { name: "age", label: "Age", unit: "years", step: "1", placeholder: "50" },
];

const emptyForm = Object.fromEntries(fields.map((field) => [field.name, ""]));

function App() {
  const [form, setForm] = useState(emptyForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isComplete = useMemo(
    () => fields.every((field) => form[field.name] !== "" && Number(form[field.name]) >= 0),
    [form]
  );

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
    setResult(null);
    setError("");
  }

  function resetForm() {
    setForm(emptyForm);
    setResult(null);
    setError("");
  }

  async function submitPrediction(event) {
    event.preventDefault();
    if (!isComplete) {
      setError("Enter zero or positive values for every parameter.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = Object.fromEntries(
        Object.entries(form).map(([key, value]) => [key, Number(value)])
      );
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Prediction failed.");
      }
      setResult(data);
    } catch (requestError) {
      setError(requestError.message || "Could not connect to the backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app-shell">
      <section className="intro">
        <div className="brand-row">
          <span className="brand-mark">
            <HeartPulse size={24} />
          </span>
          <span>Women diabetes diagnosis support</span>
        </div>
        <h1>Pima Indian Diabetes Predictor</h1>
        <p>
          Enter the eight clinical parameters used by the Pima Indian diabetes dataset and get an
          MLP model prediction from the Spring Boot backend.
        </p>
      </section>

      <section className="workspace">
        <form className="input-panel" onSubmit={submitPrediction}>
          <div className="panel-heading">
            <Activity size={22} />
            <div>
              <h2>Patient parameters</h2>
              <p>All values should be zero or positive.</p>
            </div>
          </div>

          <div className="field-grid">
            {fields.map((field) => (
              <label className="field" key={field.name}>
                <span>
                  {field.label}
                  {field.unit ? <small>{field.unit}</small> : null}
                </span>
                <input
                  type="number"
                  min="0"
                  step={field.step || "0.01"}
                  value={form[field.name]}
                  placeholder={field.placeholder}
                  onChange={(event) => updateField(field.name, event.target.value)}
                />
              </label>
            ))}
          </div>

          {error ? <div className="error">{error}</div> : null}

          <div className="actions">
            <button type="button" className="secondary" onClick={resetForm} title="Reset form">
              <RotateCcw size={18} />
              Reset
            </button>
            <button type="submit" disabled={loading || !isComplete}>
              {loading ? <Loader2 className="spin" size={18} /> : <Send size={18} />}
              Predict
            </button>
          </div>
        </form>

        <aside className={`result-panel ${result?.prediction === 1 ? "risk" : ""}`}>
          <span className="result-label">Model output</span>
          {result ? (
            <>
              <strong>{result.diagnosis}</strong>
              <div className="score">
                <span>Diabetes probability</span>
                <b>{Math.round(result.probability * 100)}%</b>
              </div>
              <p>{result.message}</p>
            </>
          ) : (
            <>
              <strong>Awaiting prediction</strong>
              <p>The backend will run the trained MLP model after the form is submitted.</p>
            </>
          )}
        </aside>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
