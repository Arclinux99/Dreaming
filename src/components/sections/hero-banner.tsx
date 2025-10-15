import Link from 'next/link';
import React from 'react';

const HeroBanner = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center bg-black">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0a0e27]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center text-white">
        <h1 className="font-semibold leading-tight tracking-tight text-4xl sm:text-5xl md:text-[3.5rem] lg:text-6xl">
          Get Exclusive Pack Now!
        </h1>
        <p className="text-lg text-white/70 md:text-xl">
          Limited Time Offer
        </p>
        <Link
          href="/products/ultimate-creator-toolkit"
          className="mt-4 rounded-lg border border-white bg-transparent px-8 py-3 text-base font-medium text-white transition-colors duration-300 hover:bg-white/10"
        >
          See What’s Inside
        </Link>
      </div>
    </section>
  );
};

export default HeroBanner;