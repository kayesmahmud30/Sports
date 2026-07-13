"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Users,
  Building2,
  MapPin,
  Activity,
} from "lucide-react";

/* ── Stat Cards Data ── */
const stats = [
  {
    label: "Total Facilities",
    value: "120+",
    icon: Building2,
    change: "+12 this month",
    color: "emerald",
  },
  {
    label: "Active Users",
    value: "8,450",
    icon: Users,
    change: "+24% vs last month",
    color: "blue",
  },
  {
    label: "Bookings Made",
    value: "24.2K",
    icon: TrendingUp,
    change: "+18% vs last month",
    color: "amber",
  },
  {
    label: "Cities Covered",
    value: "45",
    icon: MapPin,
    change: "+3 new cities",
    color: "violet",
  },
];

/* ── Chart Data (Monthly Bookings) ── */
const chartData = [
  { month: "Jan", bookings: 1200 },
  { month: "Feb", bookings: 1400 },
  { month: "Mar", bookings: 1800 },
  { month: "Apr", bookings: 2200 },
  { month: "May", bookings: 2800 },
  { month: "Jun", bookings: 3400 },
  { month: "Jul", bookings: 4200 },
  { month: "Aug", bookings: 5100 },
  { month: "Sep", bookings: 5800 },
  { month: "Oct", bookings: 6400 },
  { month: "Nov", bookings: 7200 },
  { month: "Dec", bookings: 8100 },
];

/* ── Color mapping ── */
const colorMap: Record<string, { bg: string; text: string; icon: string; bar: string }> = {
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    icon: "text-emerald-500",
    bar: "#10b981",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    icon: "text-blue-500",
    bar: "#3b82f6",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    icon: "text-amber-500",
    bar: "#f59e0b",
  },
  violet: {
    bg: "bg-violet-50",
    text: "text-violet-600",
    icon: "text-violet-500",
    bar: "#8b5cf6",
  },
};

/* ── Custom Tooltip ── */
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-premium-lg">
      <p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
      <p className="text-sm font-bold text-emerald-600">
        {payload[0].value.toLocaleString()} bookings
      </p>
    </div>
  );
};

/* ── Main Component ── */
const Statistics = () => {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ══════════════════════════════
             HEADER
           ══════════════════════════════ */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-emerald-700 mb-3 ring-1 ring-emerald-200/50">
              <Activity size={13} />
              STATISTICS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              SportNest by the{" "}
              <span className="gradient-text-emerald">numbers</span>
            </h2>
          </div>
          <p className="text-sm text-slate-400 sm:text-right shrink-0">
            Updated monthly · Real-time data
          </p>
        </div>

        {/* ══════════════════════════════
             STAT CARDS
           ══════════════════════════════ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
          {stats.map((stat) => {
            const theme = colorMap[stat.color];
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="card-premium p-5 sm:p-6 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${theme.bg}`}
                  >
                    <Icon size={18} className={theme.icon} />
                  </div>
                  <span
                    className={`text-[11px] font-semibold ${theme.text}`}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* ══════════════════════════════
             CHART
           ══════════════════════════════ */}
        <div className="card-premium p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-500" />
              <span className="text-sm font-bold text-slate-900">
                Monthly Bookings Growth
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-400">2025</span>
            </div>
          </div>

          <div className="h-44 sm:h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 4, right: 4, left: -12, bottom: 0 }}
              >
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  dy={6}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  dx={-4}
                  tickFormatter={(v: number) =>
                    v >= 1000 ? `${(v / 1000).toFixed(0)}K` : `${v}`
                  }
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(16, 185, 129, 0.06)" }} />
                <Bar
                  dataKey="bookings"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={36}
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={index === chartData.length - 1 ? "#059669" : "#10b981"}
                      fillOpacity={index === chartData.length - 1 ? 1 : 0.55}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ══════════════════════════════
             FOOTNOTE
           ══════════════════════════════ */}
        <div className="flex items-center justify-center gap-2 mt-5 text-xs text-slate-400">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Steady growth across all regions
        </div>
      </div>
    </section>
  );
};

export default Statistics;
