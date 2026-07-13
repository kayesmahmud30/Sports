import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MapPin, Users, Clock } from "lucide-react";

interface FacilityCardData {
  _id: string;
  facilityName: string;
  facilityType: string;
  imageUrl: string;
  location: string;
  pricePerHour: number;
  capacity: number;
  description: string;
  [key: string]: unknown;
}

interface CardfacilityProps {
  data: FacilityCardData;
  view?: "grid" | "list";
}

const Cardfacility = ({ data, view }: CardfacilityProps) => {
  const {
    facilityName,
    facilityType,
    imageUrl,
    location,
    pricePerHour,
    capacity,
    description,
    _id,
  } = data;

  const isList = view === "list";

  if (isList) {
    return (
      <Link href={`all-facilities/${_id}`} className="group block">
        <div className="card-premium overflow-hidden flex flex-row hover:-translate-y-0.5 transition-all duration-300">
          <div className="w-48 h-44 shrink-0 relative overflow-hidden">
            <Image
              width={400}
              height={400}
              src={imageUrl || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200"}
              alt={facilityName}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
            <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-emerald-700 backdrop-blur-sm shadow-premium-sm">
              {facilityType}
            </span>
          </div>
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                  {facilityName}
                </h3>
                <div className="text-right shrink-0">
                  <span className="text-xl font-black text-emerald-600">${pricePerHour}</span>
                  <span className="text-xs text-slate-400">/hr</span>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                <MapPin size={12} />
                <span>{location}</span>
              </div>
              <p className="mt-2 text-sm text-slate-500 line-clamp-2">{description}</p>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Users size={12} /> {capacity}</span>
              </div>
              <span className="text-xs font-semibold text-emerald-600 group-hover:underline underline-offset-2">
                Book Now →
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`all-facilities/${_id}`} className="group block">
      <div className="card-premium overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-all duration-300">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <Image
            width={400}
            height={400}
            src={imageUrl || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200"}
            alt={facilityName}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-emerald-700 backdrop-blur-sm shadow-premium-sm">
              {facilityType}
            </span>
          </div>
          <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-emerald-600 shadow-premium-sm">
            ${pricePerHour}<span className="text-[10px] text-slate-400 font-medium">/hr</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {facilityName}
          </h3>
          <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-400">
            <MapPin size={12} />
            <span className="line-clamp-1">{location}</span>
          </div>
          <p className="mt-3 text-sm text-slate-500 line-clamp-2 leading-relaxed flex-1">
            {description}
          </p>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Users size={13} />
              <span>Up to {capacity} players</span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 group-hover:underline underline-offset-2 transition-all">
              Book Now →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Cardfacility;
