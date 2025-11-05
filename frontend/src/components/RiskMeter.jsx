import { motion } from "framer-motion";

export function RiskMeter({ percent = 0, size = 140 }) {
  const radius = 60;
  const stroke = 12;
  const C = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));
  const dash = (clamped / 100) * C;

  // ✅ Dynamic gradient-based color logic
  function getRiskColor(pct) {
    if (pct < 20) return "#10b981"; // emerald-500
    if (pct < 40) return "#22c55e"; // green-500
    if (pct < 70) return "#f59e0b"; // amber-500
    if (pct < 90) return "#ea580c"; // orange-600
    return "#dc2626"; // red-600
  }

  const color = getRiskColor(clamped);

  return (
    <div className="relative inline-flex" style={{ width: size, height: size }}>
      {/* Background ring */}
      <svg width={size} height={size} viewBox="0 0 160 160">
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${C - dash}`}
          transform="rotate(-90 80 80)"
          initial={{ strokeDasharray: `0 ${C}` }}
          animate={{ strokeDasharray: `${dash} ${C - dash}` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="text-2xl font-bold">{clamped}%</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            risk level
          </div>
        </motion.div>
      </div>
    </div>
  );
}
