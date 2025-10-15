'use client';

import { useState } from 'react';
import NavigationHeader from '@/components/sections/navigation-header';
import HeroBanner from '@/components/sections/hero-banner';
import ProductCarousel from '@/components/sections/product-carousel';
import FeaturedProductCard from '@/components/sections/featured-product-card';
import PromotionalPopup from '@/components/sections/promotional-popup';
import AboutSection from '@/components/sections/about-section';
import EditingFeaturesSection from '@/components/sections/editing-features-section';
import NewsletterSignup from '@/components/sections/newsletter-signup';

export default function Home() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div className="min-h-screen bg-black">
      <NavigationHeader />
      
      <main>
        <HeroBanner />
        <ProductCarousel />
        <FeaturedProductCard />
        <AboutSection />
        <EditingFeaturesSection />
        <NewsletterSignup />
      </main>

      {showPopup && <PromotionalPopup />}
    </div>
  );
}