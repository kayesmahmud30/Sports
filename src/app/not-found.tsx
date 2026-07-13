"use client";
import Link from "next/link";
import React from "react";
import { SearchX, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl" />

      <div className="relative flex flex-col items-center text-center max-w-md">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 border border-slate-200 mb-6">
          <SearchX size={40} className="text-slate-400" />
        </div>

        <h1 className="text-8xl font-black italic tracking-tighter text-slate-200 select-none">
          404
        </h1>

        <div className="mt-2 space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Page Not Found</h2>
          <p className="text-slate-500 leading-relaxed">
            The page you&apos;re looking for has been benched, traded, or never made the roster. Let&apos;s get you back in the game.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-sm font-bold tracking-wide text-white shadow-premium-md transition-all duration-300 hover:shadow-premium-lg hover:scale-105 active:scale-95"
          >
            <Home size={16} />
            Go Home
          </Link>
          <button
            onClick={() => { if (typeof window !== "undefined") window.history.back(); }}
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl border-2 border-slate-200 bg-white text-sm font-bold tracking-wide text-slate-700 transition-all duration-300 hover:border-emerald-200 hover:text-emerald-600 hover:shadow-premium-sm cursor-pointer"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
