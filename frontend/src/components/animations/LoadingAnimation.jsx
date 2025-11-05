import { motion } from "framer-motion";

export function LoadingAnimation({ message = "Analyzing your data..." }) {
  const dots = Array.from({ length: 3 });

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="flex space-x-2">
        {dots.map((_, i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded-full bg-blue-500"
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <p className="mt-3 text-slate-600 dark:text-slate-300 font-medium">
        {message}
      </p>
    </div>
  );
}
