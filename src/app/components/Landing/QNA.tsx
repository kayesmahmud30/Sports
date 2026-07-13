"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Search,
  ArrowRight,
  Mail,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

/* ── FAQ Data ── */
const faqs = [
  {
    question: "How do I book a sports facility?",
    answer:
      "Simply browse our facilities, select your preferred venue, choose a date and time slot, and complete your booking. You'll receive an instant confirmation email with all the details. It's that easy!",
    category: "booking",
  },
  {
    question: "Can I cancel or reschedule a booking?",
    answer:
      "Yes! You can cancel or reschedule any booking up to 24 hours before your scheduled time for a full refund. Navigate to 'My Bookings' in your dashboard, find the booking, and select the cancel or reschedule option.",
    category: "booking",
  },
  {
    question: "How do I list my facility on SportNest?",
    answer:
      "Facility owners can sign up for a partner account and list their venues in minutes. Add photos, set your pricing, define availability, and start receiving bookings. Visit our 'Add Facility' page or contact our partnerships team to get started.",
    category: "facility",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, Amex), as well as digital wallets like Apple Pay and Google Pay. All transactions are securely processed and encrypted.",
    category: "payment",
  },
  {
    question: "Are the facility photos and details accurate?",
    answer:
      "We require all facility owners to provide up-to-date photos and accurate descriptions. Our team regularly reviews listings to ensure quality. If you find a discrepancy, please report it so we can address it promptly.",
    category: "facility",
  },
  {
    question: "Can I book a facility for recurring sessions?",
    answer:
      "Absolutely! Many of our facilities support recurring bookings for weekly training sessions, leagues, or regular games. Simply select the 'Recurring' option during booking and choose your preferred schedule.",
    category: "booking",
  },
  {
    question: "What if it rains on the day of my outdoor booking?",
    answer:
      "If weather conditions make your booking unusable, you can cancel up to 2 hours before your session for a full refund. Some facilities also offer covered or indoor alternatives — check the facility details for more information.",
    category: "booking",
  },
  {
    question: "How do I contact a facility owner?",
    answer:
      "After making a booking, you'll have access to the facility owner's contact information through your booking details page. You can message them directly for any specific questions or special requests.",
    category: "facility",
  },
  {
    question: "Is there a membership or subscription plan?",
    answer:
      "We offer flexible options for frequent players! Our SportNest Pro membership gives you discounted booking rates, priority access to premium facilities, and exclusive event invitations. Check our pricing page for more details.",
    category: "payment",
  },
  {
    question: "How are facility ratings and reviews collected?",
    answer:
      "After each booking, we ask players to rate their experience on a 5-star scale and leave a review. All reviews are verified against completed bookings to ensure authenticity and helpfulness for the community.",
    category: "general",
  },
];

/* ── Category Labels ── */
const categoryLabels: Record<string, string> = {
  booking: "Booking",
  facility: "Facilities",
  payment: "Payments",
  general: "General",
};

const categoryColors: Record<string, string> = {
  booking: "bg-blue-50 text-blue-700 ring-blue-200/50",
  facility: "bg-emerald-50 text-emerald-700 ring-emerald-200/50",
  payment: "bg-amber-50 text-amber-700 ring-amber-200/50",
  general: "bg-purple-50 text-purple-700 ring-purple-200/50",
};

/* ── FAQ Item Component ── */
const FaqItem = ({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) => {
  return (
    <div
      className={`group rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-emerald-200 bg-emerald-50/50 shadow-premium-md"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-premium-sm"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 sm:px-8 sm:py-6 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Index number */}
          <span
            className={`hidden sm:flex mt-0.5 h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-all duration-300 ${
              isOpen
                ? "bg-emerald-600 text-white shadow-premium-sm"
                : "bg-slate-100 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="min-w-0">
            <h3
              className={`text-base sm:text-lg font-bold leading-snug transition-colors duration-300 ${
                isOpen ? "text-slate-900" : "text-slate-800 group-hover:text-emerald-700"
              }`}
            >
              {faq.question}
            </h3>

            {/* Collapsed answer preview */}
            {!isOpen && (
              <p className="mt-1.5 text-sm text-slate-400 line-clamp-1">
                {faq.answer}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Category tag */}
          <span
            className={`hidden md:inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide ring-1 ${
              categoryColors[faq.category]
            }`}
          >
            {categoryLabels[faq.category]}
          </span>

          {/* Chevron */}
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
              isOpen
                ? "bg-emerald-100 text-emerald-600 rotate-180"
                : "bg-slate-100 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500"
            }`}
          >
            <ChevronDown size={18} className="transition-transform duration-300" />
          </div>
        </div>
      </button>

      {/* ── Answer (collapsible) ── */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 sm:px-8 pb-5 sm:pb-6 pt-0">
          <div className="sm:ml-12">
            <div className="relative border-l-2 border-emerald-200 pl-5 sm:pl-6">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-emerald-100 border-2 border-emerald-400" />
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Main Component ── */
const QNA = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-white to-emerald-50/50 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* ═══════════════════════════════════════
             HEADER
           ════════════════════════════════════════ */}
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-700 mb-4 ring-1 ring-emerald-200/50">
            <HelpCircle size={14} />
            FAQ
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Got questions?{" "}
            <span className="gradient-text-emerald">We&apos;ve got answers</span>
          </h2>

          <p className="mt-4 text-slate-500 leading-relaxed max-w-lg mx-auto">
            Everything you need to know about booking, facilities, payments, and
            more. Can&apos;t find what you&apos;re looking for? Reach out to our team.
          </p>
        </div>

        {/* ── Search ── */}
        <div className="relative mb-10 sm:mb-12 max-w-md mx-auto">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenIndex(null);
            }}
            placeholder="Search questions..."
            className="w-full h-12 sm:h-14 rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100/60 shadow-premium-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <span className="text-xs font-semibold">Clear</span>
            </button>
          )}
        </div>

        {/* ── Results count ── */}
        {searchQuery && (
          <p className="text-center text-sm text-slate-400 mb-6">
            {filteredFaqs.length === 0
              ? "No questions found"
              : `Showing ${filteredFaqs.length} ${filteredFaqs.length === 1 ? "question" : "questions"}`}
          </p>
        )}

        {/* ── FAQ Accordion ── */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {filteredFaqs.map((faq, index) => (
              <FaqItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
                index={index}
              />
            ))}
          </div>
        ) : (
          /* ── Empty state ── */
          <div className="card-premium p-10 sm:p-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 mb-4">
              <Search size={24} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              No matching questions
            </h3>
            <p className="text-sm text-slate-400">
              Try a different search term or browse the categories above.
            </p>
          </div>
        )}

        {/* ── Still have questions? ── */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 px-6 sm:px-10 py-10 sm:py-12 shadow-premium-xl">
            {/* Decorative dots */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20px 20px, white 1.2px, transparent 0)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            {/* Glow accent */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 mb-5">
                <MessageCircle size={26} className="text-emerald-400" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Still have questions?
              </h3>
              <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto leading-relaxed">
                Our support team is here to help. Reach out and we&apos;ll get back to
                you within 24 hours.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link
                  href="mailto:support@sportnest.com"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-emerald-400 hover:shadow-premium-lg active:scale-[0.97]"
                >
                  <Mail size={16} />
                  Email Support
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-6 py-2.5 text-sm font-bold text-slate-300 transition-all duration-300 hover:border-slate-500 hover:text-white"
                >
                  View Help Center
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom decorative sparkle ── */}
        <div className="flex items-center justify-center gap-1.5 mt-8 text-slate-300">
          <Sparkles size={12} />
          <span className="text-xs font-medium">
            We answer most questions within 2 hours
          </span>
          <Sparkles size={12} />
        </div>
      </div>
    </section>
  );
};

export default QNA;
