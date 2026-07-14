"use client";

import React from "react";
import { HiOutlineMail, HiOutlineUser, HiOutlineLink } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  img?: string;
}

const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    const { name, email, password, img } = data;
    const { data: res, error } = await authClient.signUp.email({
      email,
      password,
      name,
      image: img,
      callbackURL: "/login",
    });

    if (res) {
      await authClient.signOut();
      toast.success("Signup Successfully!");
      router.push("/login");
    } else if (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: "/" });
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
              Create Account
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Join the SportNest community
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-400 uppercase mb-1.5 ml-1">
                Full Name
              </label>
              <div className="relative">
                <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: true })}
                  className="w-full h-11 rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
                />
              </div>
              {errors.name && <p className="text-xs font-medium text-red-500 mt-1 ml-1">Name is required</p>}
            </div>

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
              {errors.email && <p className="text-xs font-medium text-red-500 mt-1 ml-1">Email is required</p>}
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-400 uppercase mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <RiLockPasswordLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                    pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])/, message: "Password must contain at least one uppercase and one lowercase letter" },
                  })}
                  className="w-full h-11 rounded-xl border border-slate-200 bg-white pl-10 pr-11 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer border-none bg-transparent focus:outline-none"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-xs font-medium text-red-500 mt-1 ml-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-400 uppercase mb-1.5 ml-1">
                Profile Image URL
              </label>
              <div className="relative">
                <HiOutlineLink className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                <input
                  type="url"
                  placeholder="https://images.com/avatar.jpg"
                  {...register("img")}
                  className="w-full h-11 rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-sm font-bold tracking-wide text-white shadow-premium-lg transition-all duration-300 hover:shadow-premium-xl hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 group cursor-pointer"
            >
              Create Account
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

          <button
            onClick={handleGoogleSignIn}
            className="w-full h-11 rounded-xl border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/50 hover:text-emerald-700 flex items-center justify-center gap-3 group cursor-pointer"
          >
            <FaGoogle className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
            Google
          </button>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline underline-offset-2 transition-all">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
