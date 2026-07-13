"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { Edit, Trash2, X } from "lucide-react";
import { FaTriangleExclamation } from "react-icons/fa6";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import type { Facility } from "@/lib/types";

interface ManageButtonProps {
  facility: Facility;
  onDelete: (id: string) => void;
  setFacilities: React.Dispatch<React.SetStateAction<Facility[]>>;
}

const Manage_button = ({ facility, onDelete, setFacilities }: ManageButtonProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    facilityName: facility?.facilityName || "",
    location: facility?.location || "",
    description: facility?.description || "",
    pricePerHour: facility?.pricePerHour?.toString() || "",
    capacity: facility?.capacity?.toString() || "",
  });

  const handleDeleteClick = async () => {
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/facility/${facility._id}`,
        {
          method: "DELETE",
          headers: { authorization: `Bearer ${tokenData?.token}` },
        },
      );
      if (res.ok) {
        toast.success("Deleted successfully!");
        setFacilities((prev) => prev.filter((item) => item._id !== facility._id));
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const handleUpdate = async () => {
    const { data: tokenData } = await authClient.token();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/facility/${facility._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(formData),
        },
      );
      const data = await res.json();
      if (data.modifiedCount > 0) {
        toast.success("Facility updated successfully!");
        setFacilities((prev) =>
          prev.map((item) =>
            item._id === facility._id
              ? { ...item, ...formData, pricePerHour: Number(formData.pricePerHour), capacity: Number(formData.capacity) }
              : item,
          ),
        );
        setIsEditOpen(false);
      } else {
        toast.info("No changes made");
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  return (
    <div className="mt-5 pt-4 border-t border-slate-100 flex gap-3 items-center flex-wrap">
      {/* Delete Button + Alert Dialog */}
      <AlertDialog>
        <Button
          className="group relative overflow-hidden rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 h-auto min-w-0 text-red-600 text-sm font-medium transition-all duration-200 hover:bg-red-100 hover:scale-[0.97] cursor-pointer"
        >
          <Trash2 size={15} />
          Delete
        </Button>

        <AlertDialog.Backdrop className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md px-4">
          <AlertDialog.Container>
            <AlertDialog.Dialog className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-premium-xl border border-slate-200 relative">
              <div className="p-7">
                <AlertDialog.Header className="text-center">
                  <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 border border-red-100 mb-4">
                    <FaTriangleExclamation className="text-red-500 text-3xl" />
                  </div>
                  <AlertDialog.Heading className="text-2xl font-bold text-slate-900">
                    Delete Facility?
                  </AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body className="text-center mt-2 text-slate-500 text-sm leading-relaxed">
                  This action cannot be undone. Your facility listing will be removed permanently.
                </AlertDialog.Body>
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                    {facility.facilityName}
                  </div>
                </div>
                <AlertDialog.Footer className="flex flex-col gap-3 mt-6">
                  <Button
                    onPress={handleDeleteClick}
                    className="h-11 rounded-2xl bg-red-500 text-sm font-bold text-white shadow-premium-md transition-all duration-200 hover:bg-red-600 hover:shadow-premium-lg hover:scale-[0.98] cursor-pointer"
                  >
                    Yes, Delete Listing
                  </Button>
                  <Button
                    variant="ghost"
                    slot="close"
                    className="h-11 rounded-2xl border border-slate-200 text-slate-600 text-sm font-medium transition-all duration-200 hover:bg-slate-50 hover:scale-[0.98] cursor-pointer"
                  >
                    Keep Listing
                  </Button>
                </AlertDialog.Footer>
              </div>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>

      {/* Edit Button */}
      <Button
        onPress={() => setIsEditOpen(true)}
        className="group relative overflow-hidden rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-2.5 h-auto min-w-0 text-emerald-700 text-sm font-medium transition-all duration-200 hover:bg-emerald-100 hover:scale-[0.97] cursor-pointer"
      >
        <Edit size={15} />
        Edit
      </Button>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-premium-xl border border-slate-200">
            <div className="relative p-7">
              {/* Close */}
              <button
                onClick={() => setIsEditOpen(false)}
                className="absolute top-5 right-5 flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
              >
                <X size={16} />
              </button>

              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Edit Facility</h2>
                <p className="text-sm text-slate-500 mt-1">Update your facility information</p>
              </div>

              {/* Inputs */}
              <div className="space-y-3.5">
                <input
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white outline-none text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
                  value={formData.facilityName}
                  onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
                  placeholder="Facility Name"
                />
                <input
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white outline-none text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Location"
                />
                <div className="grid grid-cols-2 gap-3.5">
                  <input
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white outline-none text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
                    value={formData.pricePerHour}
                    onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
                    placeholder="Price per hour"
                  />
                  <input
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white outline-none text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    placeholder="Capacity"
                  />
                </div>
                <textarea
                  rows={4}
                  className="w-full p-4 rounded-xl border border-slate-200 bg-white outline-none text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <Button
                  onPress={handleUpdate}
                  className="flex-1 h-11 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-sm font-bold text-white shadow-premium-md transition-all duration-200 hover:shadow-premium-lg hover:scale-[0.98] cursor-pointer"
                >
                  Save Changes
                </Button>
                <Button
                  variant="ghost"
                  onPress={() => setIsEditOpen(false)}
                  className="flex-1 h-11 rounded-2xl border border-slate-200 text-slate-600 text-sm font-medium transition-all duration-200 hover:bg-slate-50 hover:scale-[0.98] cursor-pointer"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage_button;
