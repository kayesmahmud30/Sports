/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";
import { FiSearch, FiGrid, FiList, FiSliders, FiDollarSign, FiChevronUp, FiChevronDown, FiChevronLeft, FiChevronRight, FiArrowUp, FiArrowDown } from "react-icons/fi";
import Cardfacility from "../Header/Card.jsx/Cardfacility";
import SkeletonCard from "../Skeleton/SkeletonCard";

interface AllfacilityProps {
  data?: unknown[];
}

interface Facility {
  _id: string;
  facilityName: string;
  facilityType: string;
  imageUrl: string;
  location: string;
  pricePerHour: number;
  capacity: number;
  description: string;
  ownerEmail?: string;
  [key: string]: unknown;
}

const FACILITY_TYPES = [
  "All Facilities",
  "Football Field",
  "Table Tennis",
  "Swimming Pool",
  "Boxing Ring",
  "Yoga Studio",
  "Volleyball Court",
  "Cricket Pitch",
  "Tennis Court",
  "Basketball Court",
  "Multi-Purpose Arena",
  "Gymnasium",
  "Badminton Court",
];

const Allfacility = ({ data: _initialData }: AllfacilityProps) => {
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("All Facilities");
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");

  const [loading, setLoading] = useState(true);

  // ── Price range state ──
  const [priceRangeMin, setPriceRangeMin] = useState<number | null>(null);
  const [priceRangeMax, setPriceRangeMax] = useState<number | null>(null);
  const [priceFilterOpen, setPriceFilterOpen] = useState(false);

  // ── Sort state ──
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc" | "price-asc" | "price-desc">("name-asc");

  // ── Pagination state ──
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const fetchFacilities = async () => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/facility?`;
    if (search) url += `search=${search}&`;
    if (sport !== "All Facilities") url += `sport=${sport}`;
    try {
      const res = await fetch(url);
      const data: Facility[] = await res.json();
      setFacilities(data);
    } catch {
      setFacilities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, [search, sport]);

  // ── Client-side price filter (nullable — only filter when user types) ──
  const filteredFacilities = facilities
    .filter((f) => {
      if (priceRangeMin !== null && f.pricePerHour < priceRangeMin) return false;
      if (priceRangeMax !== null && f.pricePerHour > priceRangeMax) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.facilityName.localeCompare(b.facilityName);
        case "name-desc":
          return b.facilityName.localeCompare(a.facilityName);
        case "price-asc":
          return a.pricePerHour - b.pricePerHour;
        case "price-desc":
          return b.pricePerHour - a.pricePerHour;
        default:
          return 0;
      }
    });

  // ── Pagination ──
  const totalPages = Math.max(1, Math.ceil(filteredFacilities.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedFacilities = filteredFacilities.slice(startIndex, endIndex);

  // Reset to page 1 when filters/sort/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, sport, priceRangeMin, priceRangeMax, sortBy]);

  // ── Generate visible page numbers with ellipsis ──
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const delta = 1; // siblings around current page

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      const rangeStart = Math.max(2, currentPage - delta);
      const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

      if (rangeStart > 2) pages.push("ellipsis");
      for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
      if (rangeEnd < totalPages - 1) pages.push("ellipsis");

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* ── Header ── */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                All Facilities
              </h1>
              <p className="mt-1 text-slate-500">
                {filteredFacilities.length} venue
                {filteredFacilities.length !== 1 ? "s" : ""} available
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => setView("grid")}
                className={`p-2.5 rounded-xl border transition-all duration-200 ${
                  view === "grid"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                    : "border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:border-slate-300"
                }`}
                aria-label="Grid view"
              >
                <FiGrid size={18} />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2.5 rounded-xl border transition-all duration-200 ${
                  view === "list"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                    : "border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:border-slate-300"
                }`}
                aria-label="List view"
              >
                <FiList size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* ── Search & Filters ── */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search facilities by name, location..."
              className="w-full h-12 rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50 outline-none"
            />
          </div>

          {/* Sport type filter */}
          <div className="relative shrink-0">
            <FiSliders className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="h-12 min-w-[180px] rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50 appearance-none cursor-pointer"
            >
              {FACILITY_TYPES.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* ── Sort dropdown ── */}
          <div className="relative shrink-0">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 flex flex-col items-center leading-none text-slate-400 pointer-events-none z-10">
              <FiArrowUp size={11} />
              <FiArrowDown size={11} className="-mt-0.5" />
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="h-12 min-w-[160px] rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50 appearance-none cursor-pointer"
            >
              <option value="name-asc">Name: A — Z</option>
              <option value="name-desc">Name: Z — A</option>
              <option value="price-asc">Price: Low — High</option>
              <option value="price-desc">Price: High — Low</option>
            </select>
          </div>

          {/* ── Price Range with Toggle ── */}
          <div className="relative shrink-0 w-full lg:w-[220px] bg-white rounded-2xl border border-slate-200 px-4 py-2.5 transition-all duration-200">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <FiDollarSign size={13} className="text-emerald-500" />
                Price
              </label>
              <button
                onClick={() => {
                  if (priceFilterOpen) {
                    // Clear price filter when hiding
                    setPriceRangeMin(null);
                    setPriceRangeMax(null);
                  }
                  setPriceFilterOpen(!priceFilterOpen);
                }}
                className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                  priceFilterOpen
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-slate-100 text-slate-400 hover:text-slate-600"
                }`}
              >
                {priceFilterOpen ? (
                  <><FiChevronUp size={12} /> Hide</>
                ) : (
                  <><FiChevronDown size={12} /> Filter</>
                )}
              </button>
            </div>

            {priceFilterOpen && (
              <div className="flex items-center gap-2 mt-3 animate-fadeIn">
                {/* Min price */}
                <div className="relative flex-1">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    value={priceRangeMin === null ? "" : priceRangeMin}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (raw === "") {
                        setPriceRangeMin(null);
                        return;
                      }
                      const val = Number(raw);
                      if (!isNaN(val)) setPriceRangeMin(val);
                    }}
                    className="w-full h-9 rounded-xl border border-slate-200 bg-white pl-6 pr-3 text-sm font-semibold text-slate-700 tabular-nums outline-none transition-all duration-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="Min"
                    aria-label="Minimum price"
                  />
                </div>

                <span className="text-[10px] font-semibold text-slate-300 shrink-0">—</span>

                {/* Max price */}
                <div className="relative flex-1">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    value={priceRangeMax === null ? "" : priceRangeMax}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (raw === "") {
                        setPriceRangeMax(null);
                        return;
                      }
                      const val = Number(raw);
                      if (!isNaN(val)) setPriceRangeMax(val);
                    }}
                    className="w-full h-9 rounded-xl border border-slate-200 bg-white pl-6 pr-3 text-sm font-semibold text-slate-700 tabular-nums outline-none transition-all duration-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="Max"
                    aria-label="Maximum price"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Results ── */}
        {loading ? (
          /* ── Skeleton Grid / List ── */
          <div
            className={`transition-all duration-500 ease-in-out ${
              view === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                : "grid grid-cols-1 gap-4"
            }`}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} view={view} />
            ))}
          </div>
        ) : filteredFacilities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="rounded-2xl bg-slate-100 p-6 mb-4">
              <FiSearch size={32} className="text-slate-300" />
            </div>
            <p className="text-lg font-medium text-slate-600">No facilities found</p>
            <p className="text-sm text-slate-400 mt-1">
              Try adjusting your search, filter, or price range
            </p>
          </div>
        ) : (
          <div
            className={`transition-all duration-500 ease-in-out ${
              view === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                : "grid grid-cols-1 gap-4"
            }`}
          >
            {paginatedFacilities.map((item) => (
              <Cardfacility key={item._id} data={item} view={view} />
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {filteredFacilities.length > ITEMS_PER_PAGE && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-4 border-t border-slate-100">
            <p className="text-sm text-slate-500 order-2 sm:order-1">
              Showing{" "}
              <span className="font-medium text-slate-700">{startIndex + 1}</span>
              {" — "}
              <span className="font-medium text-slate-700">
                {Math.min(endIndex, filteredFacilities.length)}
              </span>
              {" of "}
              <span className="font-medium text-slate-700">{filteredFacilities.length}</span>{" "}
              results
            </p>

            <div className="flex items-center gap-1.5 order-1 sm:order-2">
              {/* Prev button */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center justify-center w-9 h-9 rounded-xl border transition-all duration-200 ${
                  currentPage === 1
                    ? "border-slate-100 text-slate-300 cursor-not-allowed"
                    : "border-slate-200 text-slate-500 hover:border-emerald-200 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
                aria-label="Previous page"
              >
                <FiChevronLeft size={16} />
              </button>

              {/* Page numbers */}
              {getPageNumbers().map((page, idx) =>
                page === "ellipsis" ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="flex items-center justify-center w-9 h-9 text-xs text-slate-300 select-none"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`flex items-center justify-center w-9 h-9 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                      page === currentPage
                        ? "border-emerald-200 bg-emerald-50 text-emerald-600 shadow-sm"
                        : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700 hover:bg-slate-50"
                    }`}
                    aria-label={`Page ${page}`}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Next button */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center w-9 h-9 rounded-xl border transition-all duration-200 ${
                  currentPage === totalPages
                    ? "border-slate-100 text-slate-300 cursor-not-allowed"
                    : "border-slate-200 text-slate-500 hover:border-emerald-200 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
                aria-label="Next page"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Allfacility;
