"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Mail,
  MapPin,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Sparkles,
  User,
  FileText,
  MessageSquare,
} from "lucide-react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
} from "react-icons/fi";
import { SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: FiMail,
    label: "Email Us",
    value: "support@sportnest.com",
    href: "mailto:support@sportnest.com",
    desc: "We respond within 24 hours",
  },
  {
    icon: FiPhone,
    label: "Call Us",
    value: "+1 (123) 456-7890",
    href: "tel:+11234567890",
    desc: "Mon–Fri, 9am–6pm EST",
  },
  {
    icon: FiMapPin,
    label: "Visit Us",
    value: "345 Sports Ave, Suite 100\nCityville, ST 12345",
    desc: "Headquarters",
  },
  {
    icon: FiClock,
    label: "Business Hours",
    value: "Mon–Sat: 8:00 AM – 8:00 PM\nSunday: 10:00 AM – 6:00 PM",
    desc: "All times EST",
  },
];

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (_data: ContactFormData) => {
    // Simulate a brief sending delay
    await new Promise((r) => setTimeout(r, 1200));

    toast.success("Message sent successfully! We'll get back to you soon.");
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      {/* ═══════════════════════════════════════
           HERO BANNER
         ════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 py-20 sm:py-28">
        {/* Decorative dots */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 24px 24px, rgba(255,255,255,0.8) 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Glowing orbs */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-300 mb-5 ring-1 ring-emerald-400/20">
              <MessageCircle size={14} />
              GET IN TOUCH
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              We&apos;d love to hear{" "}
              <span className="text-emerald-400">from you</span>
            </h1>

            <p className="mt-5 text-lg text-emerald-100/70 max-w-xl mx-auto leading-relaxed">
              Have a question, feedback, or want to partner with us? Our team is
              ready to help you out.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           MAIN CONTENT
         ════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-white to-emerald-50/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
            {/* ── Left: Contact Info Cards ── */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Contact Information
                </h2>
                <p className="mt-1.5 text-sm text-slate-500">
                  Reach out through any of the channels below or fill out the
                  form and we&apos;ll get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="card-premium p-5 sm:p-6 hover:-translate-y-0.5 transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-premium-sm group-hover:shadow-premium-md transition-all duration-300">
                          <Icon className="text-lg" />
                        </div>
                        <div className="min-w-0 pt-0.5">
                          <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-0.5">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-sm font-semibold text-slate-800 hover:text-emerald-600 transition-colors whitespace-pre-line"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-sm font-semibold text-slate-800 whitespace-pre-line">
                              {item.value}
                            </p>
                          )}
                          <p className="text-xs text-slate-400 mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social mini section */}
              <div className="card-premium p-5 sm:p-6">
                <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
                  Follow Us
                </p>
                <div className="flex items-center gap-2.5">
                  {[
                    { icon: SiInstagram, label: "Instagram", href: "https://instagram.com" },
                    { icon: SiX, label: "Twitter / X", href: "https://twitter.com" },
                    { icon: SiYoutube, label: "YouTube", href: "https://youtube.com" },
                    { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
                  ].map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 hover:-translate-y-0.5 shadow-premium-sm"
                      title={label}
                    >
                      <Icon className="text-sm" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: Contact Form ── */}
            <div className="lg:col-span-3">
              <div className="card-premium p-6 sm:p-8 lg:p-10 shadow-premium-lg">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    Send us a message
                  </h2>
                  <p className="mt-1.5 text-sm text-slate-500">
                    Fill out the form below and we&apos;ll respond as soon as
                    possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Row: Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-400 uppercase mb-1.5 ml-1">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <User
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                        <input
                          type="text"
                          placeholder="John Doe"
                          {...register("name", {
                            required: "Name is required",
                            minLength: {
                              value: 2,
                              message: "Name must be at least 2 characters",
                            },
                          })}
                          className="w-full h-12 rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-xs font-medium text-red-500 mt-1 ml-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-400 uppercase mb-1.5 ml-1">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <Mail
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                        <input
                          type="email"
                          placeholder="your@mail.com"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Please enter a valid email",
                            },
                          })}
                          className="w-full h-12 rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-xs font-medium text-red-500 mt-1 ml-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-400 uppercase mb-1.5 ml-1">
                      Subject
                    </label>
                    <div className="relative">
                      <FileText
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                      <input
                        type="text"
                        placeholder="How can we help you?"
                        {...register("subject")}
                        className="w-full h-12 rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-400 uppercase mb-1.5 ml-1">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare
                          size={16}
                          className="absolute left-3.5 top-4 text-slate-400 pointer-events-none"
                        />
                      <textarea
                        placeholder="Tell us what's on your mind..."
                        rows={5}
                        {...register("message", {
                          required: "Message is required",
                          minLength: {
                            value: 10,
                            message: "Message must be at least 10 characters",
                          },
                          maxLength: {
                            value: 2000,
                            message: "Message must be under 2000 characters",
                          },
                        })}
                        className="w-full min-h-[140px] rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50 resize-y"
                      />
                    </div>
                    {errors.message && (
                      <p className="text-xs font-medium text-red-500 mt-1 ml-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting || submitted}
                    className="group relative w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-sm font-bold tracking-wide text-white shadow-premium-lg transition-all duration-300 hover:shadow-premium-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2.5 py-3.5"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : submitted ? (
                      <>
                        <CheckCircle size={18} className="animate-fadeIn" />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <FiSend
                          size={15}
                          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           MAP SECTION
         ════════════════════════════════════════ */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-emerald-700 mb-3 ring-1 ring-emerald-200/50">
              <MapPin size={13} />
              OUR LOCATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Find us at our{" "}
              <span className="gradient-text-emerald">headquarters</span>
            </h2>
            <p className="mt-2 text-sm text-slate-500 max-w-lg mx-auto">
              We&apos;re based in the heart of the city. Drop by for a visit or
              schedule a meeting with our team.
            </p>
          </div>

          <div className="card-premium overflow-hidden p-2">
            <div className="aspect-[21/9] min-h-[280px] w-full rounded-xl overflow-hidden bg-slate-100 relative">
              {/* Google Maps embed showing a central NYC location (placeholder — update with your actual address) */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919365!2d-73.98784492427378!3d40.74844097138938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "280px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SportNest Headquarters Location"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           CTA BANNER
         ════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-emerald-50/30 to-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex-1 max-w-xl text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Ready to get started?
                </h3>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  Browse our facilities, book your next game, or list your venue
                  and start earning. The SportNest community is waiting for you.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <Link
                  href="/all-facilities"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-emerald-400 hover:shadow-premium-lg active:scale-[0.97]"
                >
                  Browse Facilities
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/add-facilities"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-6 py-2.5 text-sm font-bold text-slate-300 transition-all duration-300 hover:border-slate-500 hover:text-white"
                >
                  List Your Facility
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom sparkle */}
          <div className="flex items-center justify-center gap-1.5 mt-8 text-slate-300">
            <Sparkles size={12} />
            <span className="text-xs font-medium">
              We typically respond within 24 hours
            </span>
            <Sparkles size={12} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
