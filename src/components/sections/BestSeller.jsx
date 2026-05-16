"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Animate from "@/components/animation/Animate";

// Static UI text that doesn't come from the database
const uiText = {
  en: {
    bgText: "Legend",
    priceLabel: "The Investment",
    currency: "SAR",
    btn: "Secure Your Order",
    fallbackBadge: "Limited Availability"
  },
  ar: {
    bgText: "أسطورة",
    priceLabel: "الاستثمار",
    currency: "ريال",
    btn: "احجز طلبك الآن",
    fallbackBadge: "كمية محدودة"
  }
};

// Helper function to safely extract Sanity Image URLs
const getImageUrl = (imageObj) => {
  if (!imageObj) return null;
  if (typeof imageObj === 'string') return imageObj;
  if (imageObj?.asset?.url) return imageObj.asset.url;
  return "/FeaturedBurgers/Burger.png"; // Fallback image
};

export default function BestSeller({ lang = "en", products = [] }) {
  const ui = uiText[lang] || uiText.en;
  const isAr = lang === "ar";

  // Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);

  // Limit to max 5 best sellers
  const displayProducts = products?.slice(0, 5) || [];

  // If there are no best sellers in the database, don't render the section
  if (displayProducts.length === 0) return null;

  // The currently active product
  const product = displayProducts[currentIndex];

  // Carousel Handlers
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % displayProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + displayProducts.length) % displayProducts.length);
  };

  // Extract variables safely for the CURRENT product
  const imageUrl = getImageUrl(product.mainImage);
  const slug = product.slug?.current || product.slug;
  const currentPrice = (product.isOnSale && product.discountPrice) ? product.discountPrice : product.price;
  
  // Split the name into two lines for the massive typography effect
  const nameParts = product.name?.split(" ") || ["Best", "Seller"];
  const title1 = nameParts[0];
  const title2 = nameParts.slice(1).join(" ");

  return (
    <section className="relative w-full bg-[#050505] py-24 lg:py-40 overflow-hidden selection:bg-[#E88C15] selection:text-black">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-20">
         <h2 className="text-[40vw] font-black text-[#111] uppercase tracking-tighter leading-none transition-all duration-1000">
            {ui.bgText}
         </h2>
      </div>

      <div className="max-w-[90rem] mx-auto px-6 relative z-10">
        
        {/* We use key={product._id} here so React unmounts and remounts this block, 
            causing your <Animate> tags to re-fire on every slide change */}
        <div key={product._id || currentIndex} className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* --- PRODUCT IMAGE WITH GLOW --- */}
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start group">
            <Animate scale={0.8} opacity={0} duration={1.2}>
              <div className="relative w-[300px] sm:w-[500px] lg:w-[650px] aspect-square">
                {/* Background Radial Glow */}
                <div className="absolute inset-0 bg-[#E88C15]/20 blur-[120px] rounded-full scale-75 group-hover:bg-[#E88C15]/30 transition-all duration-700" />
                
                <Image
                  src={imageUrl} 
                  alt={product.name}
                  fill
                  className="object-contain relative z-10 drop-shadow-[0_35px_60px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-2"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Animate>
            
            {/* Absolute Badge on Image */}
            <div className={`absolute top-10 ${isAr ? 'left-0' : 'right-0'} bg-white text-black px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl rotate-12 hidden md:block`}>
               {product.category?.name || "Best in Region"}
            </div>
          </div>

          {/* --- CONTENT BLOCK --- */}
          <div className={`w-full lg:w-1/2 flex flex-col ${isAr ? 'items-end text-right' : 'items-start text-left'}`}>
            
            <Animate y={-20} opacity={0}>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-[#E88C15]" />
                <span className="text-[#E88C15] font-black tracking-[0.3em] uppercase text-xs">
                  {product.badge || ui.fallbackBadge}
                </span>
              </div>
            </Animate>

            <Animate y={30} opacity={0} delay={0.1}>
              <h2 className="text-6xl sm:text-8xl xl:text-[9rem] font-black tracking-tighter uppercase leading-[0.8] mb-8">
                {title1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
                  {title2}
                </span>
              </h2>
            </Animate>

            <Animate y={20} opacity={0} delay={0.2}>
              <p className="text-gray-400 text-lg lg:text-xl font-light leading-relaxed max-w-xl mb-10 min-h-[80px]">
                {product.shortDescription || "Experience the pinnacle of flavor engineering."}
              </p>
            </Animate>

            {/* Tags (Using Category if tags don't exist in schema) */}
            <Animate y={10} opacity={0} delay={0.3}>
              <div className="flex flex-wrap gap-3 mb-12">
                <span className="px-4 py-2 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest text-white hover:border-[#E88C15] transition-colors">
                  {product.category?.name || "Premium"}
                </span>
                {product.isOnSale && (
                  <span className="px-4 py-2 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest text-[#dc2626] hover:border-[#E88C15] transition-colors">
                    Sale Active
                  </span>
                )}
              </div>
            </Animate>

            {/* Price & Action - Bento Style Container */}
            <Animate y={40} opacity={0} delay={0.4} className="w-full">
               <div className={`flex flex-col sm:flex-row items-center gap-8 p-8 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm ${isAr ? 'sm:flex-row-reverse' : ''}`}>
                  <div className={`flex flex-col ${isAr ? 'items-end' : 'items-start'}`}>
                    <span className="text-[10px] font-bold text-[#E88C15] uppercase tracking-[0.2em] mb-1">{ui.priceLabel}</span>
                    <div className="flex items-baseline gap-2">
                       <span className="text-5xl font-black text-white">{currentPrice}</span>
                       <span className="text-sm font-bold text-gray-500 uppercase">{ui.currency}</span>
                    </div>
                  </div>
                  
                  <div className={`hidden sm:block h-12 w-[1px] bg-white/10 mx-4`} />

                  {/* Route to the product page */}
                  <Link href={`/${lang}/product/${slug}`} className="flex-1 w-full">
                    <button className="w-full py-5 bg-[#E88C15] hover:bg-white text-black font-black uppercase tracking-[0.2em] text-xs transition-all duration-500 rounded-2xl shadow-[0_15px_30px_rgba(232,140,21,0.3)]">
                      {ui.btn}
                    </button>
                  </Link>
               </div>
            </Animate>

          </div>
        </div>

        {/* --- CAROUSEL CONTROLS --- */}
        {displayProducts.length > 1 && (
          <div className={`w-full flex flex-col sm:flex-row items-center justify-between mt-16 lg:mt-24 gap-6 ${isAr ? 'sm:flex-row-reverse' : ''}`}>
            
            {/* Pagination Dots */}
            <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
              {displayProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 transition-all duration-500 rounded-full ${
                    currentIndex === idx ? "w-10 bg-[#E88C15]" : "w-3 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className={`flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <button 
                onClick={prevSlide}
                aria-label="Previous Product"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-black/50 text-white hover:bg-[#E88C15] hover:border-[#E88C15] hover:text-black transition-all duration-300"
              >
                {/* Standard left arrow, flips automatically in RTL */}
                <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                aria-label="Next Product"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-black/50 text-white hover:bg-[#E88C15] hover:border-[#E88C15] hover:text-black transition-all duration-300"
              >
                {/* Standard right arrow, flips automatically in RTL */}
                <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}