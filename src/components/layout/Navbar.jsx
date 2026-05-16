"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Animate from "@/components/animation/Animate";

// Inline Multi-language Content Dictionary
const content = {
  en: {
    brand1: "Bite",
    brand2: "holic",
    navLinks: ["Menu", "Locations", "Our Story"],
    bookBtn: "Book Table",
    close: "Close",
    switchLangText: "العربية", // Target language text
    targetLang: "ar"           // Target locale code
  },
  ar: {
    brand1: "بايت",
    brand2: "هوليك",
    navLinks: ["القائمة", "الفروع", "قصتنا"],
    bookBtn: "احجز طاولة",
    close: "إغلاق",
    switchLangText: "EN",      // Target language text
    targetLang: "en"           // Target locale code
  }
};

export default function Navbar({ lang = "en" }) {
  const t = content[lang] || content.en;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Next.js Navigation Hooks
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // --- THE BULLETPROOF LANGUAGE SWITCHER LOGIC ---
  const handleLanguageSwitch = (targetLocale) => {
    if (!pathname) return;

    // 1. Swap the language in the path (e.g., /en/contact -> /ar/contact)
    const segments = pathname.split("/");
    segments[1] = targetLocale; 
    let newUrl = segments.join("/");

    // 2. Preserve any query parameters (e.g., ?category=burgers)
    const currentSearchParams = searchParams.toString();
    if (currentSearchParams) {
      newUrl += `?${currentSearchParams}`;
    }

    // 3. Preserve any section hashes (e.g., #menu)
    if (typeof window !== "undefined" && window.location.hash) {
      newUrl += window.location.hash;
    }

    // Close mobile menu if open, then navigate
    setIsMobileOpen(false);
    router.push(newUrl);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 start-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? "bg-[#050505]/90 backdrop-blur-md border-white/10 py-4" 
            : "bg-transparent border-transparent py-6 lg:py-8"
        }`}
      >
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <Animate y={-10}>
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tighter cursor-pointer text-white">
              {t.brand1}
              <span className={isScrolled ? "text-[#E88C15] transition-colors" : "text-[#050505] transition-colors"}>
                {t.brand2}
              </span>
              <span className="text-[#E88C15]">.</span>
            </div>
          </Animate>
          
          {/* Desktop Navigation */}
          <Animate y={-10} delay={0.1} className="hidden md:block">
            <ul className="flex gap-10 text-sm font-semibold tracking-wide text-white/80">
              {t.navLinks.map((item, index) => (
                <li key={index} className="hover:text-[#E88C15] transition-colors cursor-pointer uppercase tracking-widest text-[11px] lg:text-xs">
                  {item}
                </li>
              ))}
            </ul>
          </Animate>

          {/* Actions Container */}
          <Animate y={-10} delay={0.2} className="flex items-center gap-3 sm:gap-4">
            
            {/* Desktop Language Switcher Button */}
            <button 
              onClick={() => handleLanguageSwitch(t.targetLang)}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-colors text-xs font-bold tracking-widest text-white uppercase"
            >
              {t.switchLangText}
            </button>

            {/* Desktop CTA */}
            <button className="hidden md:block text-xs lg:text-sm font-bold border border-white/20 bg-white/10 px-5 py-2 lg:px-6 lg:py-2.5 rounded-full hover:bg-white hover:text-black transition-colors text-white">
              {t.bookBtn}
            </button>

            {/* Mobile Hamburger Icon */}
            <button 
              className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5 focus:outline-none z-50 group"
              onClick={() => setIsMobileOpen(true)}
            >
              <span className="block w-6 h-0.5 bg-white group-hover:bg-[#E88C15] transition-colors" />
              <span className="block w-6 h-0.5 bg-white group-hover:bg-[#E88C15] transition-colors w-4 ms-auto" />
            </button>

          </Animate>
        </div>
      </header>

      {/* --- FULLSCREEN MOBILE MENU --- */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#050505] flex flex-col transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          <div className="text-xl font-extrabold tracking-tighter text-white">
            {t.brand1}<span className="text-[#E88C15]">{t.brand2}</span>.
          </div>
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            {t.close}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Links */}
        <div className="flex-1 flex flex-col justify-center px-6 gap-8">
          {t.navLinks.map((item, index) => (
            <a 
              key={index} 
              href="#" 
              onClick={() => setIsMobileOpen(false)}
              className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white hover:text-[#E88C15] transition-colors"
              style={{
                transform: isMobileOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isMobileOpen ? 1 : 0,
                transition: `all 0.5s ease ${0.3 + index * 0.1}s`
              }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Menu Footer */}
        <div className="px-6 py-8 mt-auto border-t border-white/10 flex flex-col gap-4">
          
          {/* Mobile Language Switcher Button */}
          <button 
            onClick={() => handleLanguageSwitch(t.targetLang)}
            className="flex items-center justify-center w-full py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-sm rounded-md hover:bg-white hover:text-black transition-colors"
          >
            Switch to {t.switchLangText === "EN" ? "English" : "العربية"}
          </button>

          {/* Mobile CTA */}
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="w-full py-4 bg-[#E88C15] text-[#050505] font-black uppercase tracking-widest text-sm rounded-md"
          >
            {t.bookBtn}
          </button>
        </div>
      </div>
    </>
  );
}