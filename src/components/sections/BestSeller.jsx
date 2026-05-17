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
    <section className="relative w-full  py-16 sm:py-24 lg:py-32 overflow-hidden selection:bg-[#E88C15] selection:text-black">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.03]">
         <h2 className="text-[30vw] md:text-[40vw] font-black text-white uppercase tracking-tighter leading-none transition-all duration-1000">
            {ui.bgText}
         </h2>
      </div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* We use key={product._id} here so React unmounts and remounts this block, 
            causing your <Animate> tags to re-fire on every slide change */}
        <div key={product._id || currentIndex} className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12 xl:gap-20">
          
          {/* --- PRODUCT IMAGE --- */}
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start group order-1 lg:order-none">
            <Animate scale={0.9} opacity={0} duration={0.8} className="w-full flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[280px] sm:max-w-[450px] lg:max-w-full aspect-square">
                
                <Image
                  src={imageUrl} 
                  alt={product.name}
                  fill
                  className="object-contain relative z-10 transition-transform duration-700 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Animate>
            
            {/* Absolute Badge on Image (Hidden on very small screens, visible on SM+) */}
            <div className={`absolute top-4 sm:top-10 ${isAr ? 'left-0' : 'right-0'} bg-white text-black px-4 sm:px-6 py-2 sm:py-3 font-black text-[10px] sm:text-xs uppercase tracking-widest hidden sm:block rounded-none`}>
               {product.category?.name || "Best in Region"}
            </div>
          </div>

          {/* --- CONTENT BLOCK --- */}
          <div className={`w-full lg:w-1/2 flex flex-col order-2 lg:order-none ${isAr ? 'items-end text-right' : 'items-start text-left'}`}>
            
            <Animate y={-20} opacity={0}>
              <div className={`flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="h-[1px] w-8 sm:w-12 bg-[#E88C15]" />
                <span className="text-[#E88C15] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-xs">
                  {product.badge || ui.fallbackBadge}
                </span>
              </div>
            </Animate>

            <Animate y={20} opacity={0} delay={0.1}>
              <h2 className="text-5xl sm:text-7xl md:text-8xl xl:text-[9rem] font-black tracking-tighter uppercase leading-[0.85] mb-6 sm:mb-8 text-white">
                {title1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
                  {title2}
                </span>
              </h2>
            </Animate>

            <Animate y={20} opacity={0} delay={0.2}>
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-xl mb-8 lg:mb-10 min-h-[60px] lg:min-h-[80px]">
                {product.shortDescription || "Experience the pinnacle of flavor engineering."}
              </p>
            </Animate>

            {/* Tags */}
            <Animate y={10} opacity={0} delay={0.3}>
              <div className={`flex flex-wrap gap-2 sm:gap-3 mb-8 lg:mb-12 ${isAr ? 'justify-end' : 'justify-start'}`}>
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#111] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white rounded-none">
                  {product.category?.name || "Premium"}
                </span>
                {product.isOnSale && (
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#dc2626]/10 text-[#dc2626] border border-[#dc2626]/30 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest rounded-none">
                    Sale Active
                  </span>
                )}
              </div>
            </Animate>

            {/* Price & Action Box */}
            <Animate y={30} opacity={0} delay={0.4} className="w-full">
               <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 p-6 sm:p-8 bg-[#111] border border-white/5 rounded-none w-full ${isAr ? 'sm:flex-row-reverse' : ''}`}>
                  
                  <div className={`flex flex-col ${isAr ? 'items-end' : 'items-start'} shrink-0`}>
                    <span className="text-[9px] sm:text-[10px] font-bold text-[#E88C15] uppercase tracking-[0.2em] mb-1">{ui.priceLabel}</span>
                    <div className={`flex items-baseline gap-2 ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
                       <span className="text-4xl sm:text-5xl font-black text-white leading-none">{currentPrice}</span>
                       <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase">{ui.currency}</span>
                    </div>
                  </div>
                  
                  <div className="hidden sm:block h-12 w-[1px] bg-white/10 mx-2" />

                  {/* Mobile Divider */}
                  <div className="block sm:hidden w-full h-[1px] bg-white/5 my-2" />

                  {/* Route to the product page */}
                  <Link href={`/${lang}/menu/${slug}`} className="flex-1 w-full">
                    <button className="w-full py-4 sm:py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] sm:text-xs transition-colors hover:bg-[#E88C15] hover:text-white rounded-none">
                      {ui.btn}
                    </button>
                  </Link>
               </div>
            </Animate>

          </div>
        </div>

        {/* --- CAROUSEL CONTROLS --- */}
        {displayProducts.length > 1 && (
          <div className={`w-full flex flex-col sm:flex-row items-center justify-between mt-12 lg:mt-20 gap-6 ${isAr ? 'sm:flex-row-reverse' : ''}`}>
            
            {/* Pagination Dots */}
            <div className={`flex items-center gap-2 sm:gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
              {displayProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1 transition-all duration-500 rounded-none ${
                    currentIndex === idx ? "w-8 sm:w-12 bg-[#E88C15]" : "w-3 sm:w-4 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className={`flex items-center gap-2 sm:gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <button 
                onClick={prevSlide}
                aria-label="Previous Product"
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#111] text-white hover:bg-[#E88C15] hover:text-black transition-colors rounded-none"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                aria-label="Next Product"
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#111] text-white hover:bg-[#E88C15] hover:text-black transition-colors rounded-none"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}