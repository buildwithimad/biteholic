"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Inline Multi-language Content Dictionary
const content = {
  en: {
    badge: "Welcome to BiteHolic",
    title: "Premium Handcrafted Burgers",
    subtitle: "Made fresh daily with the finest ingredients. Experience the ultimate flavor journey.",
    scanTitle: "Scan to Order!",
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
    badge: "مرحباً بكم في بايت هوليك",
    title: "برجر فاخر يُحضّر يومياً",
    subtitle: "بأفضل المكونات الطازجة. استمتع بتجربة طعم لا تُنسى.",
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
      className="relative min-h-[100vh] w-full bg-[#050505] text-[#FFFFFF] overflow-hidden flex items-center"
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
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-fade-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-ltr {
          animation: slideInLeft 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }
        .animate-slide-rtl {
          animation: slideInRight 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        /* Gradient overlay animation */
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-animate {
          background: linear-gradient(-45deg, #E88D15, #ff9f1c, #E88D15, #ff6b35);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
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
            src="https://res.cloudinary.com/duapi9qtk/video/upload/v1782043876/HeroMobile_h5pnev.webm" 
            media="(max-width: 767px)" 
            type="video/webm" 
          />
          <source 
            src="https://res.cloudinary.com/duapi9qtk/video/upload/v1782043708/HeroDesktop_olaahg.webm" 
            media="(min-width: 768px)" 
            type="video/webm" 
          />
        </video>

        {/* Enhanced gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10" />
      </div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 py-12 md:py-20">
        
        {/* DESKTOP LAYOUT: Two-column grid */}
        <div className={`flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 ${isAr ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* --- LEFT SIDE: Content Area --- */}
          <div className={`w-full lg:w-1/2 flex flex-col items-start text-start space-y-8 ${isAr ? 'lg:items-end lg:text-end' : ''}`}>
            
            {/* Badge */}
            <div className="animate-fade-up">
              <span className="inline-block px-4 py-2 rounded-full bg-[#E88D15]/20 border border-[#E88D15]/40 text-[#E88D15] text-sm font-semibold tracking-wide uppercase">
                {t.badge}
              </span>
            </div>

            {/* Headline - Huge & Bold */}
            <h1 className="animate-fade-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tight">
              {t.title}
            </h1>

            {/* Description - Clean & Scannable */}
            <p className="animate-fade-up text-base sm:text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed font-light">
              {t.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className={`animate-fade-up flex flex-wrap gap-4 ${isAr ? 'flex-row-reverse' : ''}`} style={{ animationDelay: '0.4s' }}>
              
              {/* Primary CTA - Orange */}
              <Link 
                href={`/${lang}${t.menuLink}`} 
                onClick={() => setIsNavigating(true)}
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#E88D15] text-white font-bold text-lg transition-all duration-300 hover:bg-[#ff9f1c] hover:shadow-[0_0_40px_rgba(232,141,21,0.5)] hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {isNavigating ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t.loadingTitle}
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      {t.orderBtn}
                    </>
                  )}
                </span>
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff9f1c] to-[#E88D15] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              {/* Secondary CTA - Glass Style */}
              <Link 
                href={t.waLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:-translate-y-1"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 mr-2 text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                {t.waTitle}
              </Link>
            </div>
          </div>

          {/* --- RIGHT SIDE: Featured Card Area --- */}
          <div className={`w-full lg:w-1/2 flex justify-center lg:justify-end ${isAr ? 'lg:justify-start' : ''}`}>
            <div className="animate-slide-ltr relative w-full max-w-md">
              
              {/* Decorative blurred circle behind card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#E88D15]/30 blur-[100px] rounded-full pointer-events-none" />
              
              {/* Featured Promotion Card */}
              <div className="relative gradient-animate rounded-[32px] p-1 shadow-[0_20px_60px_rgba(232,141,21,0.3)] animate-float">
                <div className="bg-black/90 backdrop-blur-sm rounded-[31px] p-8 h-full">
                  
                  {/* QR Code Section */}
                  <div className="flex flex-col items-center space-y-6">
                    
                    {/* Logo */}
                    <div className="relative w-24 h-24 md:w-28 md:h-28 drop-shadow-2xl">
                      <Image 
                        src="/logo.png" 
                        alt="BiteHolic Logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>

                    {/* QR Code */}
                    <div className="relative w-48 h-48 md:w-56 md:h-56 bg-white rounded-2xl p-3 shadow-2xl">
                      <Image
                        src="/QR-code.png"
                        alt="WhatsApp QR Code"
                        fill
                        className="object-contain rounded-lg"
                        sizes="(max-width: 768px) 192px, 224px"
                        priority
                      />
                    </div>

                    {/* Scan Instructions */}
                    <div className="text-center space-y-2">
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        {t.scanTitle}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base">
                        {t.scanDesc}
                      </p>
                    </div>

                    {/* WhatsApp Button */}
                    <Link 
                      href={t.waLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full group"
                    >
                      <div className="relative w-full rounded-xl p-[2px] cursor-pointer overflow-hidden">
                        {/* Rainbow hover effect */}
                        <div className="absolute inset-0 rainbow-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Button Content */}
                        <div className="relative flex items-center justify-center gap-3 px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] rounded-xl transition-colors duration-300">
                          <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                          <div className="text-start">
                            <p className="text-xs text-white/80 uppercase leading-none mb-0.5">{t.waSub}</p>
                            <p className="text-base font-bold text-white leading-tight">{t.waTitle}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#E88D15]/40 blur-2xl rounded-full pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#ff6b35]/30 blur-xl rounded-full pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}