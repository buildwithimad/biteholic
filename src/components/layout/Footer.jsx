"use client";

import Link from "next/link";

// Inline Multi-language Content Dictionary
const content = {
  en: {
    brand: "BiteHolic",
    desc: "Premium handcrafted burgers made fresh daily.",
    copy: `© ${new Date().getFullYear()} BiteHolic. All rights reserved.`
  },
  ar: {
    brand: "بايت هوليك",
    desc: "برجر فاخر يُحضّر يومياً بأفضل المكونات.",
    copy: `© ${new Date().getFullYear()} بايت هوليك. جميع الحقوق محفوظة.`
  }
};

export default function Footer({ lang = "en" }) {
  const t = content[lang] || content.en;
  const isAr = lang === "ar";

  return (
    <footer 
      dir={isAr ? "rtl" : "ltr"} 
      className="w-full bg-[#e3e3e3] text-[#222222] pt-16 pb-8 px-6 shadow-md border-t border-[#e88d15]/20 selection:bg-[#e3e3e3] selection:text-white"
    >
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center">
        
        {/* --- TOP SECTION: Logo, Desc, and Socials --- */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          
          {/* Brand & Description */}
          <div className={`flex flex-col items-center md:items-start ${isAr ? "md:items-end" : ""}`}>
            <h2 className="text-3xl font-extrabold text-[#E88D15] tracking-wide mb-2" style={{ fontFamily: 'cursive, serif' }}>
              {t.brand}
            </h2>
            <p className="text-gray-600 text-sm text-center md:text-start">
              {t.desc}
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <Link href="#" className="w-10 h-10 rounded-full bg-white border border-[#E88D15]/30 flex items-center justify-center hover:bg-[#E88D15] hover:border-[#E88D15] transition-all duration-300 group shadow-sm">
              <svg className="w-5 h-5 text-[#E88D15] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="1.5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" strokeWidth="1.5" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Link>
            
            {/* X (Twitter) */}
            <Link href="#" className="w-10 h-10 rounded-full bg-white border border-[#E88D15]/30 flex items-center justify-center hover:bg-[#E88D15] hover:border-[#E88D15] transition-all duration-300 group shadow-sm">
              <svg className="w-4 h-4 text-[#E88D15] group-hover:text-white fill-current transition-colors duration-300" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.918H5.078z" />
              </svg>
            </Link>

            {/* Facebook */}
            <Link href="#" className="w-10 h-10 rounded-full bg-white border border-[#E88D15]/30 flex items-center justify-center hover:bg-[#E88D15] hover:border-[#E88D15] transition-all duration-300 group shadow-sm">
              <svg className="w-5 h-5 text-[#E88D15] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* --- DIVIDER --- */}
        <div className="w-full border-b border-[#E88D15]/20 mb-6" />

        {/* --- BOTTOM SECTION: Copyright --- */}
        <div className="w-full flex justify-center items-center">
          <p className="text-sm font-medium text-gray-500 text-center">
            {t.copy}
          </p>
        </div>

      </div>
    </footer>
  );
}