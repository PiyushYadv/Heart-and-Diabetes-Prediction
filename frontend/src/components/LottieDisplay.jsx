import Lottie from "lottie-react";

export function LottieDisplay({ animation, text }) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Lottie
        animationData={animation}
        loop={true}
        style={{ width: 180, height: 180 }}
      />
      {text && (
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">
          {text}
        </p>
      )}
    </div>
  );
}
