import React from "react";

const pulse = "animate-pulse bg-slate-200 rounded-lg";

const Bar = ({ className = "" }: { className?: string }) => (
  <div className={`${pulse} ${className}`} />
);

const BookingSkeletonCard = () => (
  <div className="card-premium overflow-hidden flex flex-col md:flex-row">
    {/* Image */}
    <div className="relative w-full md:w-64 h-56 md:h-auto shrink-0 overflow-hidden">
      <Bar className="h-full w-full rounded-none" />
    </div>
    {/* Details */}
    <div className="flex-1 p-6 flex flex-col justify-between gap-4">
      <div className="space-y-4">
        <Bar className="h-6 w-2/3" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Bar key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
      {/* Actions */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex gap-3">
          <Bar className="h-9 w-24 rounded-xl" />
          <Bar className="h-9 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  </div>
);

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <Bar className="h-10 w-48 mb-2" />
          <Bar className="h-4 w-28" />
        </div>
      </div>

      {/* Skeleton Cards */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <BookingSkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default Loading;
