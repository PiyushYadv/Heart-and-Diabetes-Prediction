import { useState } from "react";
import { motion } from "framer-motion";
import { predict } from "../api/api";
import { RiskMeter } from "../components/RiskMeter";

const HEART_FIELDS = [
  { name: "age", label: "Age", type: "number", required: true },
  {
    name: "sex",
    label: "Gender",
    type: "select",
    required: true,
    options: ["Male", "Female"],
  },
  {
    name: "cp",
    label: "Chest Pain Type",
    type: "select",
    required: true,
    options: [
      "Typical Angina",
      "Atypical Angina",
      "Non-anginal Pain",
      "Asymptomatic",
    ],
  },
  {
    name: "trestbps",
    label: "Resting Blood Pressure (mm Hg)",
    type: "number",
    required: true,
  },
  {
    name: "chol",
    label: "Cholesterol (mg/dl)",
    type: "number",
    required: true,
  },
  {
    name: "fbs",
    label: "Fasting Blood Sugar > 120 mg/dl",
    type: "select",
    required: true,
    options: ["True", "False"],
  },
  {
    name: "restecg",
    label: "Resting ECG",
    type: "select",
    required: true,
    options: ["Normal", "ST-T Abnormality", "Left Ventricular Hypertrophy"],
  },
  { name: "thalach", label: "Max Heart Rate", type: "number" },
  {
    name: "exang",
    label: "Exercise-induced Angina",
    type: "select",
    required: true,
    options: ["Yes", "No"],
  },
  { name: "oldpeak", label: "ST Depression (oldpeak)", type: "number" },
  {
    name: "slope",
    label: "Slope of Peak Exercise ST",
    type: "select",
    required: true,
    options: ["Upsloping", "Flat", "Downsloping"],
  },
  { name: "ca", label: "Major Vessels (0-3)", type: "number" },
  {
    name: "thal",
    label: "Thalassemia",
    type: "select",
    required: true,
    options: ["Normal", "Fixed Defect", "Reversible Defect"],
  },
];

// 💬 Dynamic advice messages
const adviceFor = (pct) => {
  if (pct >= 90)
    return {
      level: "danger",
      text: "⚠️ Very high risk. Seek emergency care immediately.",
    };
  if (pct >= 70)
    return {
      level: "warn",
      text: "⚠️ High risk. Consult a cardiologist as soon as possible.",
    };
  if (pct >= 40)
    return {
      level: "caution",
      text: "⚠️ Moderate risk. Consider lifestyle changes and medical screening.",
    };
  return {
    level: "ok",
    text: "✅ Low risk. Maintain a healthy lifestyle and regular check-ups.",
  };
};

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
      console.log(data);
      const pct = Math.round((data.probability ?? 0) * 100);
      const advice = adviceFor(pct);
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
        🫀 Heart Disease Risk Prediction
      </h1>

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
              >
                <option value="">Select</option>
                {f.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
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

        <div className="md:col-span-2 mt-2">
          <button disabled={loading} className="btn btn-primary">
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 grid md:grid-cols-3 gap-6"
        >
          <div className="card flex items-center justify-center">
            <RiskMeter percent={result.pct} color="#c0392b" />
          </div>

          <div className="card md:col-span-2">
            <div className="text-sm text-slate-500">System Assessment</div>
            <div className="text-xl font-semibold mt-1">
              {result.prediction} ({result.pct}%)
            </div>
            <p className="mt-2 text-slate-700">{result.advice.text}</p>
            <p className="mt-3 text-xs text-slate-500">
              Note: This tool is informational and not a medical diagnosis.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
