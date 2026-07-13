import Hero from "./components/Header/Hero";
import Cardfacility from "./components/Header/Card.jsx/Cardfacility";
import WhyChooseUs from "./components/Features/WhyChooseUs";
import UpcomingEvents from "./Events/page";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import QNA from "./components/Landing/QNA";
import Testimonials from "./components/Landing/Testimonials";
import JoinNewsLetter from "./components/Landing/JoinNewsLetter";
import Statistics from "./components/Landing/Statistics";

export interface FacilityData {
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

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/facility`,
    { cache: "no-cache" },
  );
  const data: FacilityData[] = await res.json();

  return (
    <>
      <Hero />

      {/* ── Featured Facilities ── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-700 mb-3">
                FEATURED
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Top-Rated Facilities
              </h2>
              <p className="mt-2 text-slate-500 max-w-xl">
                Hand-picked premium venues ready for your next game. Book the
                best courts and fields near you.
              </p>
            </div>
            <Link
              href="/all-facilities"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors shrink-0"
            >
              View All Facilities
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.slice(0, 8).map((item) => (
              <Cardfacility key={item._id} data={item} />
            ))}
          </div>
        </div>
      </section>

      <UpcomingEvents />
      <WhyChooseUs />
      <Statistics />
      <QNA />
      <Testimonials />
      <JoinNewsLetter />
    </>
  );
}
