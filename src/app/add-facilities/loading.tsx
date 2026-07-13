import React from "react";

const pulse = "animate-pulse bg-slate-200 rounded-lg";

const Bar = ({ className = "" }: { className?: string }) => (
  <div className={`${pulse} ${className}`} />
);

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-slate-200 animate-pulse" />
            <div>
              <Bar className="h-10 w-44 mb-2" />
              <Bar className="h-4 w-56" />
            </div>
          </div>
        </div>
      </div>

      {/* Skeleton Form */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="card-premium p-8 sm:p-10">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Title field */}
              <div className="md:col-span-2">
                <Bar className="h-3 w-24 mb-2" />
                <Bar className="h-11 w-full rounded-2xl" />
              </div>

              {/* Category field */}
              <div>
                <Bar className="h-3 w-20 mb-2" />
                <Bar className="h-11 w-full rounded-2xl" />
              </div>

              {/* Image URL field */}
              <div>
                <Bar className="h-3 w-20 mb-2" />
                <Bar className="h-11 w-full rounded-2xl" />
              </div>

              {/* Location field */}
              <div className="md:col-span-2">
                <Bar className="h-3 w-32 mb-2" />
                <Bar className="h-11 w-full rounded-2xl" />
              </div>

              {/* Price field */}
              <div>
                <Bar className="h-3 w-28 mb-2" />
                <Bar className="h-11 w-full rounded-2xl" />
              </div>

              {/* Capacity field */}
              <div>
                <Bar className="h-3 w-32 mb-2" />
                <Bar className="h-11 w-full rounded-2xl" />
              </div>

              {/* Availability field */}
              <div className="md:col-span-2">
                <Bar className="h-3 w-40 mb-2" />
                <Bar className="h-[120px] w-full rounded-2xl" />
              </div>

              {/* Description field */}
              <div className="md:col-span-2">
                <Bar className="h-3 w-36 mb-2" />
                <Bar className="h-[140px] w-full rounded-2xl" />
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <Bar className="h-12 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
