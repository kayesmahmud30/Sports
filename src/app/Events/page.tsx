"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const cards = [
  {
    title: "Build Team Chemistry",
    desc: "Football develops coordination, leadership, and fast decision-making under pressure. The world's most popular sport brings people together.",
    src: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?q=80&w=1200&auto=format&fit=crop",
    color: "emerald",
  },
  {
    title: "Boost Reflex Speed",
    desc: "Badminton improves reaction time, agility, and sharp body coordination. Every rally is a test of speed and precision.",
    src: "https://images.unsplash.com/photo-1595220427358-8cf2ce3d7f89?q=80&w=1176&auto=format&fit=crop",
    color: "cyan",
  },
  {
    title: "Improve Mental Focus",
    desc: "Tennis builds patience, precision, and strategic thinking in real time. Master the mental game on every court.",
    src: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1200&auto=format&fit=crop",
    color: "amber",
  },
  {
    title: "Build Full-Body Power",
    desc: "Swimming strengthens endurance, lungs, and overall muscle balance with low impact. A total body workout with zero impact.",
    src: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1200&auto=format&fit=crop",
    color: "blue",
  },
];

const UpcomingEvents = () => {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center mb-14">
          <span className="inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold tracking-wide text-amber-700 mb-3">
            WHY PLAY SPORTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            More Than Just a Game
          </h2>
          <p className="mt-4 text-slate-500 leading-relaxed">
            Build strength, discipline, and confidence through real sporting experiences. Every sport has a story to tell.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group card-premium overflow-hidden hover:-translate-y-1.5 transition-all duration-500"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={card.src}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                <div className="absolute top-3 right-3 rounded-full bg-white/90 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-premium-md">
                  <ArrowUpRight size={16} className="text-slate-700" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
