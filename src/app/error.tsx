"use client";
import Link from "next/link";
import React from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-red-100/30 blur-3xl" />

      <div className="relative flex flex-col items-center text-center max-w-md">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 border border-red-100 mb-6">
          <AlertTriangle size={40} className="text-red-500" />
        </div>

        <h1 className="text-4xl font-black tracking-tight text-slate-900">
          <span className="text-red-500">Oops!</span>
          <br />
          Something went wrong
        </h1>
        <p className="mt-3 text-slate-500 leading-relaxed">
          We encountered an unexpected error. Please try again or head back to the home page.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-sm font-bold tracking-wide text-white shadow-premium-md transition-all duration-300 hover:shadow-premium-lg hover:scale-105 active:scale-95 cursor-pointer"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl border-2 border-slate-200 bg-white text-sm font-bold tracking-wide text-slate-700 transition-all duration-300 hover:border-emerald-200 hover:text-emerald-600 hover:shadow-premium-sm"
          >
            <Home size={16} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
