"use client";

import { useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle the form submission here.
    console.log("Submitted email for newsletter:", email);
  };

  return (
    <section className="bg-black bg-gradient-to-b from-[#0a0e27] to-black py-20 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-5xl font-semibold tracking-[-0.01em] text-foreground">
          Get Private Editing Tips 💻
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          No spam. Just better edits
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 mx-auto max-w-md"
        >
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address for newsletter"
              className="h-14 w-full rounded-md border-input bg-transparent px-4 pr-12 text-base text-foreground placeholder:text-white/40 focus-visible:ring-ring"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-3 -translate-y-1/2 h-8 w-8 text-foreground transition-opacity hover:bg-transparent hover:opacity-75 focus-visible:ring-0"
              aria-label="Subscribe"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </form>

        <div className="mt-16 flex justify-center">
          <Button
            asChild
            className="h-12 rounded-full bg-[#7359FF] px-8 text-base font-medium text-primary-foreground transition-colors hover:bg-[#5e48d9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <a href="https://theeffectsguy.store/products.atom" target="_blank" rel="noopener noreferrer">
              <Heart className="mr-2 h-4 w-4 fill-current" />
              Follow on shop
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;