import React from "react";

interface SkeletonCardProps {
  view?: "grid" | "list";
}

/* ── Pulse animation class ── */
const pulse = "animate-pulse bg-slate-200 rounded-lg";

/* ── Shared shimmer bar ── */
const Bar = ({ className = "" }: { className?: string }) => (
  <div className={`${pulse} ${className}`} />
);

/* ── Grid skeleton card ── */
const GridSkeleton = () => (
  <div className="card-premium overflow-hidden flex flex-col">
    {/* Image */}
    <div className="relative h-52 overflow-hidden">
      <Bar className="h-full w-full rounded-none" />
    </div>
    {/* Content */}
    <div className="flex flex-col flex-1 p-5 gap-3">
      <Bar className="h-5 w-3/4" />
      <Bar className="h-3 w-1/2" />
      <div className="flex-1 space-y-2 mt-1">
        <Bar className="h-3 w-full" />
        <Bar className="h-3 w-5/6" />
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
        <Bar className="h-3 w-24" />
        <Bar className="h-3 w-16" />
      </div>
    </div>
  </div>
);

/* ── List skeleton card ── */
const ListSkeleton = () => (
  <div className="card-premium overflow-hidden flex flex-row">
    <div className="w-48 h-44 shrink-0">
      <Bar className="h-full w-full rounded-none" />
    </div>
    <div className="flex-1 p-5 flex flex-col justify-between gap-2">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <Bar className="h-5 w-2/3" />
          <Bar className="h-5 w-16" />
        </div>
        <Bar className="h-3 w-1/3" />
        <div className="space-y-2 mt-2">
          <Bar className="h-3 w-full" />
          <Bar className="h-3 w-4/5" />
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
        <Bar className="h-3 w-20" />
        <Bar className="h-3 w-14" />
      </div>
    </div>
  </div>
);

/* ── Main skeleton that switches on view ── */
const SkeletonCard = ({ view = "grid" }: SkeletonCardProps) => {
  return view === "grid" ? <GridSkeleton /> : <ListSkeleton />;
};

export default SkeletonCard;
