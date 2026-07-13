"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Star } from "lucide-react";
import hero from "../../../assets/Hero.png";
import Link from "next/link";

const stats = [
  { value: "500+", label: "Facilities" },
  { value: "50K+", label: "Athletes" },
  { value: "98%", label: "Satisfaction" },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      {/* ── Decorative elements ── */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-amber-100/40 blur-3xl" />
      <div className="absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center lg:flex-row lg:gap-16 py-16 lg:py-0">
          {/* ── Left Content ── */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Trusted by 50,000+ athletes worldwide
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight text-slate-900"
            >
              Book Perfect
              <br />
              <span className="gradient-text-emerald">Spaces Build</span>
              <br />
              for Champions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto max-w-lg text-lg text-slate-500 lg:mx-0 leading-relaxed"
            >
              Train harder and play smarter with SportNest — your ultimate destination for booking premium sports facilities and courts. Reserve top-tier venues for your next game.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/all-facilities"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 text-sm font-bold tracking-wide text-white shadow-premium-lg transition-all duration-300 hover:shadow-premium-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore Facilities
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about-us"
                className="inline-flex h-12 items-center rounded-full border-2 border-slate-200 bg-white px-8 text-sm font-bold tracking-wide text-slate-700 transition-all duration-300 hover:border-emerald-200 hover:text-emerald-600 hover:shadow-premium-sm"
              >
                About Us
              </Link>
            </motion.div>

            {/* ── Stats ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex items-center gap-8 justify-center lg:justify-start pt-4"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                  <p className="text-xs font-medium text-slate-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right Image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex-1 w-full max-w-lg lg:max-w-none mt-10 lg:mt-0"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-400/20 to-amber-400/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-premium-xl">
                <Image
                  src={hero}
                  alt="Sports facilities"
                  priority
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -bottom-3 -left-3 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-premium-lg"
              >
                <MapPin size={16} className="text-emerald-500" />
                <div>
                  <p className="text-xs font-semibold text-slate-800">Premium Venues</p>
                  <p className="text-[10px] text-slate-400">Nationwide</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -top-3 -right-3 flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 shadow-premium-md"
              >
                <Star size={14} className="fill-amber-500 text-amber-500" />
                <span className="text-xs font-bold text-amber-700">4.9</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
