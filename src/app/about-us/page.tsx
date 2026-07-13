import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Trophy,
  Users,
  Building2,
  Heart,
  Target,
  Zap,
  Handshake,
  Quote,
} from "lucide-react";

/* ── Stats ── */
const stats = [
  { value: "500+", label: "Facilities Listed" },
  { value: "50K+", label: "Active Athletes" },
  { value: "120K+", label: "Bookings Completed" },
  { value: "4.9★", label: "Average Rating" },
];

/* ── Values ── */
const values = [
  {
    icon: Heart,
    title: "Passion for Sport",
    desc: "We believe sport transforms lives. Every feature we build is driven by a love for the game and the people who play it.",
    color: "emerald",
  },
  {
    icon: Target,
    title: "Precision & Quality",
    desc: "From court conditions to booking flow, we obsess over every detail so your experience is seamless and world-class.",
    color: "amber",
  },
  {
    icon: Users,
    title: "Community First",
    desc: "SportNest is built for players, coaches, and facility owners alike. We grow together through every match and every booking.",
    color: "blue",
  },
  {
    icon: Handshake,
    title: "Trust & Transparency",
    desc: "Clear pricing, real availability, and honest reviews. No hidden fees, no surprises — just fair play all the way.",
    color: "emerald",
  },
  {
    icon: Zap,
    title: "Innovation Always",
    desc: "We stay ahead of the game with smart booking tools, real-time updates, and technology that makes playing easier.",
    color: "amber",
  },
  {
    icon: Building2,
    title: "Empowering Venues",
    desc: "Facility owners get the visibility, tools, and support they need to fill their courts and grow their business.",
    color: "blue",
  },
];

/* ── Team ── */
const team = [
  {
    name: "Alex Chen",
    role: "CEO & Co-Founder",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    bio: "Former collegiate athlete turned entrepreneur. Alex founded SportNest to make premium sports facilities accessible to everyone.",
  },
  {
    name: "Sarah Mitchell",
    role: "COO & Co-Founder",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
    bio: "Operations expert with a passion for grassroots sports. Sarah ensures every facility partner delivers a top-tier experience.",
  },
  {
    name: "Marcus Rivera",
    role: "Head of Product",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    bio: "Product visionary who blends sports analytics with UX design. Marcus leads the team building intuitive booking experiences.",
  },
];

/* ── Milestones ── */
const milestones = [
  { year: "2023", event: "SportNest founded with 15 facilities in one city" },
  { year: "2024", event: "Expanded to 200+ venues, launched mobile app" },
  { year: "2025", event: "Reached 50K athletes, introduced AI recommendations" },
  { year: "2026", event: "120K bookings, now operating in 12 major cities" },
];

export default function AboutUs() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
           HERO
         ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-white">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-700 mb-6 ring-1 ring-emerald-200/50">
              <Trophy size={14} />
              ABOUT US
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              We&apos;re on a mission to{" "}
              <span className="gradient-text-emerald">make sports accessible</span>{" "}
              for everyone.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
              SportNest connects athletes with premium sports facilities in seconds.
              We believe every player deserves a great court, a fair price, and a
              seamless booking experience — from weekend warriors to elite competitors.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/all-facilities"
                className="btn-premium inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold tracking-wide"
              >
                Explore Facilities
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/signup"
                className="btn-ghost-premium inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold tracking-wide"
              >
                Join the Community
              </Link>
            </div>
          </div>

          {/* ── Stats row ── */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="card-premium text-center p-6 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-3xl sm:text-4xl font-extrabold gradient-text-emerald">
                  {stat.value}
                </div>
                <div className="mt-1.5 text-sm font-medium text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
           OUR STORY
         ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-premium-xl">
                <Image
                  src="https://images.unsplash.com/photo-1760544308418-51b87ffb8417?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="People playing sports together"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 card-premium p-4 sm:p-5 max-w-[200px] sm:max-w-[240px] hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Quote size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800 leading-snug">
                      &ldquo;Everyone deserves a great place to play.&rdquo;
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">— Alex Chen, CEO</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-700 mb-4">
                OUR STORY
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Born from a love of the game
              </h2>
              <div className="mt-6 space-y-4 text-slate-500 leading-relaxed">
                <p>
                  SportNest started in 2023 when two friends realized how hard it was
                  to find and book quality sports facilities. Courts were often empty,
                  booking processes were outdated, and athletes were left juggling
                  phone calls and spreadsheets just to play.
                </p>
                <p>
                  We built SportNest to fix that. What started as a small directory of
                  15 local venues quickly grew into a platform that connects thousands
                  of athletes with premium courts, fields, and training facilities
                  across the country.
                </p>
                <p>
                  Today, we partner with 500+ venues — from community centers to
                  elite training complexes — and we&apos;re just getting started. Our
                  goal is simple: remove every barrier between you and the game you
                  love.
                </p>
              </div>

              {/* Milestones */}
              <div className="mt-10 space-y-4">
                {milestones.map((m) => (
                  <div key={m.year} className="flex items-start gap-4">
                    <span className="flex h-8 w-16 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-xs font-bold text-emerald-700">
                      {m.year}
                    </span>
                    <p className="pt-1 text-sm text-slate-600">{m.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
           OUR VALUES
         ════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-white to-emerald-50/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-700 mb-3">
              OUR VALUES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              What drives us every day
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed">
              These principles shape every decision we make, from product design to
              the partnerships we build.
            </p>
          </div>

          {/* Grid */}
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((item, index) => {
              const Icon = item.icon;
              const colorClasses: Record<string, string> = {
                emerald:
                  "from-emerald-500 to-emerald-700 shadow-emerald-200/50",
                amber: "from-amber-500 to-amber-600 shadow-amber-200/50",
                blue: "from-blue-500 to-blue-600 shadow-blue-200/50",
              };

              return (
                <div
                  key={index}
                  className="card-premium p-6 sm:p-8 hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${colorClasses[item.color]} text-white shadow-premium-md mb-5`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
           TEAM
         ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-700 mb-3">
              LEADERSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Meet the team behind SportNest
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed">
              A group of athletes, builders, and dreamers working to change the way
              the world plays.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="group card-premium overflow-hidden hover:-translate-y-1.5 transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.src}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                  <p className="text-sm font-semibold text-emerald-600 mt-0.5">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
           CTA
         ════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-white to-emerald-50/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-500 px-6 sm:px-12 lg:px-20 py-16 sm:py-20 text-center shadow-premium-xl">
            {/* Decorative dots */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 25px 25px, white 1.5px, transparent 0)",
                  backgroundSize: "50px 50px",
                }}
              />
            </div>

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90 mb-5 ring-1 ring-white/20">
                <Users size={14} />
                JOIN 50K+ ATHLETES
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Ready to find your perfect court?
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-emerald-100/80 leading-relaxed">
                Join thousands of athletes booking premium facilities every day. Your
                next game is one click away.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-emerald-700 shadow-premium-lg transition-all duration-300 hover:shadow-premium-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get Started Free
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/all-facilities"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-bold text-white/90 transition-all duration-300 hover:bg-white/10 hover:border-white/50"
                >
                  <MapPin size={16} />
                  Browse Facilities
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
