// src/pages/Index.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { MetricCard } from "../components/MetricCard";

const heartAwareness = [
  "Chest discomfort, shortness of breath, and fatigue are warning signs.",
  "Quit smoking: risk drops dramatically within one year.",
  "30 minutes of brisk walking daily improves heart health.",
];

const diabetesAwareness = [
  "Early symptoms include frequent urination and excessive thirst.",
  "Healthy BMI and diet can prevent Type 2 diabetes.",
  "Regular HbA1c checks help monitor long-term glucose control.",
];

// Mock awareness data (you can replace with Flask /data API later)
const heartBreakdown = [
  { name: "No Disease", value: 55 },
  { name: "Disease", value: 45 },
];
const diabetesBreakdown = [
  { name: "Non-Diabetic", value: 65 },
  { name: "Diabetic", value: 35 },
];
const COLORS = ["#22c55e", "#ef4444"];

const riskFactors = [
  { factor: "High BP", heart: 70, diabetes: 40 },
  { factor: "High Cholesterol", heart: 65, diabetes: 20 },
  { factor: "Obesity", heart: 55, diabetes: 60 },
  { factor: "Sedentary", heart: 50, diabetes: 45 },
];

export function Index() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Heart Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h2 className="text-xl font-semibold mb-2">
            🫀 Heart Disease Awareness
          </h2>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={heartBreakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={80}
                >
                  {heartBreakdown.map((e, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="list-disc ml-5 text-sm text-slate-600 space-y-1">
            {heartAwareness.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <Link to="/heart" className="btn btn-primary">
              Predict Heart Risk
            </Link>
          </div>
        </motion.div>

        {/* Diabetes Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h2 className="text-xl font-semibold mb-2">💉 Diabetes Awareness</h2>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={diabetesBreakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={80}
                >
                  {diabetesBreakdown.map((e, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="list-disc ml-5 text-sm text-slate-600 space-y-1">
            {diabetesAwareness.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <Link
              to="/diabetes"
              className="btn"
              style={{ backgroundColor: "#16a085" }}
            >
              Predict Diabetes Risk
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Combined Risk Factors */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-3">Common Risk Factors</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={riskFactors}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="factor" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="heart" name="Heart" fill="#c0392b" />
              <Bar dataKey="diabetes" name="Diabetes" fill="#16a085" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Health Tips */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <MetricCard
          title="Check-ups / year"
          value="2+"
          sub="Regular screenings help early detection"
        />
        <MetricCard
          title="Exercise / week"
          value="150 min"
          sub="WHO recommends moderate activity"
        />
        <MetricCard
          title="Diet"
          value="Low sugar & sodium"
          sub="Focus on whole foods"
        />
      </div>
    </div>
  );
}
