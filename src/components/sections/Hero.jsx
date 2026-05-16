"use client";

import Image from "next/image";
import Animate from "@/components/animation/Animate";

// Inline Multi-language Content Dictionary
const content = {
  en: {
    brand1: "Bite",
    brand2: "holic",
    nav: ["Menu", "Locations", "Our Story"],
    bookBtn: "Book Table",
    titleTop: "Satisfy",
    titleBottom: "Cravings",
    desc: "Fresh. Juicy. Unforgettable. Experience the pinnacle of gourmet burgers crafted with premium, secret ingredients.",
    orderBtn: "Order Now",
  },
  ar: {
    brand1: "بايت",
    brand2: "هوليك",
    nav: ["القائمة", "الفروع", "قصتنا"],
    bookBtn: "احجز طاولة",
    titleTop: "أشبع",
    titleBottom: "رغباتك",
    desc: "طازج. مليء بالعصارة. لا يُنسى. جرب قمة البرجر الفاخر المحضر بمكونات سرية ممتازة وعالية الجودة.",
    orderBtn: "اطلب الآن",
  }
};

export default function Hero({ lang = "en" }) {
  const t = content[lang] || content.en;
  const isAr = lang === "ar";

  return (
    <section className="relative min-h-[100dvh] w-full bg-[#050505] text-white overflow-hidden flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      {/* --- LAYER 1: 50/50 Split Background (z-0) --- */}
      <div className="absolute inset-0 z-0 flex flex-col pointer-events-none">
        {/* Exact 50% Top: Premium Solid Orange */}
        <div className="h-1/2 w-full bg-[#E88C15]" />
        {/* Exact 50% Bottom: Deep Black */}
        <div className="h-1/2 w-full bg-[#050505]" />
      </div>

     

      {/* --- LAYER 3: Massive Typography (z-10) --- */}
      {/* Top Text - Centered in the top Orange half */}
      <div className="absolute top-[15%] lg:top-[12%] w-full flex justify-center z-10 pointer-events-none px-4">
        <Animate y={20} opacity={0} delay={0.1}>
          <h1 className="text-[18vw] lg:text-[16vw] font-black leading-none tracking-tighter text-white uppercase">
            {t.titleTop}
          </h1>
        </Animate>
      </div>

      {/* Bottom Text - Centered in the bottom Black half */}
      <div className="absolute bottom-[22%] lg:bottom-[20%] w-full flex justify-center z-10 pointer-events-none px-4">
        <Animate y={-20} opacity={0} delay={0.2}>
          <h1 className="text-[18vw] lg:text-[16vw] font-black leading-none tracking-tighter text-white uppercase">
            {t.titleBottom}
          </h1>
        </Animate>
      </div>

      {/* --- LAYER 4: The Centerpiece Burger & Pill (z-20) --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-[90rem] flex items-center justify-center pointer-events-none">
        <Animate scale={0.9} opacity={0} delay={0.3} duration={0.8} className="relative pointer-events-auto flex items-center justify-center">
          <div className="relative w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] lg:w-[700px] lg:h-[700px]">
            <Image
              src="/hero.png" // Replace with your transparent burger image
              alt="Premium Gourmet Burger"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 400px, (max-width: 1024px) 700px, 1000px"
            />
          </div>
        </Animate>
      </div>

      {/* --- LAYER 5: Bottom Content & CTA (z-30) --- */}
      <div className="absolute bottom-[4%] lg:bottom-[6%] w-full flex flex-col items-center justify-end z-30 px-6 pointer-events-auto text-center">
        
        <Animate y={15} opacity={0} delay={0.4}>
          <p className="text-[11px] sm:text-sm md:text-base text-gray-300 max-w-[280px] sm:max-w-sm lg:max-w-md font-light leading-relaxed">
            {t.desc}
          </p>
        </Animate>

        <Animate y={15} opacity={0} delay={0.5} className="mt-5 lg:mt-8">
          <button className="flex items-center gap-2 px-8 py-3.5 lg:px-10 lg:py-4 bg-[#E83300] hover:bg-[#FF5100] transition-colors rounded-full font-bold text-white text-sm lg:text-base group">
            {t.orderBtn}
            {/* Arrow flips automatically if the language is Arabic */}
            <svg className={`w-4 h-4 transform transition-transform duration-300 ${isAr ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </Animate>

      </div>

    </section>
  );
}