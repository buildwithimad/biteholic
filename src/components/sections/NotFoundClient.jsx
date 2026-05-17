"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Animate from "@/components/animation/Animate";

const uiText = {
  en: {
    bgText: "404",
    badge: "Error 404",
    title: "Lost in the sauce?",
    subtitle: "The page you're looking for has vanished, moved, or never existed in the first place.",
    btn: "Return to Home"
  },
  ar: {
    bgText: "٤٠٤",
    badge: "خطأ ٤٠٤",
    title: "فقدت طريقك؟",
    subtitle: "الصفحة التي تبحث عنها غير موجودة، تم نقلها، أو لم تكن موجودة من الأساس.",
    btn: "العودة للرئيسية"
  }
};

export default function NotFoundClient() {
  // Auto-detect language from the URL path!
  const pathname = usePathname();
  const lang = pathname?.startsWith("/ar") ? "ar" : "en";
  const ui = uiText[lang];

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden selection:bg-[#E88C15] selection:text-black">
      
      {/* --- MASSIVE BACKGROUND TYPOGRAPHY --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 opacity-[0.03]">
        <h1 className="text-[50vw] font-black uppercase leading-none tracking-tighter text-white">
          {ui.bgText}
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* --- ERROR CONTENT --- */}
        <Animate y={20} opacity={0}>
          <span className="bg-[#dc2626] text-white font-black tracking-[0.3em] uppercase text-[10px] px-4 py-1.5 mb-8 inline-block rounded-none">
            {ui.badge}
          </span>
        </Animate>

        <Animate y={20} opacity={0} delay={0.1}>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
            {ui.title}
          </h2>
        </Animate>

        <Animate y={20} opacity={0} delay={0.2}>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-lg mb-12">
            {ui.subtitle}
          </p>
        </Animate>

        {/* --- ACTION BUTTON --- */}
        <Animate y={20} opacity={0} delay={0.3}>
          <Link href={`/${lang}`}>
            <button className="px-10 py-5 bg-[#E88C15] cursor-pointer text-black font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs hover:bg-white transition-colors duration-300 rounded-none">
              {ui.btn}
            </button>
          </Link>
        </Animate>

        {/* --- VISUAL ACCENT LINE --- */}
        <Animate y={20} opacity={0} delay={0.4} className="mt-16 w-full flex justify-center">
          <div className="w-1/2 max-w-[150px] h-[1px] bg-gradient-to-r from-transparent via-[#E88C15] to-transparent opacity-50" />
        </Animate>

      </div>
    </section>
  );
}