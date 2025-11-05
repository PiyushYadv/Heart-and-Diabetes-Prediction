import { useState } from "react";
import { motion } from "framer-motion";
import { predict } from "../api/api";
import { RiskMeter } from "../components/RiskMeter";

const DIAB_FIELDS = [
  {
    name: "Pregnancies",
    label: "Number of Pregnancies",
    type: "number",
    required: true,
  },
  { name: "Glucose", label: "Glucose (mg/dL)", type: "number", required: true },
  { name: "BloodPressure", label: "Blood Pressure (mm Hg)", type: "number" },
  { name: "SkinThickness", label: "Skin Thickness (mm)", type: "number" },
  { name: "Insulin", label: "Insulin (µU/mL)", type: "number" },
  { name: "BMI", label: "BMI", type: "number", required: true },
  {
    name: "DiabetesPedigreeFunction",
    label: "Diabetes Pedigree Function",
    type: "number",
  },
  { name: "Age", label: "Age (years)", type: "number", required: true },
];

// 🩺 Risk-based advice logic
const adviceFor = (pct) => {
  if (pct >= 90)
    return {
      level: "danger",
      text: "⚠️ Very high likelihood. Please visit a healthcare professional immediately.",
    };
  if (pct >= 70)
    return {
      level: "warn",
      text: "⚠️ High risk. Schedule a check-up with your doctor soon.",
    };
  if (pct >= 40)
    return {
      level: "caution",
      text: "⚠️ Moderate risk. Watch your diet and exercise regularly.",
    };
  return {
    level: "ok",
    text: "✅ Low risk. Maintain healthy habits and regular blood sugar tests.",
  };
};

export function DiabetesPredict() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await predict("diabetes", form);
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
        💉 Diabetes Risk Prediction
      </h1>

      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4 card">
        {DIAB_FIELDS.map((f) => (
          <label key={f.name} className="text-sm">
            <div className="mb-1 font-medium">
              {f.label} {f.required && <span className="text-red-500">*</span>}
            </div>
            <input
              name={f.name}
              type="number"
              step="any"
              required={!!f.required}
              onChange={onChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder={!f.required ? "Optional — auto-fill if blank" : ""}
            />
          </label>
        ))}
        <div className="md:col-span-2 mt-2">
          <button
            disabled={loading}
            className="btn"
            style={{ background: "#16a085" }}
          >
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
            <RiskMeter percent={result.pct} color="#16a085" />
          </div>

          <div className="card md:col-span-2">
            <div className="text-sm text-slate-500">System Assessment</div>
            <div className="text-xl font-semibold mt-1">
              {result.prediction} ({result.pct}%)
            </div>
            <p className="mt-2 text-slate-700">{result.advice.text}</p>
            <p className="mt-3 text-xs text-slate-500">
              Note: This tool is for informational purposes only, not a medical
              diagnosis.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
