import { Routes, Route, Link, NavLink } from "react-router-dom";
import { Index } from "./pages/Index";
import { HeartPredict } from "./pages/HeartPredict";
import { DiabetesPredict } from "./pages/DiabetesPredict";

export default function App() {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold text-xl text-blue-950">
            <img src="image.png" className="w-10 p-1 m-auto" />
            HealthPredict
          </Link>

          <div className="flex gap-2">
            <NavLink
              to="/heart"
              className={({ isActive }) =>
                `btn ${isActive ? "bg-[#c0392b] text-white" : "btn-ghost"}`
              }
            >
              Heart
            </NavLink>
            <NavLink
              to="/diabetes"
              className={({ isActive }) =>
                `btn ${isActive ? "bg-amber-400 text-white" : "btn-ghost"}`
              }
            >
              Diabetes
            </NavLink>
          </div>
        </div>
      </nav>
      <div className="m-auto bg-black text-gray-50 text-xs px-1 py-1 text-center">
        <p>By- Prajjwal Bhardwaj , Piyush Yadav , Piyush Raj</p>
      </div>

      {/* Route Setup */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/heart" element={<HeartPredict />} />
        <Route path="/diabetes" element={<DiabetesPredict />} />
      </Routes>

      <footer className="mt-10 bg-black py-6 border-t border-slate-200 text-center text-sm text-slate-300">
        &copy; 2025 HealthPredict. All rights reserved.
      </footer>
    </div>
  );
}
