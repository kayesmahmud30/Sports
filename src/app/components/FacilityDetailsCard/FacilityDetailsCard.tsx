"use client";

import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Clock,
  Users,
  DollarSign,
  Calendar,
  Shield,
  ArrowLeft,
  Minus,
  Plus,
} from "lucide-react";

interface FacilityDetails {
  _id: string;
  facilityName: string;
  facilityType: string;
  imageUrl: string;
  location: string;
  pricePerHour: number;
  capacity: number;
  availableTimeSlots: string;
  description: string;
  ownerEmail: string;
  [key: string]: unknown;
}

interface FacilityDetailsCardProps {
  data: FacilityDetails;
}

const SLOTS = [
  "07:00 AM", "09:00 AM", "11:00 AM",
  "01:00 PM", "04:00 PM", "06:00 PM",
];

const FacilityDetailsCard = ({ data }: FacilityDetailsCardProps) => {
  const router = useRouter();
  const {
    _id, facilityName, facilityType, imageUrl, location,
    pricePerHour, capacity, availableTimeSlots, description, ownerEmail,
  } = data;

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [bookingDate, setBookingDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [hours, setHours] = useState(1);

  const totalPrice = Number(pricePerHour) * hours;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { router.push("/login"); return; }
    if (!selectedSlot) { toast.error("Please select a time slot"); return; }
    if (!bookingDate) { toast.error("Please select a date"); return; }

    const bookingData = {
      user_name: user.name,
      user_image: user.image,
      user_id: user.id,
      user_email: user.email,
      facility_id: _id,
      facility_name: facilityName,
      facility_img: imageUrl,
      booking_date: bookingDate,
      time_slot: selectedSlot,
      hours,
      total_price: totalPrice,
      status: "pending",
    };

    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(bookingData),
        },
      );
      const result = await res.json();
      if (result?.acknowledged) {
        toast.success("Booking successful!");
        router.push("/my-bookings");
      } else {
        toast.error("Booking failed!");
      }
    } catch {
      toast.error("Server error! Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* ── Back button ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to facilities
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left Column: Image + Info ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden card-premium">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={facilityName}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-emerald-700 shadow-premium-sm">
                  {facilityType}
                </span>
              </div>
            </div>

            {/* Detail cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="card-premium p-5">
                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                  <DollarSign size={16} />
                  <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Price</span>
                </div>
                <p className="text-2xl font-black text-slate-900">${pricePerHour}<span className="text-sm font-medium text-slate-400">/hr</span></p>
              </div>
              <div className="card-premium p-5">
                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                  <Users size={16} />
                  <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Capacity</span>
                </div>
                <p className="text-2xl font-black text-slate-900">{capacity} <span className="text-sm font-medium text-slate-400">players</span></p>
              </div>
              <div className="card-premium p-5">
                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                  <Shield size={16} />
                  <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Owner</span>
                </div>
                <p className="text-sm font-semibold text-slate-700 truncate">{ownerEmail}</p>
              </div>
            </div>

            {/* Description */}
            <div className="card-premium p-6 sm:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-3">About this venue</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
            </div>

            {/* Available Time */}
            <div className="card-premium p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={18} className="text-emerald-600" />
                <h2 className="text-lg font-bold text-slate-900">Availability</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{availableTimeSlots}</p>
            </div>
          </div>

          {/* ── Right Column: Booking Form ── */}
          <div className="lg:col-span-1">
            <div className="card-premium p-6 sm:p-8 sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Book this venue</h3>

              <form onSubmit={handleBookingSubmit} className="space-y-5">
                {/* Date */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">
                    <Calendar size={14} className="text-emerald-500" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
                  />
                </div>

                {/* Time Slots */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">
                    <Clock size={14} className="text-emerald-500" />
                    Time Slot
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2.5 rounded-xl border text-xs font-medium transition-all duration-200 ${
                          selectedSlot === slot
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 bg-white text-slate-500 hover:border-emerald-200 hover:text-emerald-600"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hours */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">
                    Duration
                  </label>
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-1">
                    <button
                      type="button"
                      onClick={() => setHours((p) => Math.max(1, p - 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-sm font-bold text-slate-900">{hours} hour{hours > 1 ? "s" : ""}</span>
                    <button
                      type="button"
                      onClick={() => setHours((p) => p + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="rounded-2xl bg-slate-50 p-5 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">${pricePerHour} × {hours} hr</span>
                    <span className="text-slate-700">${pricePerHour * hours}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between">
                    <span className="text-sm font-bold text-slate-900">Total</span>
                    <span className="text-xl font-black text-emerald-600">${totalPrice}</span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-sm font-bold tracking-wide text-white shadow-premium-lg transition-all duration-300 hover:shadow-premium-xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetailsCard;
