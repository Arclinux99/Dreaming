"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Product {
  id: number;
  title: string;
  staticImage: string;
  animatedImage: string | null;
  isSale: boolean;
  price: string;
  originalPrice: string | null;
  link: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "PXL Motion Bundle (Course + Pack)",
    staticImage: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b844646f-2e66-43d4-a49f-75c25755ec0b-theeffectsguy-store/assets/images/sdcard-ezgif.com-optimize-3-2.gif?",
    animatedImage: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b844646f-2e66-43d4-a49f-75c25755ec0b-theeffectsguy-store/assets/images/sdcard-ezgif.com-optimize-3-2.gif?",
    isSale: true,
    price: "$147.00 USD",
    originalPrice: "$375.00 USD",
    link: "https://theeffectsguy.store/products/pxl-motion-pack",
  },
  {
    id: 2,
    title: "Flashform Transition Pack",
    staticImage: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b844646f-2e66-43d4-a49f-75c25755ec0b-theeffectsguy-store/assets/images/transitionpack4-3.png?",
    animatedImage: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b844646f-2e66-43d4-a49f-75c25755ec0b-theeffectsguy-store/assets/images/flashform_7-ezgif.com-optimize-3-4.gif?",
    isSale: false,
    price: "$57.00 USD",
    originalPrice: null,
    link: "https://theeffectsguy.store/products/flashform-pack",
  },
  {
    id: 3,
    title: "Premium Overlay Pack",
    staticImage: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b844646f-2e66-43d4-a49f-75c25755ec0b-theeffectsguy-store/assets/images/overlayAnimationCovers3-5.png?",
    animatedImage: null,
    isSale: false,
    price: "$37.00 USD",
    originalPrice: null,
    link: "https://theeffectsguy.store/products/premium-overlay-pack",
  },
  {
    id: 4,
    title: "Clean Motion Sounds Pack",
    staticImage: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b844646f-2e66-43d4-a49f-75c25755ec0b-theeffectsguy-store/assets/images/EssentialSoundDesignPack4-7.png?",
    animatedImage: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b844646f-2e66-43d4-a49f-75c25755ec0b-theeffectsguy-store/assets/images/sfxpack-ezgif.com-optimize-8.gif?",
    isSale: false,
    price: "$67.00 USD",
    originalPrice: null,
    link: "https://theeffectsguy.store/products/essential-sound-design-pack",
  },
];

const ProductCard = ({ product }: { product: Product }) => (
  <div className="h-full">
    <Link 
      href={product.link}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] w-full">
        {product.isSale && (
          <div className="absolute top-3 right-3 z-10 rounded-[3px] bg-destructive px-2 py-[2px] text-[10px] font-medium uppercase text-destructive-foreground">
            Sale
          </div>
        )}
        <div className="relative h-full w-full">
          <Image
            src={product.staticImage}
            alt={product.title}
            width={533}
            height={400}
            className={`h-full w-full object-cover transition-opacity duration-300 ${product.animatedImage ? 'group-hover:opacity-0' : ''}`}
            unoptimized={product.staticImage.endsWith('.gif')}
          />
          {product.animatedImage && (
            <Image
              src={product.animatedImage}
              alt={`${product.title} animation`}
              width={533}
              height={400}
              unoptimized
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
        </div>
      </div>
      <div className="flex flex-grow flex-col p-5">
        <h3 className="flex-grow text-lg font-medium text-foreground">{product.title}</h3>
        <div className="mt-2 flex items-baseline gap-2 text-base">
          {product.originalPrice ? (
            <>
              <p className="font-medium text-foreground">{product.price.replace(" USD", "")}</p>
              <s className="text-[#808080]">{product.originalPrice.replace(" USD", "")}</s>
            </>
          ) : (
            <p className="font-medium text-foreground">{product.price.replace(" USD", "")}</p>
          )}
        </div>
      </div>
    </Link>
  </div>
);

export default function ProductCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);


    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-5 md:px-10">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="absolute left-[-22px] top-1/2 -translate-y-1/2 z-10 hidden h-11 w-11 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:opacity-50 md:flex" />
          <CarouselNext className="absolute right-[-22px] top-1/2 -translate-y-1/2 z-10 hidden h-11 w-11 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:opacity-50 md:flex" />
          
          <div className="mt-8 text-center md:hidden">
            <p className="text-sm font-normal text-muted-foreground">
              {current} / of {count}
            </p>
          </div>
        </Carousel>
      </div>
    </section>
  );
}