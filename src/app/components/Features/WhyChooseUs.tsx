"use client";

import React from "react";
import {
  FiActivity,
  FiTarget,
  FiTrendingUp,
  FiHeart,
  FiGlobe,
  FiAward,
} from "react-icons/fi";

interface Feature {
  icon: React.ReactElement;
  title: string;
  desc: string;
}

const features: Feature[] = [
  {
    icon: <FiActivity />,
    title: "Boost Your Performance",
    desc: "Improve strength, stamina, and agility through consistent sports activities with top-tier equipment.",
  },
  {
    icon: <FiTarget />,
    title: "Sharpen Your Skills",
    desc: "Train with precision-focused practice sessions designed for real improvement at every level.",
  },
  {
    icon: <FiTrendingUp />,
    title: "Level Up Faster",
    desc: "Track your progress and continuously push your limits with every game and practice session.",
  },
  {
    icon: <FiHeart />,
    title: "Healthy Lifestyle",
    desc: "Stay active, reduce stress, and build long-term physical and mental wellness through regular play.",
  },
  {
    icon: <FiGlobe />,
    title: "Play Anywhere",
    desc: "Discover and access hundreds of premium sports facilities easily across multiple locations.",
  },
  {
    icon: <FiAward />,
    title: "Earn Recognition",
    desc: "Compete, improve, and stand out through achievements, leaderboards, and performance tracking.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gradient-to-b from-white to-emerald-50/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-700 mb-3">
            WHY SPORTNEST
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Everything you need to elevate your game
          </h2>
          <p className="mt-4 text-slate-500 leading-relaxed">
            A complete sports experience designed to help you train better, play smarter, and grow stronger every day.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="card-premium p-6 sm:p-8 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-premium-md mb-5">
                <span className="text-xl">{item.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
