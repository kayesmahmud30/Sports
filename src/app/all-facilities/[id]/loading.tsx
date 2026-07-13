import React from "react";

const pulse = "animate-pulse bg-slate-200 rounded-lg";

const Bar = ({ className = "" }: { className?: string }) => (
  <div className={`${pulse} ${className}`} />
);

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* ── Back button skeleton ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <Bar className="h-5 w-32" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left Column ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero image */}
            <Bar className="h-72 sm:h-96 w-full rounded-3xl" />

            {/* Stats cards row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card-premium p-5 space-y-3">
                  <Bar className="h-4 w-16" />
                  <Bar className="h-6 w-24" />
                </div>
              ))}
            </div>

            {/* Description card */}
            <div className="card-premium p-6 sm:p-8 space-y-4">
              <Bar className="h-6 w-40" />
              <div className="space-y-2">
                <Bar className="h-4 w-full" />
                <Bar className="h-4 w-5/6" />
                <Bar className="h-4 w-4/6" />
                <Bar className="h-4 w-3/4" />
                <Bar className="h-4 w-5/6" />
              </div>
            </div>

            {/* Availability card */}
            <div className="card-premium p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2">
                <Bar className="h-5 w-5 rounded-full" />
                <Bar className="h-6 w-28" />
              </div>
              <div className="space-y-2">
                <Bar className="h-4 w-full" />
                <Bar className="h-4 w-2/3" />
              </div>
            </div>
          </div>

          {/* ── Right Column: Booking Form Skeleton ── */}
          <div className="lg:col-span-1">
            <div className="card-premium p-6 sm:p-8 sticky top-24 space-y-6">
              <Bar className="h-7 w-40" />

              {/* Date */}
              <div className="space-y-2">
                <Bar className="h-4 w-24" />
                <Bar className="h-11 w-full rounded-xl" />
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <Bar className="h-4 w-20" />
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Bar key={i} className="h-10 w-full rounded-xl" />
                  ))}
                </div>
              </div>

              {/* Hours */}
              <div className="space-y-2">
                <Bar className="h-4 w-16" />
                <Bar className="h-11 w-full rounded-xl" />
              </div>

              {/* Price breakdown */}
              <div className="rounded-2xl bg-slate-50 p-5 space-y-3">
                <Bar className="h-4 w-full" />
                <div className="border-t border-slate-200 pt-3">
                  <Bar className="h-6 w-28" />
                </div>
              </div>

              {/* Submit button */}
              <Bar className="h-12 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
