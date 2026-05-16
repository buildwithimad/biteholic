"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Animate from "@/components/animation/Animate";
import WhatsAppOrderButton from "@/components/ui/WhatsAppOrderButton";


// Static translations for the UI elements
const uiText = {
  en: {
    orderBtn: "Order via WhatsApp",
    discountLabel: "Save",
    skuLabel: "SKU",
    urgency: "Only a few left!",
    quantity: "Quantity",
    delivery: "Nationwide delivery available",
    details: "Details & Features",
    nutritionTitle: "Nutritional Info",
    currency: "SAR"
  },
  ar: {
    orderBtn: "اطلب عبر واتساب",
    discountLabel: "وفر",
    skuLabel: "رمز المنتج",
    urgency: "بقي القليل فقط!",
    quantity: "الكمية",
    delivery: "التوصيل متاح لجميع المناطق",
    details: "التفاصيل والمميزات",
    nutritionTitle: "المعلومات الغذائية",
    currency: "ريال"
  }
};

// Helper function to safely extract Sanity Image URLs
const getImageUrl = (imageObj) => {
  if (!imageObj) return null;
  if (typeof imageObj === 'string') return imageObj;
  if (imageObj?.asset?.url) return imageObj.asset.url;
  return null; 
};

export default function ProductDetail({ lang = "en", product }) {
  const isAr = lang === "ar";
  const ui = uiText[lang] || uiText.en;
  
  // 1. Process Images
  const mainImgUrl = getImageUrl(product?.mainImage) || product?.imageUrl || "/hero.png";
  const galleryUrls = product?.gallery?.map(img => getImageUrl(img)).filter(Boolean) || [];
  const allImages = Array.from(new Set([mainImgUrl, ...galleryUrls]));

  // Safely initialize the state with the main image
  const [activeImg, setActiveImg] = useState(mainImgUrl);
  const [quantity, setQuantity] = useState(1);

  // FIX: Only depend on the product slug to prevent the infinite re-render loop
  useEffect(() => {
    setActiveImg(mainImgUrl);
  }, [product?.slug, mainImgUrl]);

  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const increaseQty = () => setQuantity((prev) => prev + 1);

  // 2. Format Pricing
  const hasDiscount = product?.isOnSale && product?.discountPrice;
  const discountPercent = hasDiscount && product?.price 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white selection:bg-[#E88C15] selection:text-black font-sans pb-24 lg:pb-0">
      
      <div className="max-w-[85rem] mx-auto relative z-20 px-6 py-12 lg:py-24">
        <div className={`flex flex-col lg:flex-row gap-12 lg:gap-20 ${isAr ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* ========================================= */}
          {/* --- LEFT SIDE: IMAGE GALLERY --- */}
          {/* ========================================= */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="relative w-full aspect-[4/5] sm:aspect-square bg-[#0f0f0f] rounded-lg flex items-center justify-center p-8 overflow-hidden border border-white/5">
              <Animate scale={0.95} opacity={0} duration={0.6} key={activeImg} className="w-full h-full relative flex items-center justify-center">
                <div className="absolute inset-0 bg-[#E88C15]/10 blur-[100px] rounded-full scale-75" />
                <Image
                  src={activeImg || "/hero.png"}
                  alt={product?.name || "Product Image"}
                  fill
                  className="object-contain relative z-10 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Animate>
            </div>

            {/* Render thumbnails only if there is more than 1 image */}
            {allImages.length > 1 && (
              <div className={`flex gap-4 overflow-x-auto no-scrollbar py-2 ${isAr ? 'justify-end' : 'justify-start'}`}>
                {allImages.map((img, i) => (
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
            )}
          </div>
          {/* ========================================= */}


          {/* ========================================= */}
          {/* --- RIGHT SIDE: PRODUCT DETAILS --- */}
          {/* ========================================= */}
          <div className={`w-full lg:w-1/2 flex flex-col pt-4 ${isAr ? 'text-right' : 'text-left'}`}>
            
            {/* Badge */}
            {product?.badge && (
              <span className="text-[#E88C15] text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">
                {product.badge}
              </span>
            )}

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-light text-white mb-6 tracking-wide">
              {product?.name}
            </h1>

            {/* Pricing */}
            <div className={`flex items-end gap-4 mb-2 ${isAr ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
              {hasDiscount ? (
                <>
                  <span className="text-2xl sm:text-3xl font-medium text-white">{product.discountPrice} <span className="text-sm">{ui.currency}</span></span>
                  <span className="text-white/40 line-through text-lg font-light mb-1">{product.price} {ui.currency}</span>
                  <span className="bg-[#E88C15]/10 text-[#E88C15] border border-[#E88C15]/30 px-2 py-1 text-[10px] uppercase tracking-wider mb-1.5 rounded-sm">
                    {ui.discountLabel} {discountPercent}%
                  </span>
                </>
              ) : (
                <span className="text-2xl sm:text-3xl font-medium text-white">{product?.price} <span className="text-sm">{ui.currency}</span></span>
              )}
            </div>
            
            {/* Urgency & SKU */}
            <span className="text-red-400 text-xs mt-2 mb-8 block font-medium">
              {ui.urgency} {product?.sku ? `(${ui.skuLabel}: ${product.sku})` : ''}
            </span>

            {/* Description */}
            <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed mb-10 max-w-xl">
              {product?.description}
            </p>

            {/* Quantity Selector */}
            <div className={`flex items-center gap-6 mb-8 ${isAr ? 'flex-row-reverse' : ''}`}>
              <span className="text-[10px] text-white/50 uppercase tracking-[0.2em]">{ui.quantity}</span>
              <div className={`flex items-center border border-white/20 rounded-none ${isAr ? 'flex-row-reverse' : ''}`}>
                <button onClick={decreaseQty} className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                  -
                </button>
                <span className="w-10 text-center text-sm font-medium text-white">{quantity}</span>
                <button onClick={increaseQty} className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                  +
                </button>
              </div>
            </div>

            {/* WhatsApp Order Button */}
            {/* Main CTA Button */}
<WhatsAppOrderButton 
  product={product} 
  quantity={quantity} 
  lang={lang} 
  label={ui.orderBtn} 
/>

           
            {/* -------------------------------- */}

            <p className="text-center text-white/40 text-[10px] uppercase tracking-wider mb-12">
              {ui.delivery}
            </p>

            {/* Accordions */}
            <div className="border-t border-white/10">
              
              {/* Details & Features */}
              {product?.specs?.length > 0 && (
                <details className="group border-b border-white/10" open>
                  <summary className={`flex items-center justify-between py-5 cursor-pointer list-none ${isAr ? 'flex-row-reverse' : ''}`}>
                    <span className="text-xs uppercase tracking-widest text-white/80 group-open:text-white group-open:font-medium">{ui.details}</span>
                    <span className="text-white/40 group-open:rotate-45 transition-transform duration-300">+</span>
                  </summary>
                  <div className="pb-6 pt-2 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                      {product.specs.map((spec, i) => (
                        <div key={i} className={`flex flex-col ${isAr ? 'items-end' : 'items-start'}`}>
                          <span className="text-white/40 text-[10px] uppercase tracking-widest mb-1">{spec.label}</span>
                          <span className="text-white/90 text-sm">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              )}

              {/* Nutritional Info */}
              {product?.nutrition?.length > 0 && (
                <details className="group border-b border-white/10">
                  <summary className={`flex items-center justify-between py-5 cursor-pointer list-none ${isAr ? 'flex-row-reverse' : ''}`}>
                    <span className="text-xs uppercase tracking-widest text-white/80 group-open:text-white group-open:font-medium">{ui.nutritionTitle}</span>
                    <span className="text-white/40 group-open:rotate-45 transition-transform duration-300">+</span>
                  </summary>
                  <div className="pb-6 pt-2 animate-fade-in">
                    <div className="grid grid-cols-3 gap-4">
                      {product.nutrition.map((n, i) => (
                        <div key={i} className={`flex flex-col ${isAr ? 'items-end' : 'items-start'}`}>
                          <span className="text-white/40 text-[10px] uppercase tracking-widest mb-1">{n.label}</span>
                          <span className="text-white/90 text-sm">{n.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              )}
            </div>

          </div>
          {/* ========================================= */}

        </div>
      </div>
      
      {/* Styles for hidden scrollbars and animations */}
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