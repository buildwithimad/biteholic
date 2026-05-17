"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Animate from "@/components/animation/Animate";

// Inline Multi-language Content Dictionary
const content = {
  en: {
    brand1: "Bite",
    brand2: "holic",
    navLinks: [
      { label: "Menu", href: "/menu" },
      { label: "Categories", href: "/menu?category=all" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" }
    ],
    close: "Close",
    switchLangText: "العربية", 
    targetLang: "ar",
    switchFullText: "Switch to العربية"
  },
  ar: {
    brand1: "بايت",
    brand2: "هوليك",
    navLinks: [
      { label: "القائمة", href: "/menu" },
      { label: "الفئات", href: "/menu?category=all" },
      { label: "من نحن", href: "/about" },
      { label: "اتصل بنا", href: "/contact" }
    ],
    close: "إغلاق",
    switchLangText: "EN",      
    targetLang: "en",
    switchFullText: "Switch to English"
  }
};

export default function Navbar({ lang = "en" }) {
  const t = content[lang] || content.en;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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

    // Close menu if open, then navigate
    setIsMenuOpen(false);
    router.push(newUrl);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 start-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-[#050505] border-b border-white/5 py-4" 
            : "bg-transparent border-b-0 py-6 lg:py-8"
        }`}
      >
        <div className="max-w-[90rem] mx-auto px-6 flex items-center justify-between relative">
          
          {/* Logo */}
          <Animate y={-10}>
            <Link href={`/${lang}`} className="text-2xl md:text-3xl font-black tracking-tighter text-white flex items-baseline">
              {t.brand1}
              <span className="text-[#E88C15]">{t.brand2}</span>
              <span className="text-[#E88C15] text-4xl leading-none">.</span>
            </Link>
          </Animate>
          
          {/* Actions Container */}
          <Animate y={-10} delay={0.1} className="flex items-center gap-4">
            
            {/* Language Switcher Button */}
            <button 
              onClick={() => handleLanguageSwitch(t.targetLang)}
              className="hidden sm:flex items-center justify-center px-5 py-3 border border-white/10 bg-[#111] hover:bg-white hover:text-black transition-colors text-[10px] font-bold tracking-widest text-white uppercase rounded-none"
            >
              {t.switchLangText}
            </button>

            {/* Hamburger Icon (Visible on all screens now) */}
            <button 
              className="flex flex-col items-center justify-center w-12 h-12 gap-1.5 focus:outline-none group bg-[#111] hover:bg-[#E88C15] transition-colors rounded-none border border-white/5"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Menu"
            >
              <span className="block w-5 h-[2px] bg-white group-hover:bg-black transition-colors" />
              <span className="block w-5 h-[2px] bg-white group-hover:bg-black transition-colors w-3 ms-auto" />
            </button>

          </Animate>
        </div>
      </header>

      {/* --- OVERLAY BACKDROP --- */}
      <div 
        className={`fixed inset-0 z-[90] bg-black/80 transition-opacity duration-500 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* --- SIDEBAR DRAWER MENU --- */}
      {/* Uses end-0 to anchor to the physical right in English, physical left in Arabic. 
        Uses translate-x-full (LTR) and rtl:-translate-x-full (RTL) for perfect directional sliding. 
      */}
      <div 
        className={`fixed top-0 end-0 h-full w-full sm:w-[450px] z-[100] bg-[#050505] border-s border-white/5 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMenuOpen ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-8 py-8 border-b border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Navigation
          </span>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="text-[10px] font-bold uppercase tracking-widest text-white hover:text-[#E88C15] transition-colors flex items-center gap-2 rounded-none"
          >
            {t.close}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex-1 flex flex-col justify-center px-8 gap-8 text-start">
          {t.navLinks.map((item, index) => (
            <Link 
              key={index} 
              href={`/${lang}${item.href}`} 
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white hover:text-[#E88C15] transition-colors w-fit"
              style={{
                transform: isMenuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isMenuOpen ? 1 : 0,
                transition: `all 0.4s ease ${0.1 + index * 0.1}s`
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="px-8 py-8 border-t border-white/5 mt-auto">
          {/* Mobile/Sidebar Language Switcher Button */}
          <button 
            onClick={() => handleLanguageSwitch(t.targetLang)}
            className="w-full py-5 bg-[#111] text-white font-bold uppercase tracking-widest text-[11px] hover:bg-white hover:text-black transition-colors rounded-none"
          >
            {t.switchFullText}
          </button>
        </div>
      </div>
    </>
  );
}