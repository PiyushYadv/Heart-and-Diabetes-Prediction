import { useState } from "react";
import { motion } from "framer-motion";
import { adviceFor } from "../utils/advice";
import { predict } from "../api/api";
import { RiskMeter } from "../components/RiskMeter";
import { LoadingAnimation } from "../components/animations/LoadingAnimation";
import { SuccessAnimation } from "../components/animations/SuccessAnimation";
import { WarningAnimation } from "../components/animations/WarningAnimation";

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
      const advice = adviceFor("diabetes", pct);
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
        <div className="md:col-span-2 mt-2 text-center">
          <button disabled={loading} className="btn bg-amber-400">
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>
      </form>

      {/* --- Result Section --- */}
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
