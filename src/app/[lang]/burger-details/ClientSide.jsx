"use client";

import { useState } from "react";
import Image from "next/image";
import Animate from "@/components/animation/Animate";

const product = {
  en: {
    id: 1,
    badge: "Chef's Recommendation",
    name: "The Classic Wagyu",
    sku: "SKU: BTH-001",
    description: "Experience the pinnacle of burger engineering. 200g of premium Wagyu beef, double-layered with 12-month aged Irish cheddar, caramelized black garlic onions, and our signature truffle-infused mayo on a toasted gold-leaf brioche.",
    price: "85 SAR",
    discountPrice: "68 SAR",
    discountLabel: "Save 20%",
    orderBtn: "Order via WhatsApp",
    gallery: [
      "/hero.png", 
      "/hero.png", 
      "/hero.png", 
      "/hero.png"
    ], 
    specs: [
      { label: "Weight", value: "200g Wagyu" },
      { label: "Cheese", value: "Aged Cheddar" },
      { label: "Sauce", value: "Truffle Mayo" },
    ],
    nutrition: [
      { label: "Calories", value: "840" },
      { label: "Protein", value: "42g" },
      { label: "Fats", value: "38g" },
    ]
  },
  ar: {
    id: 1,
    badge: "إصدار محدود",
    name: "كلاسيك واغيو",
    sku: "رمز المنتج: BTH-001",
    description: "اختبر قمة هندسة البرجر. ٢٠٠ جرام من لحم الواغيو الفاخر، بطبقتين من جبن الشيدر الأيرلندي المعتق، بصل مكرمل بالثوم الأسود، ومايونيز نخاع الكمأة المميز.",
    price: "٨٥ ريال",
    discountPrice: "٦٨ ريال",
    discountLabel: "وفر ٢٠٪",
    orderBtn: "اطلب عبر واتساب",
    gallery: [
      "/hero.png", 
      "/hero.png", 
      "/hero.png", 
      "/hero.png"
    ],
    specs: [
      { label: "الوزن", value: "٢٠٠غ واغيو" },
      { label: "الجبنة", value: "شيدر معتق" },
      { label: "الصوص", value: "مايونيز الكمأة" },
    ],
    nutrition: [
      { label: "سعرة", value: "٨٤٠" },
      { label: "بروتين", value: "٤٢غ" },
      { label: "دهون", value: "٣٨غ" },
    ]
  }
};

export default function ProductDetail({ lang = "en" }) {
  const t = product[lang] || product.en;
  const isAr = lang === "ar";
  
  const [activeImg, setActiveImg] = useState(t.gallery[0]);
  const [quantity, setQuantity] = useState(1);

  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const increaseQty = () => setQuantity((prev) => prev + 1);

  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white selection:bg-[#E88C15] selection:text-black font-sans pb-24 lg:pb-0">
      
      <div className="max-w-[85rem] mx-auto relative z-20 px-6 py-12 lg:py-24">
        <div className={`flex flex-col lg:flex-row gap-12 lg:gap-20 ${isAr ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* ========================================= */}
          {/* --- LEFT SIDE: IMAGE GALLERY --- */}
          {/* ========================================= */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            
            {/* 1. THE BIG PICTURE */}
            <div className="relative w-full aspect-[4/5] sm:aspect-square bg-[#0f0f0f] rounded-lg flex items-center justify-center p-8 overflow-hidden border border-white/5">
              <Animate scale={0.95} opacity={0} duration={0.6} key={activeImg} className="w-full h-full relative flex items-center justify-center">
                <div className="absolute inset-0 bg-[#E88C15]/10 blur-[100px] rounded-full scale-75" />
                <Image
                  src={activeImg}
                  alt={t.name}
                  fill
                  className="object-contain relative z-10 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
                  priority
                />
              </Animate>
            </div>

            {/* 2. THE SMALL THUMBNAILS */}
            <div className={`flex gap-4 overflow-x-auto no-scrollbar py-2 ${isAr ? 'justify-end' : 'justify-start'}`}>
              {t.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(img)} 
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-[#0f0f0f] rounded-lg overflow-hidden transition-all duration-300 border ${
                    activeImg === img 
                      ? "border-[#E88C15] opacity-100" 
                      : "border-white/5 opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`thumb-${i}`} fill className="object-cover p-2" />
                </button>
              ))}
            </div>
          </div>
          {/* ========================================= */}


          {/* ========================================= */}
          {/* --- RIGHT SIDE: PRODUCT DETAILS --- */}
          {/* ========================================= */}
          <div className={`w-full lg:w-1/2 flex flex-col pt-4 ${isAr ? 'text-right' : 'text-left'}`}>
            
            {/* Badge */}
            <span className="text-[#E88C15] text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">
              {t.badge}
            </span>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-light text-white mb-6 tracking-wide">
              {t.name}
            </h1>

            {/* Price Section */}
            <div className={`flex items-end gap-4 mb-2 ${isAr ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
              <span className="text-2xl sm:text-3xl font-medium text-white">{t.discountPrice}</span>
              <span className="text-white/40 line-through text-lg font-light mb-1">{t.price}</span>
              <span className="bg-[#E88C15]/10 text-[#E88C15] border border-[#E88C15]/30 px-2 py-1 text-[10px] uppercase tracking-wider mb-1.5">
                {t.discountLabel}
              </span>
            </div>
            
            {/* SKU / Urgency text (mocking the red text from the reference) */}
            <span className="text-red-400 text-xs mt-2 mb-8 block font-medium">
              Only a few left! ({t.sku})
            </span>

            {/* Description */}
            <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed mb-10 max-w-xl">
              {t.description}
            </p>

            {/* Quantity Selector */}
            <div className={`flex items-center gap-6 mb-8 ${isAr ? 'flex-row-reverse' : ''}`}>
              <span className="text-[10px] text-white/50 uppercase tracking-[0.2em]">Quantity</span>
              <div className={`flex items-center border border-white/20 rounded-sm ${isAr ? 'flex-row-reverse' : ''}`}>
                <button onClick={decreaseQty} className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                  -
                </button>
                <span className="w-10 text-center text-sm font-medium text-white">{quantity}</span>
                <button onClick={increaseQty} className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                  +
                </button>
              </div>
            </div>

            {/* Main CTA Button */}
            <button 
              onClick={() => window.open(`https://wa.me/966500000000?text=${encodeURIComponent(`I'd like to order ${quantity}x of: ${t.name}`)}`)}
              className="w-full bg-white text-black font-semibold text-sm uppercase tracking-widest py-4 hover:bg-[#E88C15] hover:text-white transition-all duration-300 mb-4"
            >
              {t.orderBtn}
            </button>
            <p className="text-center text-white/40 text-[10px] uppercase tracking-wider mb-12">
              Nationwide delivery available
            </p>

            {/* Accordions (Details & Features / Shipping) */}
            <div className="border-t border-white/10">
              
              {/* Specs Accordion */}
              <details className="group border-b border-white/10" open>
                <summary className={`flex items-center justify-between py-5 cursor-pointer list-none ${isAr ? 'flex-row-reverse' : ''}`}>
                  <span className="text-xs uppercase tracking-widest text-white/80 group-open:text-white group-open:font-medium">Details & Features</span>
                  <span className="text-white/40 group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <div className="pb-6 pt-2 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    {t.specs.map((spec, i) => (
                      <div key={i} className={`flex flex-col ${isAr ? 'items-end' : 'items-start'}`}>
                        <span className="text-white/40 text-[10px] uppercase tracking-widest mb-1">{spec.label}</span>
                        <span className="text-white/90 text-sm">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </details>

              {/* Nutrition Accordion */}
              <details className="group border-b border-white/10">
                <summary className={`flex items-center justify-between py-5 cursor-pointer list-none ${isAr ? 'flex-row-reverse' : ''}`}>
                  <span className="text-xs uppercase tracking-widest text-white/80 group-open:text-white group-open:font-medium">Nutritional Info</span>
                  <span className="text-white/40 group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <div className="pb-6 pt-2 animate-fade-in">
                  <div className="grid grid-cols-3 gap-4">
                    {t.nutrition.map((n, i) => (
                      <div key={i} className={`flex flex-col ${isAr ? 'items-end' : 'items-start'}`}>
                        <span className="text-white/40 text-[10px] uppercase tracking-widest mb-1">{n.label}</span>
                        <span className="text-white/90 text-sm">{n.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </details>

            </div>

          </div>
          {/* ========================================= */}

        </div>
      </div>
      
      {/* Floating WhatsApp Button (Matches reference image) */}
      <a 
        href={`https://wa.me/966500000000?text=${encodeURIComponent("Hello!")}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(37,211,102,0.3)] hover:scale-110 transition-all duration-300 z-50 cursor-pointer"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
      
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        details > summary::-webkit-details-marker { display: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
      `}} />
    </section>
  );
}