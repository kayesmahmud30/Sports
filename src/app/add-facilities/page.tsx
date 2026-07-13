"use client";

import { authClient } from "@/lib/auth-client";
import {
  FieldError,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  TextArea,
  Button,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { HiCheck, HiChevronDown } from "react-icons/hi";
import { toast } from "react-toastify";
import { MapPin, DollarSign, Users, Clock, FileText, Plus } from "lucide-react";
import type { FormEvent } from "react";

const AddFacilities = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const ownerEmail = session?.user?.email || "owner@sportnest.com";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const facilityData = Object.fromEntries(data.entries()) as Record<string, string>;
    facilityData.ownerEmail = ownerEmail;

    const { data: tokenData } = await authClient.token();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/facility`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(facilityData),
      },
    );

    if (res.ok) {
      toast.success("Facility added successfully!");
      router.push("/manage-facilities");
    } else {
      toast.error("Failed to add facility. Please try again.");
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50";

  const labelClass =
    "mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400";

  const facilityTypes = [
    "Football Pitch", "Basketball Court", "Tennis Court", "Badminton Court",
    "Swimming Pool", "Cricket Ground", "Volleyball Court", "Gymnasium",
    "Multi-Purpose Arena", "Padel Court", "Boxing Ring", "Yoga Studio",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-premium-md">
              <Plus size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Add Facility
              </h1>
              <p className="mt-1 text-slate-500">Launch a new sports venue on SportNest</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="card-premium p-8 sm:p-10">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Facility Name */}
              <div className="md:col-span-2">
                <TextField name="facilityName" isRequired>
                  <Label className={labelClass}>Facility Title</Label>
                  <Input
                    placeholder="e.g., Downtown Olympic Arena"
                    className={inputClass}
                  />
                  <FieldError className="mt-1 text-xs text-red-500" />
                </TextField>
              </div>

              {/* Category */}
              <div>
                <Label className={labelClass}>Category</Label>
                <Select name="facilityType" placeholder="Choose facility type" className="w-full">
                  <Select.Trigger
                    className={`${inputClass} flex cursor-pointer items-center justify-between`}
                  >
                    <Select.Value />
                    <Select.Indicator>
                      <HiChevronDown className="h-5 w-5 text-slate-400 transition-transform duration-300" />
                    </Select.Indicator>
                  </Select.Trigger>
                  <Select.Popover className="z-50 mt-2 w-[var(--trigger-width)]">
                    <ListBox className="max-h-64 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-premium-lg">
                      {facilityTypes.map((item: string) => (
                        <ListBox.Item
                          key={item}
                          id={item}
                          textValue={item}
                          className="group flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-600 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-700 focus:bg-emerald-50 focus:outline-none"
                        >
                          <span className="font-medium">{item}</span>
                          <ListBox.ItemIndicator>
                            <HiCheck className="h-4 w-4 text-emerald-500" />
                          </ListBox.ItemIndicator>
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
                <FieldError className="mt-1 text-xs text-red-500" />
              </div>

              {/* Image URL */}
              <div>
                <TextField name="imageUrl" isRequired>
                  <Label className={labelClass}>Image URL</Label>
                  <Input type="url" placeholder="https://facility-image.jpg" className={inputClass} />
                  <FieldError className="mt-1 text-xs text-red-500" />
                </TextField>
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <TextField name="location" isRequired>
                  <Label className={labelClass}>
                    <MapPin size={14} className="text-emerald-500" />
                    Venue Location
                  </Label>
                  <Input placeholder="Address or area" className={inputClass} />
                  <FieldError className="mt-1 text-xs text-red-500" />
                </TextField>
              </div>

              {/* Price */}
              <div>
                <TextField name="pricePerHour" isRequired>
                  <Label className={labelClass}>
                    <DollarSign size={14} className="text-emerald-500" />
                    Price Per Hour
                  </Label>
                  <Input type="number" placeholder="25" className={inputClass} />
                  <FieldError className="mt-1 text-xs text-red-500" />
                </TextField>
              </div>

              {/* Capacity */}
              <div>
                <TextField name="capacity" isRequired>
                  <Label className={labelClass}>
                    <Users size={14} className="text-emerald-500" />
                    Maximum Capacity
                  </Label>
                  <Input type="number" placeholder="12" className={inputClass} />
                  <FieldError className="mt-1 text-xs text-red-500" />
                </TextField>
              </div>

              {/* Time */}
              <div className="md:col-span-2">
                <TextField name="availableTimeSlots" isRequired>
                  <Label className={labelClass}>
                    <Clock size={14} className="text-emerald-500" />
                    Availability & Schedule
                  </Label>
                  <TextArea
                    placeholder={`Mon-Fri: 06:00 AM - 10:00 PM\nAvailable slots: 08:00 AM, 11:00 AM`}
                    className={`${inputClass} min-h-[120px] resize-none`}
                  />
                  <FieldError className="mt-1 text-xs text-red-500" />
                </TextField>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <TextField name="description" isRequired>
                  <Label className={labelClass}>
                    <FileText size={14} className="text-emerald-500" />
                    Overview & Amenities
                  </Label>
                  <TextArea
                    placeholder="Describe turf quality, parking, locker rooms, lighting, seating, equipment rentals..."
                    className={`${inputClass} min-h-[140px] resize-none`}
                  />
                  <FieldError className="mt-1 text-xs text-red-500" />
                </TextField>
              </div>

              {/* Hidden owner email */}
              <TextField name="ownerEmail" defaultValue={ownerEmail} className="hidden">
                <Input type="hidden" />
              </TextField>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-sm font-bold tracking-wide text-white shadow-premium-lg transition-all duration-300 hover:shadow-premium-xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                Confirm Submission
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFacilities;
