"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Animate from "@/components/animation/Animate";

export default function SpecialOfferBanner({ lang = "en", offerProducts = [] }) {
  const isAr = lang === "ar";
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Filter products that are currently active based on dates
  const activeOffers = offerProducts.filter((offer) => {
    const now = new Date();
    const startDate = offer.offerStartDate ? new Date(offer.offerStartDate) : null;
    const endDate = offer.offerEndDate ? new Date(offer.offerEndDate) : null;
    
    // Check if within date range (or if no dates are set)
    const afterStart = !startDate || now >= startDate;
    const beforeEnd = !endDate || now <= endDate;
    return afterStart && beforeEnd;
  });

  // 2. Automatic Sliding Logic (4 Seconds)
  useEffect(() => {
    if (activeOffers.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeOffers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeOffers.length]);

  // If no offers are currently active, hide the banner
  if (activeOffers.length === 0) return null;

  const offerProduct = activeOffers[currentIndex];

  // Automagic Date Display formatting
  const formatOptions = { day: 'numeric', month: 'short' };
  const startDateObj = offerProduct.offerStartDate ? new Date(offerProduct.offerStartDate) : null;
  const endDateObj = offerProduct.offerEndDate ? new Date(offerProduct.offerEndDate) : null;
  const formattedStart = startDateObj ? startDateObj.toLocaleDateString(lang, formatOptions) : '';
  const formattedEnd = endDateObj ? endDateObj.toLocaleDateString(lang, formatOptions) : '';
  const dateDisplay = (startDateObj && endDateObj) ? `${formattedStart} - ${formattedEnd}` : '';

  // Dynamic Text from Sanity (with Safe Fallbacks)
  const badgeText = offerProduct.offerBadge || (isAr ? "لفترة محدودة • لا يلزم كود خصم" : "Limited Time Only • No Code Required");
  const title1 = offerProduct.offerTitle1 || (isAr ? "اشتر ١" : "BUY 1");
  const title2 = offerProduct.offerTitle2 || (isAr ? "واحصل على ١" : "GET 1");
  const subtitle = offerProduct.offerSubtitle || (isAr ? "مجاناً" : "FREE");
  const btnText = offerProduct.offerButtonText || (isAr ? "احصل على العرض" : "Claim This Offer");

  const imageUrl = offerProduct.mainImage?.asset?.url || "/hero.png";
  const slug = offerProduct.slug;

  return (
    <section className="relative w-full bg-[#050505] overflow-hidden py-16 lg:py-24 border-y border-white/5 selection:bg-white selection:text-[#E88C15]">
      
      {/* --- LAYER 1: DYNAMIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0 flex flex-col sm:flex-row pointer-events-none">
        <div className="w-full sm:w-[55%] h-full bg-[#E88C15] relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>
        <div className="w-full sm:w-[45%] h-full bg-[#080808]" />
      </div>

      {/* --- LAYER 2: KINETIC TYPOGRAPHY --- */}
      {/* The Key prop forces a re-animation when the slide changes */}
      <div key={`typo-${offerProduct._id}`} className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none overflow-hidden">
        <h2 className="text-[25vw] font-black text-white/[0.03] leading-none uppercase select-none tracking-tighter">
          {subtitle} {subtitle}
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <div key={offerProduct._id} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0 transition-opacity duration-500">
          
          {/* --- LEFT: PROMO CONTENT --- */}
          <div className={`w-full lg:w-1/2 flex flex-col ${isAr ? 'items-end text-right lg:order-2' : 'items-start text-left lg:order-1'}`}>
            <Animate y={20} opacity={0}>
               <span className="inline-block px-4 py-1 rounded-full bg-black text-[#E88C15] text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-xl">
                 {badgeText}
               </span>
            </Animate>

            <Animate y={20} opacity={0} delay={0.1}>
              <div className="space-y-0 mb-8">
                <h2 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                  {title1}
                </h2>
                <h2 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-transparent" style={{ WebkitTextStroke: '2px white' }}>
                  {title2}
                </h2>
              </div>
            </Animate>

            <Animate y={20} opacity={0} delay={0.2} className="flex flex-col gap-6 w-full lg:w-auto">
              <div className={`flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                 <div className="h-12 w-1 bg-white" />
                 <div>
                    <p className="text-white font-black text-2xl uppercase tracking-tighter leading-none italic">{subtitle}</p>
                    <p className="text-white/50 text-xs font-bold tracking-widest mt-1">
                      {dateDisplay}
                    </p>
                 </div>
              </div>

              <Link href={`/${lang}/product/${slug}`} className="w-full sm:w-fit">
                <button className="w-full px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-black hover:text-white transition-all duration-500 shadow-2xl active:scale-95 group">
                  {btnText}
                </button>
              </Link>
            </Animate>
          </div>

          {/* --- RIGHT: BURGER COMPOSITION --- */}
          <div className={`w-full lg:w-1/2 flex justify-center relative lg:order-1`}>
             <Animate scale={0.8} opacity={0} delay={0.3} duration={1}>
                <div className="relative w-[300px] sm:w-[500px] aspect-[4/3]">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#E88C15]/40 blur-[100px] rounded-full" />
                  
                  <div className={`absolute top-0 ${isAr ? 'right-0 rotate-6' : 'left-0 -rotate-6'} z-20 transform hover:scale-110 transition-transform duration-500`}>
                    <Image src={imageUrl} width={380} height={380} alt={offerProduct.name} className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]" />
                  </div>

                  <div className={`absolute bottom-0 ${isAr ? 'left-0 -rotate-12' : 'right-0 rotate-12'} z-30 transform hover:scale-110 transition-transform duration-500`}>
                    <Image src={imageUrl} width={380} height={380} alt={offerProduct.name} className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" />
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-10 opacity-30">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="fill-white">
                      <path d="M44.7,-76.4C58.3,-69.2,70,-58.1,78.2,-44.8C86.4,-31.5,91.1,-15.7,89.3,-0.6C87.6,14.4,79.4,28.8,69.5,40.1C59.5,51.3,47.9,59.3,35.2,65.3C22.5,71.3,8.7,75.3,-5.4,77.4C-19.5,79.5,-39,79.8,-53.4,73.1C-67.9,66.4,-77.3,52.8,-82.1,38.1C-86.8,23.3,-86.9,7.4,-83.4,-7.1C-79.8,-21.6,-72.7,-34.7,-62.4,-44.9C-52.1,-55.1,-38.7,-62.4,-25.2,-69.6C-11.7,-76.8,2,-84,15.7,-84.6C29.4,-85.2,31.1,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
                    </svg>
                  </div>
                </div>
             </Animate>
          </div>

        </div>

        {/* Carousel Pagination Dots */}
        {activeOffers.length > 1 && (
          <div className="flex justify-center mt-12 gap-3 relative z-30">
            {activeOffers.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 transition-all duration-500 rounded-full ${
                  currentIndex === i ? "w-8 bg-white" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Marquee Text */}
      <div className="mt-16 border-y border-white/5 py-4 overflow-hidden flex whitespace-nowrap bg-white text-black rotate-1">
        <div className="animate-marquee flex gap-8 font-black uppercase text-xs tracking-[0.5em] items-center">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex gap-8 items-center">
              {badgeText} <span className="w-2 h-2 rounded-full bg-black" />
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}