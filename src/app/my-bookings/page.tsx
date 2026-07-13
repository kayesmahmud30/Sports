import { auth } from "@/lib/auth";
import { Calendar, Tag, MapPin, Clock, DollarSign } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";
import BookingButtons from "../components/my-booking/BookingButtons";

interface BookingData {
  _id: string;
  user_name: string;
  user_image?: string;
  user_id: string;
  user_email: string;
  facility_id: string;
  facility_name: string;
  facility_img: string;
  booking_date: string;
  time_slot: string;
  hours: number;
  total_price: number;
  status: string;
}

const Mybookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-slate-600">Please login to view your bookings</h2>
          <p className="text-slate-400">Sign in to manage your reservations</p>
        </div>
      </div>
    );
  }

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/bookings/${user.id}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const data: BookingData[] = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            My Bookings
          </h1>
          <p className="mt-1 text-slate-500">
            {data?.length || 0} booking{data?.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {data?.map((booking) => (
          <div
            key={booking._id}
            className="card-premium overflow-hidden flex flex-col md:flex-row hover:-translate-y-0.5 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative w-full md:w-64 h-56 md:h-auto shrink-0 overflow-hidden">
              <Image
                fill
                src={booking.facility_img}
                alt={booking.facility_name}
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <span
                className={`absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold backdrop-blur-sm shadow-premium-sm ${
                  booking.status === "pending"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${booking.status === "pending" ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}`} />
                {booking.status}
              </span>
            </div>

            {/* Details */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {booking.facility_name}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={14} className="text-slate-400" />
                    <span className="text-slate-500">Date:</span>
                    <span className="font-medium text-slate-700">
                      {new Date(booking.booking_date).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={14} className="text-slate-400" />
                    <span className="text-slate-500">Slot:</span>
                    <span className="font-medium text-slate-700">{booking.time_slot}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Tag size={14} className="text-slate-400" />
                    <span className="text-slate-500">Hours:</span>
                    <span className="font-medium text-slate-700">{booking.hours} hr</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign size={14} className="text-slate-400" />
                    <span className="text-slate-500">Total:</span>
                    <span className="font-bold text-emerald-600">${booking.total_price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm col-span-2 sm:col-span-2">
                    <span className="text-slate-400">ID:</span>
                    <span className="font-mono text-xs text-slate-400">#{booking._id.slice(-8)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <BookingButtons booking={booking} />
              </div>
            </div>
          </div>
        ))}

        {/* Empty */}
        {(!data || data.length === 0) && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="rounded-2xl bg-slate-100 p-6 mb-4">
              <Calendar size={32} className="text-slate-300" />
            </div>
            <p className="text-lg font-medium text-slate-600">No bookings found</p>
            <p className="text-sm text-slate-400 mt-1">Start by exploring facilities and making a reservation</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mybookings;
