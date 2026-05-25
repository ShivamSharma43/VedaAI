"use client";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

/* Step navigation footer — node 1:9372 (Previous / Next) */
export function FormNav({
  onPrevious,
  onNext,
  loading = false,
}: {
  onPrevious?: () => void;
  onNext?: () => void;
  loading?: boolean;
}) {
  return (
    <div className="fixed bottom-[96px] left-1/2 z-40 flex -translate-x-1/2 items-center gap-[13px] lg:static lg:left-auto lg:z-auto lg:w-full lg:max-w-[810px] lg:translate-x-0 lg:justify-between lg:gap-0">
      {/* Previous — Primary Button / White */}
      <button
        type="button"
        onClick={onPrevious}
        disabled={loading}
        className="flex items-center gap-[4px] rounded-[48px] bg-white px-[24px] py-[12px] disabled:opacity-60"
      >
        <ArrowLeft size={20} className="text-[#303030]" strokeWidth={2} />
        <span className="whitespace-nowrap text-center text-[16px] font-medium leading-[1.4] tracking-[-0.64px] text-[#303030]">
          Previous
        </span>
      </button>

      {/* Next — Primary Button / Dark */}
      <button
        type="button"
        onClick={onNext}
        disabled={loading}
        className="flex items-center gap-[4px] rounded-[48px] border-[1.5px] border-solid border-white/50 bg-[#181818] px-[24px] py-[12px] shadow-[0px_16px_24px_rgba(0,0,0,0.12),0px_32px_24px_rgba(0,0,0,0.2)] disabled:opacity-60 lg:shadow-none"
      >
        <span className="whitespace-nowrap text-center text-[16px] font-medium leading-[1.4] tracking-[-0.64px] text-white">
          {loading ? "Generating…" : "Next"}
        </span>
        {loading ? (
          <Loader2 size={20} className="animate-spin text-white" strokeWidth={2} />
        ) : (
          <ArrowRight size={20} className="text-white" strokeWidth={2} />
        )}
      </button>
    </div>
  );
}
