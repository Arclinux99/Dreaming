"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  User,
  ShoppingCart,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

const NavigationHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b844646f-2e66-43d4-a49f-75c25755ec0b-theeffectsguy-store/assets/images/logo-1.png?";

  return (
    <>
      <div className="bg-black text-white">
        <div className="container text-center py-2.5 border-b border-border">
          <Link
            href="/products/pxl-motion-pack"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.05em] transition-opacity hover:opacity-70"
          >
            <span>NEW RELEASE!</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-40 w-full border-b border-border bg-black/90 backdrop-blur-sm">
        <div className="container">
          <div className="flex h-[70px] items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="hidden lg:flex items-center gap-8">
                <Link href="/">
                  <Image
                    src={logoUrl}
                    alt="theefffectsguy logo"
                    width={120}
                    height={25}
                    priority
                    className="h-auto w-[120px]"
                  />
                </Link>
                <nav>
                  <Link
                    href="/collections/all"
                    className="text-sm font-normal tracking-[0.01em] text-white transition-opacity hover:opacity-70"
                  >
                    Products
                  </Link>
                </nav>
              </div>
              <button
                className="lg:hidden"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6 text-white" />
              </button>
            </div>

            <div className="lg:hidden">
              <Link href="/">
                <Image
                  src={logoUrl}
                  alt="theefffectsguy logo"
                  width={110}
                  height={23}
                  priority
                  className="h-auto w-[110px]"
                />
              </Link>
            </div>

            <div className="flex items-center gap-4 lg:gap-6">
              <div className="hidden lg:block">
                <button className="flex items-center gap-2 text-sm text-white transition-opacity hover:opacity-70">
                  United States | USD $
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <Link href="/search" aria-label="Search" className="transition-opacity hover:opacity-70">
                <Search className="h-6 w-6 text-white" />
              </Link>
              <Link href="/account" aria-label="My account" className="transition-opacity hover:opacity-70">
                <User className="h-6 w-6 text-white" />
              </Link>
              <Link href="/cart" aria-label="Shopping cart" className="transition-opacity hover:opacity-70">
                <ShoppingCart className="h-6 w-6 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <div 
        className={`fixed inset-0 z-50 bg-black lg:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-modal="true"
        role="dialog"
      >
        <div className="container">
          <div className="flex h-[70px] items-center justify-between border-b border-border">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <Image
                src={logoUrl}
                alt="theefffectsguy logo"
                width={120}
                height={25}
                className="h-auto w-[120px]"
              />
            </Link>
            <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="mt-8">
            <nav className="flex flex-col gap-6 text-lg font-medium">
              <Link href="/collections/all" onClick={() => setIsMenuOpen(false)} className="text-white transition-opacity hover:opacity-70">
                Products
              </Link>
            </nav>
            <div className="mt-8 border-t border-border pt-6">
              <button className="flex w-full items-center justify-between text-base text-white transition-opacity hover:opacity-70">
                <span>United States | USD $</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationHeader;