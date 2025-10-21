"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function PromotionalPopup() {
  const [isOpen, setIsOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(9 * 60 + 13); // Initial time from screenshot: 09:13

  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen, timeLeft]);

  if (!isOpen) {
    return null;
  }

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div className="fixed inset-0 bg-backdrop/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 bg-black rounded-lg overflow-hidden shadow-2xl">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-white/70 hover:text-white transition-opacity z-20"
          aria-label="Close promotional popup"
        >
          <X size={28} />
        </button>

        {/* Left Side: Offer Details */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-900 via-popover p-8 md:p-12 flex flex-col items-center justify-center text-center text-white">
          <div className="flex items-center space-x-4">
            <div>
              <div className="text-6xl md:text-7xl font-bold font-display tracking-tighter">
                {minutes}
              </div>
              <div className="text-xs font-body tracking-[0.2em] opacity-80 mt-1">
                MINS
              </div>
            </div>
            <div className="text-5xl font-bold font-display opacity-80 -mt-3">
              :
            </div>
            <div>
              <div className="text-6xl md:text-7xl font-bold font-display tracking-tighter">
                {seconds}
              </div>
              <div className="text-xs font-body tracking-[0.2em] opacity-80 mt-1">
                SECS
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold font-display mt-8">
            Limited Time DISCOUNT!
          </h2>
          <p className="text-lg md:text-xl font-bold font-body mt-2">
            GET 10% OFF YOUR 1ST ORDER!
          </p>

          <form className="w-full max-w-xs mt-8">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-white text-black placeholder-gray-500 rounded-md text-base text-center font-body focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <button
              type="submit"
              className="w-full p-3 mt-3 bg-primary text-primary-foreground font-semibold rounded-full text-base font-body hover:bg-accent transition-colors duration-300"
            >
              UNLOCK NOW
            </button>
          </form>
        </div>

        {/* Right Side: Image */}
        <div className="hidden md:block relative bg-secondary">
          <Image
            src="https://res.cloudinary.com/dwh2xecbx/image/upload/v1761009637/73198c5531a4fa6c4aa49de2fce873a1_t355uq.jpg"
            alt="Promotional image of Alexandru Jugrastan"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
          <div className="relative h-full flex flex-col justify-between p-8 text-white">
            <h3 className="font-display text-5xl font-extrabold uppercase text-right leading-none -mr-4 transform -skew-y-3 text-shadow">
              EXCLUSIVE
              <br />
              DISCOUNT
            </h3>
            <div className="text-left">
              <p className="font-display text-4xl font-extrabold uppercase">
                UNLOCK NOW!
              </p>
              <p className="font-body text-sm tracking-wider mt-1 opacity-70">
                ALEXANDRU JUGRASTAN
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .text-shadow {
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </div>
  );
}