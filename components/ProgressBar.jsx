"use client";
const steps = ["Cart", "Shipping", "Payment"];

export default function ProgressBar({ current }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition-all duration-200
              ${i < current
                ? "bg-emerald-600 border-emerald-600 text-white"
                : i === current
                ? "bg-white border-emerald-600 text-emerald-600"
                : "bg-white border-neutral-300 text-neutral-400"
              }`}>
              {i < current ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : i + 1}
            </div>
            <span className={`text-xs font-medium ${i === current ? "text-emerald-600" : i < current ? "text-neutral-600" : "text-neutral-400"}`}>
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-16 sm:w-24 h-px mx-2 mb-5 transition-all duration-300 ${i < current ? "bg-emerald-600" : "bg-neutral-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}