"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Clean Outline Icons
const HomeIcon = () => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const AboutIcon = () => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const ContactIcon = () => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Dictionary for navigation links
const navContent = {
  en: [
    { name: "Home", url: "/en", icon: <HomeIcon /> },
    { name: "Menu", url: "/en/menu", icon: <MenuIcon /> },
    { name: "About", url: "/en/about", icon: <AboutIcon /> },
  ],
  ar: [
    { name: "الرئيسية", url: "/ar", icon: <HomeIcon /> },
    { name: "القائمة", url: "/ar/menu", icon: <MenuIcon /> },
    { name: "من نحن", url: "/ar/about", icon: <AboutIcon /> },
  ]
};

export default function FloatingNav({ lang = "en" }) {
  const [isNavigating, setIsNavigating] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const isAr = lang === "ar";
  const links = navContent[lang] || navContent.en;
  
  // Language Switcher Setup
  const targetLang = isAr ? "en" : "ar";
  const switchLangText = isAr ? "EN" : "عربي";

  // Clear the full-screen loading state automatically when the route officially changes
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  const handleLinkClick = (url) => {
    // Only show loading screen if we are actually navigating to a new page
    if (pathname !== url) {
      setIsNavigating(true);
    }
  };

  // Bulletproof Language Switching Logic
  const handleLanguageSwitch = () => {
    if (!pathname) return;
    
    setIsNavigating(true); // Show loader during language switch

    // 1. Swap the language segment
    const segments = pathname.split("/");
    segments[1] = targetLang; 
    let newUrl = segments.join("/");

    // 2. Preserve any query parameters
    const currentSearchParams = searchParams.toString();
    if (currentSearchParams) {
      newUrl += `?${currentSearchParams}`;
    }

    // 3. Preserve any section hashes
    if (typeof window !== "undefined" && window.location.hash) {
      newUrl += window.location.hash;
    }

    router.push(newUrl);
  };

  return (
    <>
      {/* --- FULL SCREEN LOADING OVERLAY --- */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NAVIGATION DOCK (Centered App-Style) --- */}
      <div className="fixed bottom-6 inset-x-0 z-[100] flex justify-center px-4 font-sans pointer-events-none">
        
        <nav 
          dir={isAr ? "rtl" : "ltr"}
          className="pointer-events-auto flex items-center gap-1 p-1.5 bg-[#111111] border border-white/10 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-x-auto no-scrollbar max-w-full"
        >
          {links.map((link, index) => {
            // Check active status
            const isActive = link.url === `/${lang}` 
              ? pathname === link.url 
              : pathname.startsWith(link.url);

            return (
              <Link
                key={index}
                href={link.url}
                onClick={() => handleLinkClick(link.url)}
                className={`flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E88D15] whitespace-nowrap ${
                  isActive 
                    ? "bg-[#E88D15] text-black" 
                    : "bg-transparent text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <div className={`flex-shrink-0 transition-colors duration-300 ${isActive ? "text-black" : "text-gray-400"}`}>
                  {link.icon}
                </div>
                
                <span className={`text-[12px] sm:text-sm font-medium transition-all duration-300 ${isActive ? "block" : "hidden sm:block"}`}>
                  {link.name}
                </span>
              </Link>
            );
          })}

          {/* --- VERTICAL DIVIDER --- */}
          <div className="w-[1px] h-6 bg-white/10 mx-1 flex-shrink-0" />

          {/* --- LANGUAGE SWITCHER BUTTON --- */}
          <button
            onClick={handleLanguageSwitch}
            className="flex items-center cursor-pointer justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-transparent text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E88D15] whitespace-nowrap flex-shrink-0"
          >
            <div className="flex-shrink-0 text-gray-400">
              <GlobeIcon />
            </div>
            <span className="text-[12px] sm:text-sm font-medium uppercase tracking-widest hidden sm:block pt-0.5">
              {switchLangText}
            </span>
          </button>
        </nav>

        {/* Styles for hiding scrollbars on very small mobile screens */}
        <style dangerouslySetInnerHTML={{__html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
      </div>
    </>
  );
}