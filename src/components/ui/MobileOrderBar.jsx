"use client";

import Link from "next/link";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966500000000";

const dict = {
  en: {
    orderNow: "Order Now"
  },
  ar: {
    orderNow: "اطلب الآن"
  }
};

export default function MobileOrderBar({ lang = "en" }) {
  const t = dict[lang] || dict.en;
  const isAr = lang === "ar";
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(isAr ? "مرحبًا، أريد طلب طعام" : "Hello, I want to order food")}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
      {/* Safe area padding for iOS home indicator */}
      <div 
        className="bg-[#050505] text-white flex items-center justify-center py-3 px-4 shadow-2xl"
        style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
      >
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-3 bg-[#E88D15] hover:bg-[#d47d0f] transition-colors duration-300 ease-out rounded-xl py-3.5 font-bold text-base"
        >
          {/* WhatsApp Icon */}
          <svg 
            className="w-5 h-5 fill-current" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          {t.orderNow}
        </Link>
      </div>
      
      {/* Smooth appearance animation */}
      <style jsx>{`
        div {
          animation: slide-up-fade 0.5s ease-out forwards;
        }
        
        @keyframes slide-up-fade {
          from {
            opacity: 0;
            transform: translate3d(0, 100%, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}
