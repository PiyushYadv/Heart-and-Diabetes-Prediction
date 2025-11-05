import { Routes, Route, Link, NavLink } from "react-router-dom";
import { Index } from "./pages/Index";
import { HeartPredict } from "./pages/HeartPredict";
import { DiabetesPredict } from "./pages/DiabetesPredict";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold text-xl">
            HealthPredict
          </Link>

          <div className="flex gap-2">
            <NavLink
              to="/heart"
              className={({ isActive }) =>
                `btn ${isActive ? "bg-heart text-white" : "btn-ghost"}`
              }
            >
              Heart
            </NavLink>
            <NavLink
              to="/diabetes"
              className={({ isActive }) =>
                `btn ${isActive ? "bg-diabetes text-white" : "btn-ghost"}`
              }
            >
              Diabetes
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Route Setup */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/heart" element={<HeartPredict />} />
        <Route path="/diabetes" element={<DiabetesPredict />} />
      </Routes>
    </div>
  );
}
