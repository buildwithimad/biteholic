"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Inline Multi-language Content Dictionary
const content = {
  en: {
    title: "Welcome to BiteHolic",
    subtitle: "Premium handcrafted burgers made fresh daily.\nOrder online or scan the QR code to begin.",
    scanTitle: "Scan Me!",
    scanDesc: "Order Directly Via WhatsApp",
    orderTitle: "Order Now",
    loadingTitle: "Loading...",
    orderDesc: "Exciting flavors are on the way!\nGet ready for an amazing experience.",
    orderBtn: "View Menu",
    waLink: "https://wa.me/966530711252?text=Hello%20BiteHolic%20I%20want%20to%20place%20an%20order",
    menuLink: "/menu",
    waTitle: "WhatsApp",
    waSub: "Order via",
  },
  ar: {
    title: "مرحباً بكم في بايت هوليك",
    subtitle: "برجر فاخر يُحضّر يومياً بأفضل المكونات.\nاطلب الآن أو امسح رمز QR للبدء.",
    scanTitle: "امسح للطلب!",
    scanDesc: "اطلب مباشرة عبر واتساب",
    orderTitle: "اطلب الآن",
    loadingTitle: "جاري التحميل...",
    orderDesc: "نكهات رائعة في الطريق إليك!\nاستعد لتجربة لا تُنسى.",
    orderBtn: "عرض القائمة",
    waLink: "https://wa.me/966530711252?text=Hello%20BiteHolic%20I%20want%20to%20place%20an%20order",
    menuLink: "/menu",
    waTitle: "واتساب",
    waSub: "اطلب عبر",
  }
};

export default function Hero({ lang = "en" }) {
  const t = content[lang] || content.en;
  const isAr = lang === "ar";
  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="relative min-h-[100vh] w-full bg-[#050505] text-[#FFFFFF] overflow-hidden flex flex-col items-center justify-start text-start"
    >
      {/* 
        OPTIMIZATION: CSS Animations injected directly. 
        Replaces Framer Motion entirely. 0kb JS cost. 
      */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes panRainbow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .rainbow-bg {
          background: linear-gradient(to right, #4285f4, #ea4335, #fbbc04, #34a853, #4285f4);
          background-size: 200% auto;
          animation: panRainbow 2s linear infinite;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .animate-fade-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-qr-ltr {
          animation: slideInLeft 0.6s ease-out 0.1s forwards;
          opacity: 0;
        }
        .animate-slide-qr-rtl {
          animation: slideInRight 0.6s ease-out 0.1s forwards;
          opacity: 0;
        }
        .animate-slide-order-ltr {
          animation: slideInRight 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }
        .animate-slide-order-rtl {
          animation: slideInLeft 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }
      `}} />

      {/* --- BACKGROUND VIDEO & OVERLAY --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* 
          OPTIMIZATION: Native HTML5 Responsive Video.
          Removes state delays, fixes hydration mismatches, and allows the browser to pre-fetch 
          the correct video before React even loads, massively improving LCP.
        */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source 
            src="https://res.cloudinary.com/duapi9qtk/video/upload/v1782023340/MobileHero_gptjon.webm" 
            media="(max-width: 767px)" 
            type="video/webm" 
          />
          <source 
            src="https://res.cloudinary.com/duapi9qtk/video/upload/v1782023562/DesktopHero_gw1mbg.webm" 
            media="(min-width: 768px)" 
            type="video/webm" 
          />
        </video>

        <div className="absolute inset-0 bg-[rgba(0,0,0,0.65)] z-10" />
      </div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="relative z-20 w-full max-w-[1200px] flex flex-col items-center justify-center px-6 py-20 mt-10">
        
        {/* HEADING AREA */}
        <div className="animate-fade-up flex flex-col items-center text-center w-full mb-10">
          
          {/* --- BRAND LOGO --- */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 drop-shadow-2xl">
            <Image 
              src="/logo.png" 
              alt="BiteHolic Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold mb-3 tracking-wide">
            {t.title}
          </h1>
          <p className="text-white text-sm md:text-base whitespace-pre-line max-w-2xl leading-relaxed">
            {t.subtitle}
          </p>
          
          <div className="w-full max-w-[1200px] border-b border-[rgba(255,255,255,0.15)] mt-8" />
        </div>

        {/* CONTENT AREA */}
        <div
          className={`flex gap-12 lg:gap-0 w-full max-w-[1050px] justify-between items-center ${
            isAr ? "flex-col-reverse lg:flex-row" : "flex-col lg:flex-row"
          }`}
        >
          {/* --- LEFT SECTION (QR CODE) --- */}
          <div className={`flex flex-col items-center text-center w-full lg:w-auto max-w-[320px] ${isAr ? 'animate-slide-qr-rtl' : 'animate-slide-qr-ltr'}`}>
            <h2 className="text-lg font-bold mb-4">{t.scanTitle}</h2>
            
            <Link href={t.waLink} target="_blank" rel="noopener noreferrer" className="relative w-40 h-40 bg-white rounded-xl p-2 mb-6 hover:scale-105 transition-transform duration-300">
              <Image
                src="/QR-code.png"
                alt="WhatsApp QR Code"
                fill
                className="object-contain rounded-lg p-1"
                sizes="160px"
              />
            </Link>

            {/* WhatsApp Button with Animated Rainbow Hover */}
            <div className="w-full flex justify-center mt-2">
              <Link href={t.waLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto block transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="relative group rounded-md p-[2px] cursor-pointer">
                  
                  {/* Rainbow background layer (visible only on hover) */}
                  <div className="absolute inset-0 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rainbow-bg" />
                  
                  {/* Inner button container */}
                  <div className="relative flex items-center justify-center gap-3 px-6 py-2.5 bg-[rgba(0,0,0,0.6)] hover:bg-black border border-white/60 group-hover:border-transparent rounded-md hover:rounded-none transition-colors duration-300 w-full h-full">
                    
                    {/* OPTIMIZATION: Replaced heavy react-icons import with raw inline SVG */}
                    <svg fill="currentColor" viewBox="0 0 448 512" height="24" width="24" className="text-white group-hover:text-[#25D366] transition-colors duration-300">
                       <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 414.7c-33.1 0-65.5-8.9-94-25.8l-6.7-4-69.8 18.3L72 334.3l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                    </svg>
                    
                    <div className="text-start">
                      <p className="text-[10px] text-gray-300 uppercase leading-none mb-0.5">{t.waSub}</p>
                      <p className="text-sm font-semibold text-white leading-tight">{t.waTitle}</p>
                    </div>
                  </div>

                </div>
              </Link>
            </div>
          </div>

          {/* --- RIGHT SECTION (ORDER NOW) --- */}
          <Link 
            href={`/${lang}${t.menuLink}`} 
            onClick={() => setIsNavigating(true)}
            className="block w-full lg:w-auto"
          >
            <div className={`flex flex-col items-center justify-center text-center border border-[#e88d15] bg-transparent hover:bg-white transition-all duration-700 ease-in-out py-10 px-8 rounded-xl w-full lg:w-[400px] max-w-full group cursor-pointer ${isAr ? 'animate-slide-order-rtl' : 'animate-slide-order-ltr'}`}>
              
              {/* Orange Circular Icon / Loading Spinner */}
              <div className="w-16 h-16 bg-[#E88D15] rounded-full flex items-center justify-center mb-6 transition-transform duration-700 ease-in-out group-hover:scale-110 shadow-lg">
                {isNavigating ? (
                  <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                )}
              </div>

              <h2 className="text-xl font-bold mb-3 text-[#E88D15] transition-colors duration-700 ease-in-out">
                {isNavigating ? t.loadingTitle : t.orderTitle}
              </h2>
              <p className="text-[#E88D15] text-xs md:text-sm max-w-[320px] whitespace-pre-line transition-all duration-700 ease-in-out font-medium">
                {t.orderDesc}
              </p>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}