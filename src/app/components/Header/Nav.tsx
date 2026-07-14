"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  Calendar,
  PlusSquare,
  Settings,
  LogOut,
  X,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Image from "next/image";
import logo from "@/assets/logo.png";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/all-facilities", label: "All Facilities" },
];

const GUEST_LINKS = [
  { href: "/contact", label: "Contact" },
];

const AUTH_LINKS = [
  { href: "/my-bookings", label: "My Bookings", icon: Calendar },
  { href: "/add-facilities", label: "Add Facility", icon: PlusSquare },
  { href: "/manage-facilities", label: "Manage Facilities", icon: Settings },
];

const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    setProfileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) => pathname === href;

  const navLinkClass = (href: string) =>
    `relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
      isActive(href)
        ? "bg-emerald-50 text-emerald-700"
        : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-premium-sm">
            <Image src={logo} width={22} height={22} alt="SportNest" className="brightness-0 invert" />
          </div>
          <span className="hidden sm:block text-lg font-bold tracking-tight text-slate-900">
            Sport<span className="text-emerald-600">Nest</span>
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>
              {link.label}
            </Link>
          ))}
          {!user && GUEST_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>
              {link.label}
            </Link>
          ))}
          {user && (
            <>
              <div className="mx-2 h-5 w-px bg-slate-200" />
              {AUTH_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>
                  {link.label}
                </Link>
              ))}
            </>
          )}
        </nav>

        {/* ── Right Side ── */}
        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200" />
          ) : user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-0.5 pr-3 pl-0.5 transition-all duration-200 hover:border-emerald-200 hover:shadow-premium-sm"
              >
                <div className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-emerald-100">
                  <Image
                    width={32}
                    height={32}
                    src={user.image || "https://img.magnific.com/free-vector/smiling-young-man-illustration_1308-173524.jpg?t=st=1779318066~exp=1779321666~hmac=9c9eeb560ce7b136ad3bbc2396dd7acc19a1b0dfb331240441d4599918b82361&w=1060"}
                    alt={user.name || "User"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="hidden lg:block text-sm font-medium text-slate-700 truncate max-w-[100px]">
                  {user.name}
                </span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-60 origin-top-right animate-fadeIn rounded-2xl border border-slate-200 bg-white p-2 shadow-premium-lg">
                  <div className="border-b border-slate-100 px-3 py-2.5 mb-1">
                    <p className="text-xs font-medium text-slate-400">Signed in as</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                  {AUTH_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setProfileOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                          isActive(link.href)
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                        }`}
                      >
                        <Icon size={16} className="text-slate-400" />
                        {link.label}
                      </Link>
                    );
                  })}
                  <div className="mt-1 border-t border-slate-100 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <Button className="h-9 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 text-xs font-bold tracking-wide text-white shadow-premium-sm transition-all duration-300 hover:shadow-premium-md hover:scale-[1.02] active:scale-[0.98]">
                Sign In
              </Button>
            </Link>
          )}

          {/* ── Mobile Toggle ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:border-emerald-200 hover:text-emerald-600"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 shadow-premium-lg animate-fadeIn">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!user && GUEST_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <>
                <div className="my-1 h-px bg-slate-100" />
                {AUTH_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive(link.href)
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                    >
                      <Icon size={16} className="text-slate-400" />
                      {link.label}
                    </Link>
                  );
                })}
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Nav;
