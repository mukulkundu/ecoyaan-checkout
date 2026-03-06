"use client";
import { useRouter } from "next/navigation";

export default function StickyFooter({ onNext, nextLabel = "Continue", nextDisabled = false, backHref }) {
  const router = useRouter();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
      <div className="max-w-lg mx-auto px-4 py-4 flex gap-3">
        {backHref && (
          <button
            onClick={() => router.push(backHref)}
            className="flex cursor-pointer items-center gap-2 px-5 py-3 rounded-xl border border-neutral-200 text-sm font-medium text-neutral-600 hover:bg-neutral-50 active:scale-95 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className="flex-1 cursor-pointer bg-emerald-600 hover:bg-emerald-700 disabled:bg-neutral-200 disabled:text-neutral-400 text-white py-3 px-4 rounded-xl text-sm font-semibold transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm"
        >
          {nextLabel}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}