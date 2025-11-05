export function adviceFor(disease, percent) {
  const riskColors = {
    safe: "text-emerald-500 dark:text-emerald-400",
    low: "text-green-500 dark:text-green-400",
    moderate: "text-amber-500 dark:text-amber-400", // intermediate
    high: "text-orange-600 dark:text-orange-400",
    critical: "text-red-600 dark:text-red-400",
  };

  let advice = { message: "", color: riskColors.safe, tone: "safe" };

  if (percent >= 90) {
    advice = {
      message:
        disease === "heart"
          ? "🚨 Extremely high risk of heart complications! Please visit a cardiologist immediately."
          : "🚨 Extremely high diabetes risk! Visit your doctor for immediate diagnosis and testing.",
      color: riskColors.critical,
      tone: "critical",
    };
  } else if (percent >= 70) {
    advice = {
      message:
        disease === "heart"
          ? "⚠️ High risk — chest pain, breathlessness, or fatigue should not be ignored. Get an ECG check soon."
          : "⚠️ High diabetes risk — get your fasting glucose tested and adopt low-sugar diet immediately.",
      color: riskColors.high,
      tone: "high",
    };
  } else if (percent >= 40) {
    advice = {
      message:
        disease === "heart"
          ? "🟠 Moderate risk — maintain a balanced diet, exercise daily, and monitor cholesterol regularly."
          : "🟠 Moderate risk — reduce refined sugar and manage weight with regular exercise.",
      color: riskColors.moderate,
      tone: "moderate",
    };
  } else if (percent >= 20) {
    advice = {
      message:
        disease === "heart"
          ? "🟢 Low risk — keep your heart healthy with daily walks and less processed food."
          : "🟢 Low diabetes risk — continue a healthy routine with fiber-rich meals and hydration.",
      color: riskColors.low,
      tone: "low",
    };
  } else {
    advice = {
      message:
        disease === "heart"
          ? "✅ Excellent! Your heart appears in good condition. Maintain your healthy habits."
          : "✅ Excellent! Very low diabetes risk. Continue regular exercise and balanced nutrition.",
      color: riskColors.safe,
      tone: "safe",
    };
  }

  return advice;
}
