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
  const isAr = lang === "ar";

  return (
    <section 
      dir={isAr ? "rtl" : "ltr"}
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center bg-[#fcf9f0] text-gray-900 overflow-hidden selection:bg-[#E88D15] selection:text-white"
    >
      
      {/* --- MASSIVE BACKGROUND TYPOGRAPHY --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 opacity-5">
        <h1 className="text-[50vw] font-black uppercase leading-none tracking-tighter text-gray-900">
          {ui.bgText}
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* --- ERROR CONTENT --- */}
        <Animate y={20} opacity={0}>
          <span className="bg-red-500 text-white font-bold tracking-widest uppercase text-xs px-4 py-1.5 mb-8 inline-block rounded-full shadow-sm">
            {ui.badge}
          </span>
        </Animate>

        <Animate y={20} opacity={0} delay={0.1}>
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight uppercase leading-[1.1] mb-6 text-gray-900">
            {ui.title}
          </h2>
        </Animate>

        <Animate y={20} opacity={0} delay={0.2}>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium leading-relaxed max-w-lg mb-12">
            {ui.subtitle}
          </p>
        </Animate>

        {/* --- ACTION BUTTON --- */}
        <Animate y={20} opacity={0} delay={0.3}>
          <Link href={`/${lang}`}>
            <button className="px-10 py-4 sm:py-5 bg-[#E88D15] cursor-pointer text-white font-bold uppercase tracking-widest text-xs hover:bg-gray-900 transition-colors duration-300 rounded-xl">
              {ui.btn}
            </button>
          </Link>
        </Animate>

        {/* --- VISUAL ACCENT LINE --- */}
        <Animate y={20} opacity={0} delay={0.4} className="mt-16 w-full flex justify-center">
          <div className="w-1/2 max-w-[150px] h-[2px] bg-gray-200 rounded-full" />
        </Animate>

      </div>
    </section>
  );
}