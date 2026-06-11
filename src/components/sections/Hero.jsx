"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

// Inline Multi-language Content Dictionary
const content = {
  en: {
    title: "Welcome to BiteHolic",
    subtitle: "Premium handcrafted burgers made fresh daily.\nOrder online or scan the QR code to begin.",
    scanTitle: "Scan Me!",
    scanDesc: "Order Directly Via WhatsApp",
    orderTitle: "Order Now",
    orderDesc: "Exciting flavors are on the way!\nGet ready for an amazing experience.",
    orderBtn: "View Menu",
    waLink: "https://wa.me/966500000000?text=Hello%20BiteHolic%20I%20want%20to%20place%20an%20order",
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
    orderDesc: "نكهات رائعة في الطريق إليك!\nاستعد لتجربة لا تُنسى.",
    orderBtn: "عرض القائمة",
    waLink: "https://wa.me/966500000000?text=Hello%20BiteHolic%20I%20want%20to%20place%20an%20order",
    menuLink: "/menu",
    waTitle: "واتساب",
    waSub: "اطلب عبر",
  }
};

export default function Hero({ lang = "en" }) {
  const t = content[lang] || content.en;
  const isAr = lang === "ar";
  const [qrCode, setQrCode] = useState("");

  // Animation values based on direction
  const slideInQR = isAr ? 30 : -30;
  const slideInOrder = isAr ? -30 : 30;

  useEffect(() => {
    QRCode.toDataURL(t.waLink)
      .then((url) => setQrCode(url))
      .catch((err) => console.error(err));
  }, [t.waLink]);

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="relative min-h-[120vh] w-full bg-[#050505] text-[#FFFFFF] overflow-hidden flex flex-col items-center justify-start text-start"
    >
      {/* Custom styles for the floating Google-colored rainbow hover effect */}
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
      `}} />

      {/* --- BACKGROUND VIDEO & OVERLAY --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Replace with your actual burger preparation footage */}
          <source src="https://www.pexels.com/download/video/32178593/" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.65)] z-10" />
      </div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="relative z-20 w-full max-w-[1200px] flex flex-col items-center justify-center px-6 py-20 mt-16">
        
        {/* HEADING AREA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center w-full mb-10"
        >
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold mb-3 tracking-wide">
            {t.title}
          </h1>
          <p className="text-white text-sm md:text-base whitespace-pre-line max-w-2xl leading-relaxed">
            {t.subtitle}
          </p>
          
          <div className="w-full max-w-[1200px] border-b border-[rgba(255,255,255,0.15)] mt-8" />
        </motion.div>

        {/* CONTENT AREA (Auto-handles RTL/LTR Flex Ordering & Mobile Stacking) */}
        <div
          className={`flex gap-12 lg:gap-0 w-full max-w-[1050px] justify-between items-center ${
            isAr ? "flex-col-reverse lg:flex-row" : "flex-col lg:flex-row"
          }`}
        >
          {/* --- LEFT SECTION (QR CODE) --- */}
          <motion.div
            initial={{ opacity: 0, x: slideInQR }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col items-center text-center w-full lg:w-auto max-w-[320px]"
          >
            <h2 className="text-lg font-bold mb-4">{t.scanTitle}</h2>
            
            <Link href={t.waLink} target="_blank" className="relative w-40 h-40 bg-white rounded-xl p-2 mb-6 hover:scale-105 transition-transform duration-300">
              {qrCode && (
                <Image
                  src={qrCode}
                  alt="WhatsApp QR Code"
                  fill
                  className="object-contain rounded-lg p-1"
                  unoptimized
                />
              )}
            </Link>

            {/* WhatsApp Button with Animated Rainbow Hover */}
            <div className="w-full flex justify-center mt-2">
              <Link href={t.waLink} target="_blank" className="w-full sm:w-auto block transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="relative group rounded-md p-[2px] cursor-pointer">
                  
                  {/* Rainbow background layer (visible only on hover) */}
                  <div className="absolute inset-0 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rainbow-bg" />
                  
                  {/* Inner button container (acts as the cutout for the rainbow border) */}
                  <div className="relative flex items-center justify-center gap-3 px-6 py-2.5 bg-[rgba(0,0,0,0.6)] hover:bg-black border border-white/60 group-hover:border-transparent rounded-md hover:rounded-none transition-colors duration-300 w-full h-full">
                    <FaWhatsapp size={24} className="text-white group-hover:text-[#25D366] transition-colors duration-300"/>
                    
                    <div className="text-start">
                      <p className="text-[10px] text-gray-300 uppercase leading-none mb-0.5">{t.waSub}</p>
                      <p className="text-sm font-semibold text-white leading-tight">{t.waTitle}</p>
                    </div>
                  </div>

                </div>
              </Link>
            </div>
          </motion.div>

          {/* --- RIGHT SECTION (ORDER NOW) --- */}
          <Link href={`/${lang}/menu`} className="block w-full lg:w-auto">
            <motion.div
              initial={{ opacity: 0, x: slideInOrder }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col items-center justify-center text-center border border-[#e88d15] bg-transparent hover:bg-white transition-all duration-700 ease-in-out py-10 px-8 rounded-xl w-full lg:w-[400px] max-w-full group cursor-pointer"
            >
              {/* Orange Circular Icon */}
              <div className="w-16 h-16 bg-[#E88D15] rounded-full flex items-center justify-center mb-6 transition-transform duration-700 ease-in-out group-hover:scale-110 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>

              <h2 className="text-xl font-bold mb-3 text-[#E88D15] transition-colors duration-700 ease-in-out">
                {t.orderTitle}
              </h2>
              <p className="text-[#E88D15] text-xs md:text-sm max-w-[320px] whitespace-pre-line transition-all duration-700 ease-in-out font-medium">
                {t.orderDesc}
              </p>
            </motion.div>
          </Link>

        </div>
      </div>
    </section>
  );
}