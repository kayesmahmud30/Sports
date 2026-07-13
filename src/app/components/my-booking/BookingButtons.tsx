"use client";

import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { EyeIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaTriangleExclamation } from "react-icons/fa6";
import { toast } from "react-toastify";
import type { Booking } from "@/lib/types";

interface BookingButtonsProps {
  booking: Booking;
}

const BookingButtons = ({ booking }: BookingButtonsProps) => {
  const router = useRouter();

  const handlebooking_del = async () => {
    const { data: tokenData } = await authClient.token();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/bookings/${booking._id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );
      if (res.ok) {
        router.refresh();
        toast.success(`${booking.facility_name} is successfully removed`);
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Cancel Button + Alert Dialog */}
      <AlertDialog>
        <Button className="group relative overflow-hidden rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 h-auto min-w-0 text-red-600 text-sm font-medium transition-all duration-200 hover:bg-red-100 hover:scale-[0.97] cursor-pointer">
          <Trash2 size={15} />
          Cancel
        </Button>

        <AlertDialog.Backdrop className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md px-4">
          <AlertDialog.Container>
            <AlertDialog.Dialog className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-premium-xl border border-slate-200">
              <div className="p-7">
                <AlertDialog.Header className="text-center">
                  <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 border border-red-100 mb-4">
                    <FaTriangleExclamation className="text-red-500 text-3xl" />
                  </div>
                  <AlertDialog.Heading className="text-2xl font-bold text-slate-900">
                    Cancel Booking?
                  </AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body className="text-center mt-2 text-slate-500 text-sm leading-relaxed">
                  This action cannot be undone. Your reserved slot will be removed permanently.
                </AlertDialog.Body>
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                    {booking.des_name || booking.facility_name}
                  </div>
                </div>
                <AlertDialog.Footer className="flex flex-col gap-3 mt-6">
                  <Button
                    onPress={handlebooking_del}
                    className="h-11 rounded-2xl bg-red-500 text-sm font-bold text-white shadow-premium-md transition-all duration-200 hover:bg-red-600 hover:shadow-premium-lg hover:scale-[0.98] cursor-pointer"
                  >
                    Yes, Cancel Booking
                  </Button>
                  <Button
                    variant="ghost"
                    slot="close"
                    className="h-11 rounded-2xl border border-slate-200 text-slate-600 text-sm font-medium transition-all duration-200 hover:bg-slate-50 hover:scale-[0.98] cursor-pointer"
                  >
                    Keep Booking
                  </Button>
                </AlertDialog.Footer>
              </div>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>

      {/* View Button */}
      <Link
        href={`/all-facilities/${booking.facility_id}`}
        className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-sm font-medium text-emerald-700 transition-all duration-200 hover:bg-emerald-100 hover:scale-[0.97]"
      >
        <EyeIcon size={15} />
        View
      </Link>
    </div>
  );
};

export default BookingButtons;
