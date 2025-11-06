import { motion } from "framer-motion";

export function WarningAnimation({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        style={{ "background-color": "#dc2626" }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="white"
          className="w-8 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M10.29 3.86L1.82 18a1 1 0 00.86 1.5h18.64a1 1 0 00.86-1.5L13.71 3.86a1 1 0 00-1.72 0z"
          />
        </motion.svg>
      </motion.div>

      {message && (
        <motion.p
          className="mt-4 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ color: "#dc2626" }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}
