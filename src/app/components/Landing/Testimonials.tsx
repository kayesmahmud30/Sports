"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

/* ── Testimonials Data ── */
const testimonials = [
  {
    name: "Priya Sharma",
    role: "Tennis Coach",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face",
    rating: 5,
    text: "SportNest has completely transformed how I manage my coaching sessions. Booking courts for my students used to be a hassle, but now I can reserve multiple slots in seconds. My weekly schedule has never been smoother!",
    sport: "Tennis",
  },
  {
    name: "James Okafor",
    role: "Amateur Boxer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    rating: 5,
    text: "I moved to a new city and didn't know where to train. SportNest helped me find a boxing gym within 2 miles of my apartment. The pricing is transparent, and the facility was even better than the photos showed.",
    sport: "Boxing",
  },
  {
    name: "Emily Chen",
    role: "Yoga Instructor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
    rating: 5,
    text: "The recurring booking feature is a lifesaver for my weekly yoga classes. My students love the consistent schedule, and I love not having to manually book every single week. Absolute game-changer for instructors.",
    sport: "Yoga",
  },
  {
    name: "Carlos Mendez",
    role: "Football League Organizer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
    rating: 4,
    text: "Managing a 12-team football league used to mean endless phone calls and spreadsheets. Now my whole league books through SportNest. The platform handles payments, cancellations, and scheduling seamlessly.",
    sport: "Football",
  },
  {
    name: "Aisha Patel",
    role: "Swimming Coach",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
    rating: 5,
    text: "I was skeptical at first, but SportNest exceeded every expectation. The pool I book through them is always clean, well-maintained, and available exactly when I need it. My swimmers have never been happier.",
    sport: "Swimming",
  },
  {
    name: "David Kim",
    role: "Basketball Player",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
    rating: 5,
    text: "Finding an indoor basketball court at short notice used to be impossible. With SportNest, I can see real-time availability and book a court within minutes. The split-booking feature with friends is genius.",
    sport: "Basketball",
  },
];

/* ── Star Rating ── */
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={
          i < rating
            ? "fill-amber-400 text-amber-400"
            : "fill-slate-200 text-slate-200"
        }
      />
    ))}
  </div>
);

/* ── Single Testimonial Card ── */
const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="card-premium p-6 sm:p-8 flex flex-col h-full hover:-translate-y-1 transition-all duration-300"
  >
    {/* Quote icon */}
    <div className="mb-4">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
        <Quote size={18} />
      </div>
    </div>

    {/* Text */}
    <p className="text-sm sm:text-base text-slate-600 leading-relaxed flex-1">
      &ldquo;{testimonial.text}&rdquo;
    </p>

    {/* Rating */}
    <div className="mt-5">
      <StarRating rating={testimonial.rating} />
    </div>

    {/* Author */}
    <div className="mt-5 flex items-center gap-3 pt-5 border-t border-slate-100">
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-emerald-100">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-slate-900 truncate">
          {testimonial.name}
        </p>
        <p className="text-xs text-slate-400 truncate">{testimonial.role}</p>
      </div>
      {/* Sport tag */}
      <span className="ml-auto shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-emerald-600">
        {testimonial.sport}
      </span>
    </div>
  </motion.div>
);

/* ── Main Component ── */
const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const cardsPerPage = { sm: 1, md: 2, lg: 3 };
  const totalPages = Math.ceil(testimonials.length / 3);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextPage, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextPage]);

  // Visible testimonials for current page
  const visibleTestimonials = testimonials.slice(
    currentPage * 3,
    currentPage * 3 + 3,
  );

  return (
    <section
      className="bg-gradient-to-b from-emerald-50/50 via-white to-white py-20 sm:py-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ═══════════════════════════════════════
             HEADER
           ════════════════════════════════════════ */}
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-700 mb-4 ring-1 ring-emerald-200/50">
            <MessageCircle size={14} />
            TESTIMONIALS
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            What our{" "}
            <span className="gradient-text-emerald">community says</span>
          </h2>

          <p className="mt-4 text-slate-500 leading-relaxed max-w-lg mx-auto">
            Hear from athletes, coaches, and facility owners who use SportNest
            every day to play, train, and grow.
          </p>
        </div>

        {/* ═══════════════════════════════════════
             CARDS (stacked on mobile, grid on desktop)
           ════════════════════════════════════════ */}

        {/* ── Mobile: Single card carousel ── */}
        <div className="sm:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {testimonials[currentPage] && (
                <TestimonialCard
                  testimonial={testimonials[currentPage]}
                  index={0}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentPage
                    ? "w-8 bg-emerald-500"
                    : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── Desktop: 3-column grid ── */}
        <div className="hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-3 gap-6"
            >
              {visibleTestimonials.map((t, i) => (
                <TestimonialCard key={t.name} testimonial={t} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Nav controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            {/* Prev */}
            <button
              onClick={prevPage}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-premium-sm transition-all duration-200 hover:border-emerald-200 hover:text-emerald-600 hover:shadow-premium-md active:scale-95"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentPage
                      ? "w-8 bg-emerald-500"
                      : "w-2 bg-slate-200 hover:bg-slate-300"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={nextPage}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-premium-sm transition-all duration-200 hover:border-emerald-200 hover:text-emerald-600 hover:shadow-premium-md active:scale-95"
              aria-label="Next testimonials"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ── Tablet: 2-column (md breakpoint) ── */}
        <div className="hidden sm:block lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid grid-cols-2 gap-5"
            >
              {testimonials
                .slice(currentPage * 2, currentPage * 2 + 2)
                .map((t, i) => (
                  <TestimonialCard key={t.name} testimonial={t} index={i} />
                ))}
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(testimonials.length / 2) }).map(
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentPage
                      ? "w-8 bg-emerald-500"
                      : "w-2 bg-slate-200 hover:bg-slate-300"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ),
            )}
          </div>
        </div>

        {/* ── Bottom metadata ── */}
        <div className="flex items-center justify-center gap-6 mt-10 sm:mt-12 text-slate-400">
          <div className="flex items-center gap-1.5">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-slate-700">4.8</span>
            <span className="text-xs text-slate-400">average rating</span>
          </div>
          <span className="text-slate-200">|</span>
          <div className="flex items-center gap-1.5">
            <MessageCircle size={14} className="text-slate-400" />
            <span className="text-sm font-semibold text-slate-700">2,400+</span>
            <span className="text-xs text-slate-400">reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
