"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, Check, Sparkles } from "lucide-react";

const JoinNewsLetter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="relative bg-white">
      {/* Decorative top border like Footer */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400 opacity-60" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50/80 via-white to-amber-50/40 shadow-premium-md">
          {/* Subtle dot pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #059669 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 px-6 sm:px-10 py-8 sm:py-10">
            {/* ── Left: Text ── */}
            <div className="flex-1 max-w-xl">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-emerald-500" />
                <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">
                  Stay in the Loop
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Join the{" "}
                <span className="gradient-text-emerald">SportNest</span>{" "}
                Newsletter
              </h3>
              <p className="mt-1.5 text-sm text-slate-500">
                Get exclusive deals, new facility alerts, and tips delivered to
                your inbox. No spam — just the good stuff.
              </p>
            </div>

            {/* ── Right: Form ── */}
            <form
              onSubmit={handleSubmit}
              className="w-full lg:w-auto shrink-0"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative flex-1 lg:w-64">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={submitted}
                    className="w-full h-11 pl-10 pr-4 text-sm rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitted}
                  className="group relative inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm font-semibold shadow-premium-sm transition-all duration-200 hover:shadow-premium-md hover:from-emerald-700 hover:to-emerald-600 active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {submitted ? (
                    <>
                      <Check size={16} className="animate-fadeIn" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinNewsLetter;
