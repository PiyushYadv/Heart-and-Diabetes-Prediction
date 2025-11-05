import { useState } from "react";
import { motion } from "framer-motion";
import { adviceFor } from "../utils/advice";
import { predict } from "../api/api";
import { RiskMeter } from "../components/RiskMeter";
import { LoadingAnimation } from "../components/animations/LoadingAnimation";
import { SuccessAnimation } from "../components/animations/SuccessAnimation";
import { WarningAnimation } from "../components/animations/WarningAnimation";

const HEART_FIELDS = [
  { name: "age", label: "Age (years)", type: "number", required: true },
  {
    name: "sex",
    label: "Sex",
    type: "select",
    options: ["Male", "Female"],
    required: true,
  },
  {
    name: "cp",
    label: "Chest Pain Type",
    type: "select",
    options: [
      "Typical Angina",
      "Atypical Angina",
      "Non-anginal Pain",
      "Asymptomatic",
    ],
    required: true,
  },
  {
    name: "trestbps",
    label: "Resting BP (mm Hg)",
    type: "number",
    required: true,
  },
  {
    name: "chol",
    label: "Cholesterol (mg/dL)",
    type: "number",
    required: true,
  },
  {
    name: "fbs",
    label: "Fasting Blood Sugar > 120 mg/dL",
    type: "select",
    options: ["True", "False"],
  },
  {
    name: "restecg",
    label: "Resting ECG",
    type: "select",
    options: [
      "Normal",
      "ST-T Wave Abnormality",
      "Left Ventricular Hypertrophy",
    ],
  },
  { name: "thalach", label: "Max Heart Rate Achieved", type: "number" },
  {
    name: "exang",
    label: "Exercise Induced Angina",
    type: "select",
    options: ["Yes", "No"],
  },
  { name: "oldpeak", label: "ST Depression", type: "number" },
  {
    name: "slope",
    label: "Slope of Peak Exercise ST Segment",
    type: "select",
    options: ["Upsloping", "Flat", "Downsloping"],
  },
  { name: "ca", label: "Major Vessels Colored (0–3)", type: "number" },
  {
    name: "thal",
    label: "Thalassemia Type",
    type: "select",
    options: ["Normal", "Fixed Defect", "Reversible Defect"],
  },
];

export function HeartPredict() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await predict("heart", form);
      const pct = Math.round((data.probability ?? 0) * 100);
      const advice = adviceFor("heart", pct);
      setResult({ pct, prediction: data.prediction, advice });
    } catch (err) {
      alert(err?.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">
        🫀 Heart Disease Prediction
      </h1>

      {/* Form */}
      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4 card">
        {HEART_FIELDS.map((f) => (
          <label key={f.name} className="text-sm">
            <div className="mb-1 font-medium">
              {f.label} {f.required && <span className="text-red-500">*</span>}
            </div>

            {f.type === "select" ? (
              <select
                name={f.name}
                required={!!f.required}
                onChange={onChange}
                className="w-full border rounded-lg px-3 py-2"
                style={{
                  appearance: "none",
                  "background-image": `url(
                    'data:image/svg+xml;utf8,<svg fill="%23333" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
                  )`,
                  "background-repeat": "no-repeat",
                  "background-position": "right 0.75em center",
                  "background-size": "1em",
                  "padding-right": "2.5em",
                }}
              >
                <option value="">Select...</option>
                {f.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                name={f.name}
                type="number"
                step="any"
                required={!!f.required}
                onChange={onChange}
                className="w-full border rounded-lg px-3 py-2"
                placeholder={!f.required ? "Optional — auto-fill if blank" : ""}
              />
            )}
          </label>
        ))}

        <div className="md:col-span-2 mt-2 text-center">
          <button
            disabled={loading}
            className="btn text-white font-semibold"
            style={{ background: "#c0392b" }}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>
      </form>

      {/* Results */}
      <div className="mt-6 flex flex-col items-center">
        {loading && <LoadingAnimation />}

        {!loading && result && (
          <>
            <RiskMeter percent={result.pct} />
            {result.pct < 40 && <SuccessAnimation />}
            {result.pct >= 70 && <WarningAnimation />}

            <motion.p
              key={result.advice.tone}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`mt-4 text-center font-medium ${result.advice.color}`}
            >
              {result.advice.message}
            </motion.p>
          </>
        )}
      </div>
    </div>
  );
}
