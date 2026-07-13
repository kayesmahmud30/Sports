"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FaGoogle } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.png";

interface LoginFormData {
  email: string;
  pass: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  // Read the redirect param from URL so users return to their intended page after login
  const getCallbackUrl = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("redirect") || "/";
    }
    return "/";
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { email, pass } = data;
      const result = await authClient.signIn.email({
        email,
        password: pass,
        callbackURL: getCallbackUrl(),
      });

      console.log("EMAIL LOGIN:", result);
      if (result.data) toast.success("Welcome Back!");
      if (result.error) toast.error(result.error.message);
    } catch (err) {
      console.error("EMAIL LOGIN ERROR:", err);
      toast.error("Something went wrong");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: getCallbackUrl(),
      });
    } catch (err) {
      console.error("GOOGLE LOGIN ERROR:", err);
      toast.error("Google sign in failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-4 sm:p-8 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="card-premium p-8 sm:p-10 shadow-premium-xl">
          {/* Logo + Title */}
          <div className="text-center mb-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-premium-md mb-4">
              <Image src={logo} width={24} height={24} alt="SportNest" className="brightness-0 invert" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Welcome Back
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Sign in to your SportNest account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-400 uppercase mb-1.5 ml-1">
                Email
              </label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                <input
                  type="email"
                  placeholder="your@mail.com"
                  {...register("email", { required: true })}
                  className="w-full h-11 rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
                />
              </div>
              {errors.email && (
                <p className="text-xs font-medium text-red-500 mt-1 ml-1">Email is required</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-400 uppercase mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("pass", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                    pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])/, message: "Must include at least one uppercase and one lowercase letter" },
                  })}
                  className="w-full h-11 rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
                />
              </div>
              {errors.pass && (
                <p className="text-xs font-medium text-red-500 mt-1 ml-1">{errors.pass.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-sm font-bold tracking-wide text-white shadow-premium-lg transition-all duration-300 hover:shadow-premium-xl hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 group cursor-pointer"
            >
              Sign In
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full h-11 rounded-xl border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/50 hover:text-emerald-700 flex items-center justify-center gap-3 group cursor-pointer"
          >
            <FaGoogle className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
            Google
          </button>

          {/* Signup link */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline underline-offset-2 transition-all">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
