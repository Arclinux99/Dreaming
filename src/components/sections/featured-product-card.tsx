"use client";

import Image from 'next/image';
import { ArrowRight, Upload } from 'lucide-react';

const FeaturedProductCard = () => {
  return (
    <section id="ProductInfo-template--17118947541162__featured_product_PJyUR6" className="bg-black text-foreground py-16 sm:py-24">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-12 items-center">
          {/* Image Column */}
          <div className="bg-card rounded-xl flex items-center justify-center p-8 aspect-square">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b844646f-2e66-43d4-a49f-75c25755ec0b-theeffectsguy-store/assets/images/FINALGIF32-ezgif.com-optimize-2-12.gif?"
              alt="Ultimate Creator Toolkit animated package"
              width={550}
              height={550}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>

          {/* Content Column */}
          <div className="flex flex-col gap-y-6">
            <p className="text-label-caption text-muted-foreground tracking-[0.05em]">
              THEEFFECTSGUY
            </p>
            
            <h2 className="text-product-title font-medium leading-[1.3]">
              Ultimate Creator Toolkit
            </h2>

            <div className="flex items-center gap-x-3 flex-wrap">
              <span className="text-price-small font-medium text-text-strikethrough line-through">
                $392.00 USD
              </span>
              <span className="text-price-large font-semibold text-foreground">
                $157.00 USD
              </span>
              <div className="bg-destructive text-destructive-foreground text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] leading-normal">
                Sale
              </div>
            </div>

            <form className="w-full">
              <button
                type="submit"
                className="w-full border border-white bg-transparent text-white rounded-full py-4 text-button font-medium tracking-[0.02em] hover:bg-white/10 transition-all duration-300"
              >
                ADD TO CART
              </button>
            </form>

            <p className="text-body-default text-muted-foreground">
              &#11088;{' '}
              <strong className="text-foreground">The</strong>{' '}
              <em className="italic text-foreground">only</em> plug-and-play system built to make videos. Look premium &amp; cohesive.&#x1F447;
            </p>

            <div className="flex justify-between items-center mt-4">
              <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Share product">
                <Upload className="w-5 h-5" />
              </button>

              <a href="#" className="inline-flex items-center gap-2 text-nav-link text-muted-foreground hover:text-foreground transition-colors tracking-[0.01em]">
                View full details
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductCard;