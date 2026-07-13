import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import Nav from "./components/Header/Nav";
import { ToastContainer } from "react-toastify";
import Foot from "./components/Footer/Foot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SportNest — Book Premium Sports Facilities",
  description: "Discover and book world-class sports facilities, courts, and training arenas. Train harder, play smarter with SportNest.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-theme text-theme">
        <Nav />
        <main className="flex-1">
          {children}
        </main>
        <ToastContainer
          position="top-right"
          toastClassName="!rounded-2xl !shadow-premium-lg !border !border-theme !bg-surface !text-theme !text-sm !font-medium"
          autoClose={3000}
          hideProgressBar
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
        <Foot />
      </body>
    </html>
  );
}
