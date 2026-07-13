"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@heroui/react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

import { MapPin, Users, Plus, Building } from "lucide-react";
import Manage_button from "../components/manage-facility/Manage_button";
import type { Facility } from "@/lib/types";

const pulse = "animate-pulse bg-slate-200 rounded-lg";

const Bar = ({ className = "" }: { className?: string }) => (
  <div className={`${pulse} ${className}`} />
);

const ManageSkeletonCard = () => (
  <div className="card-premium overflow-hidden flex flex-col md:flex-row">
    <div className="md:w-72 h-56 md:h-auto shrink-0">
      <Bar className="h-full w-full rounded-none" />
    </div>
    <div className="flex-1 p-6 flex flex-col justify-between gap-3">
      <div className="space-y-3">
        <Bar className="h-6 w-2/3" />
        <Bar className="h-4 w-1/3" />
        <div className="space-y-2 mt-2">
          <Bar className="h-3 w-full" />
          <Bar className="h-3 w-4/5" />
        </div>
        <div className="flex items-center gap-5 mt-2">
          <Bar className="h-5 w-20" />
          <Bar className="h-4 w-24" />
        </div>
      </div>
      <Bar className="h-9 w-full rounded-xl mt-2" />
    </div>
  </div>
);

const MyFacilities = () => {
  const { data: session, isPending } = authClient.useSession();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loadingFacilities, setLoadingFacilities] = useState(false);

  useEffect(() => {
    const email = session?.user?.email;
    if (isPending || !email) return;

    const fetchFacilities = async () => {
      setLoadingFacilities(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/facility?ownerEmail=${encodeURIComponent(email)}`,
        );
        const data: Facility[] = await res.json();
        setFacilities(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load facilities");
      } finally {
        setLoadingFacilities(false);
      }
    };
    fetchFacilities();
  }, [session, isPending]);

  const handleDelete = async (id: string) => {
    const { data: tokenData } = await authClient.token();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/facility/${id}`,
        {
          method: "DELETE",
          headers: { authorization: `Bearer ${tokenData?.token}` },
        },
      );
      const data = await res.json();
      if (data.deletedCount > 0) {
        toast.success("Deleted Successfully");
        setFacilities((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error while deleting");
    }
  };

  if (isPending || loadingFacilities) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Skeleton Header */}
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <Bar className="h-10 w-48 mb-2" />
                <Bar className="h-4 w-24" />
              </div>
              <Bar className="h-11 w-36 rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Skeleton Cards */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <ManageSkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                My Facilities
              </h1>
              <p className="mt-1 text-slate-500">
                {facilities.length} listing{facilities.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Link href="/add-facilities">
              <Button className="h-11 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 text-sm font-bold tracking-wide text-white shadow-premium-md transition-all duration-300 hover:shadow-premium-lg hover:scale-[1.02] active:scale-[0.98]">
                <Plus size={16} />
                Add Facility
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        {facilities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="rounded-2xl bg-slate-100 p-6 mb-4">
              <Building size={32} className="text-slate-300" />
            </div>
            <p className="text-lg font-medium text-slate-600">No facilities yet</p>
            <p className="text-sm text-slate-400 mt-1 mb-6">Start by adding your first facility</p>
            <Link href="/add-facilities">
              <Button className="h-11 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 text-sm font-bold tracking-wide text-white shadow-premium-md transition-all duration-300 hover:shadow-premium-lg">
                + Add Facility
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {facilities.map((facility) => (
              <div
                key={facility._id}
                className="card-premium overflow-hidden flex flex-col md:flex-row hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Image */}
                <div className="md:w-72 h-56 md:h-auto relative overflow-hidden shrink-0">
                  <Image
                    src={facility.imageUrl || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200"}
                    alt={facility.facilityName}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{facility.facilityName}</h2>
                    <div className="flex items-center gap-1.5 mt-1.5 text-sm text-slate-400">
                      <MapPin size={14} />
                      <span>{facility.location}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-3 line-clamp-2">{facility.description}</p>
                    <div className="flex items-center gap-5 mt-4">
                      <span className="text-lg font-black text-emerald-600">${facility.pricePerHour}<span className="text-xs font-medium text-slate-400">/hr</span></span>
                      <div className="flex items-center gap-1.5 text-sm text-slate-400">
                        <Users size={14} />
                        <span>{facility.capacity} Players</span>
                      </div>
                    </div>
                  </div>

                  <Manage_button
                    facility={facility}
                    onDelete={handleDelete}
                    setFacilities={setFacilities}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFacilities;
