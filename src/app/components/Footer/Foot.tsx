import React from "react";
import { FiMail, FiPhone } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import { SiInstagram, SiX, SiYoutube } from "react-icons/si";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "All Facilities", href: "/all-facilities" },
  { label: "How It Works", href: "/" },
  { label: "Pricing", href: "/" },
  { label: "Support", href: "/" },
];

const Foot = () => {
  return (
    <footer className="relative bg-white border-t border-slate-200 text-slate-900">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400 opacity-60" />

      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 px-4 sm:px-6 lg:px-8 py-16">
        {/* ── Brand ── */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-premium-sm">
              <Image src={logo} width={22} height={22} alt="SportNest" className="brightness-0 invert" />
            </div>
            <span className="text-xl font-black tracking-tight">
              Sport<span className="text-emerald-600">Nest</span>
            </span>
          </div>
          <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
            Book top sports courts, facilities, and training arenas in seconds. Find your spot, reserve it, and start playing.
          </p>
          <div className="flex items-center gap-3 pt-2">
            {[
              { icon: SiInstagram, href: "https://instagram.com", label: "Instagram" },
              { icon: SiX, href: "https://twitter.com", label: "Twitter" },
              { icon: SiYoutube, href: "https://youtube.com", label: "YouTube" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition-all duration-200 hover:border-emerald-200 hover:text-emerald-600 hover:bg-emerald-50 hover:-translate-y-0.5 shadow-premium-sm"
              >
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div>
          <h6 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-5">
            Quick Links
          </h6>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-600 hover:text-emerald-600 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contact ── */}
        <div className="lg:col-span-2">
          <h6 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-5">
            Contact Information
          </h6>
          <div className="space-y-3 text-sm text-slate-600">
            <p className="flex items-start gap-3">
              <FiMail className="mt-0.5 text-emerald-500 shrink-0" />
              <span>support@sportnest.com</span>
            </p>
            <p className="flex items-start gap-3">
              <FiPhone className="mt-0.5 text-emerald-500 shrink-0" />
              <span>+1 (123) 456-7890</span>
            </p>
            <p className="flex items-start gap-3">
              <IoLocationSharp className="mt-0.5 text-emerald-500 shrink-0" />
              <span className="line-clamp-2">345 Sports Ave, Suite 100, Cityville, ST 12345</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-slate-100 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <span>© {new Date().getFullYear()} SportNest. All rights reserved.</span>
          <span className="text-xs">Built for athletes, by athletes.</span>
        </div>
      </div>
    </footer>
  );
};

export default Foot;
