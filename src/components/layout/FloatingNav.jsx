"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

// Dictionary for navigation links
const navContent = {
  en: [
    { name: "Home", url: "/en", icon: <HomeIcon /> },
    { name: "Menu", url: "/en/menu", icon: <MenuIcon /> },
  ],
  ar: [
    { name: "الرئيسية", url: "/ar", icon: <HomeIcon /> },
    { name: "القائمة", url: "/ar/menu", icon: <MenuIcon /> },
  ]
};

export default function FloatingNav({ lang = "en" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const isAr = lang === "ar";
  const links = navContent[lang] || navContent.en;

  // Clear the full-screen loading state automatically when the route officially changes
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  const handleLinkClick = (url) => {
    setIsOpen(false);
    // Only show loading screen if we are actually navigating to a new page
    if (pathname !== url) {
      setIsNavigating(true);
    }
  };

  return (
    <>
      {/* --- FULL SCREEN LOADING OVERLAY (Strict Vercel-Style: No blurs, solid color) --- */}
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

      {/* --- NAVIGATION DOCK --- */}
      <div 
        dir={isAr ? "rtl" : "ltr"} 
        className="fixed bottom-6 end-6 z-[100] font-sans flex items-center gap-3"
      >
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, x: isAr ? -20 : 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: isAr ? -20 : 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-1 p-1.5 bg-[#111111] border border-white/10 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-x-auto no-scrollbar max-w-[calc(100vw-100px)]"
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
            </motion.nav>
          )}
        </AnimatePresence>

        {/* --- FLOATING ACTION BUTTON --- */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation"
          className="relative w-14 h-14 flex-shrink-0 rounded-full bg-[#E88D15] text-black flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 shadow-[0_8px_30px_rgba(232,141,21,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] focus-visible:ring-[#E88D15]"
        >
          {/* Animated Plus to X Icon */}
          <svg 
            className={`w-6 h-6 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-[135deg]" : "rotate-0"}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* Styles for hiding scrollbars on very small mobile screens */}
        <style dangerouslySetInnerHTML={{__html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
      </div>
    </>
  );
}