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
    urgency: "Only a few left",
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
    urgency: "بقي القليل فقط",
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

  const [activeImg, setActiveImg] = useState(mainImgUrl);
  const [quantity, setQuantity] = useState(1);

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
    <section 
      dir={isAr ? "rtl" : "ltr"} 
      className="relative w-full min-h-screen bg-white text-black font-sans pb-24 pt-32"
    >
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Breadcrumb / Top Bar (Vercel Style) */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
          <span>{ui.details}</span>
          <span>/</span>
          <span className="text-black">{product?.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* ========================================= */}
          {/* --- LEFT SIDE: IMAGE GALLERY --- */}
          {/* ========================================= */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:sticky lg:top-32">
            
            {/* Main Image Stage - Flat, Gray Background, 1px Border */}
            <div className="relative w-full aspect-square bg-[#fafafa] flex items-center justify-center border border-gray-200 rounded-lg overflow-hidden">
              <Animate opacity={0} duration={0.4} key={activeImg} className="w-full h-full relative flex items-center justify-center">
                <Image
                  src={activeImg || "/hero.png"}
                  alt={product?.name || "Product Image"}
                  fill
                  className="object-contain p-12 transition-opacity duration-300"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Animate>
            </div>

            {/* Thumbnails - Clean Borders */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar justify-start">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(img)} 
                    className={`relative w-20 h-20 flex-shrink-0 bg-[#fafafa] transition-colors duration-200 rounded-md overflow-hidden border ${
                      activeImg === img 
                        ? "border-black" 
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image src={img} alt={`thumb-${i}`} fill className="object-contain p-3" />
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* ========================================= */}

          {/* ========================================= */}
          {/* --- RIGHT SIDE: PRODUCT DETAILS --- */}
          {/* ========================================= */}
          <div className="w-full lg:w-1/2 flex flex-col text-start">
            
            {/* Category / Badges */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {product?.category && (
                <span className="text-gray-500 text-xs font-semibold uppercase tracking-widest">
                  {typeof product.category === 'object' ? product.category.name : product.category}
                </span>
              )}
              {product?.badge && (
                <span className="bg-black text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Title - Tight Tracking, Stark Black */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-6 leading-tight">
              {product?.name}
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-xl">
              {product?.description}
            </p>

            {/* Pricing Area */}
            <div className="flex items-center gap-4 mb-8 flex-wrap">
              {hasDiscount ? (
                <>
                  <span className="text-3xl font-semibold tracking-tight text-black">
                    {product.discountPrice} <span className="text-sm font-medium text-gray-500 uppercase">{ui.currency}</span>
                  </span>
                  <span className="text-gray-400 line-through text-lg">{product.price} {ui.currency}</span>
                  <span className="bg-gray-100 text-black border border-gray-200 px-2 py-1 text-xs font-semibold uppercase tracking-wide rounded-md">
                    {ui.discountLabel} {discountPercent}%
                  </span>
                </>
              ) : (
                <span className="text-3xl font-semibold tracking-tight text-black">
                  {product?.price} <span className="text-sm font-medium text-gray-500 uppercase">{ui.currency}</span>
                </span>
              )}
            </div>
            
            {/* Urgency & SKU */}
            {(product?.sku || ui.urgency) && (
              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200 text-sm">
                <span className="text-black font-medium flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                  {ui.urgency}
                </span>
                {product?.sku && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500 font-mono">
                      {ui.skuLabel}: {product.sku}
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-6 mb-8">
              <span className="text-sm text-black font-medium">{ui.quantity}</span>
              <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white">
                <button onClick={decreaseQty} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors font-medium">
                  −
                </button>
                <span className="w-12 text-center text-sm font-medium text-black border-x border-gray-200 py-2">{quantity}</span>
                <button onClick={increaseQty} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors font-medium">
                  +
                </button>
              </div>
            </div>

            {/* WhatsApp Order Button Wrapper */}
            <div className="w-full max-w-md mb-8">
              <WhatsAppOrderButton 
                product={product} 
                quantity={quantity} 
                lang={lang} 
                label={ui.orderBtn} 
              />
            </div>
            
            {/* Delivery Info */}
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-12 font-medium">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              {ui.delivery}
            </div>

            {/* Accordions (Clean Vercel Style) */}
            <div className="border-t border-gray-200">
              
              {/* Details & Features */}
              {product?.specs?.length > 0 && (
                <details className="group border-b border-gray-200" open>
                  <summary className="flex items-center justify-between py-4 cursor-pointer list-none select-none">
                    <span className="text-sm font-medium text-black">{ui.details}</span>
                    <span className="text-gray-400 group-open:rotate-45 transition-transform duration-200">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </summary>
                  <div className="pb-6 pt-1 text-sm text-gray-600">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                      {product.specs.map((spec, i) => (
                        <div key={i} className="flex flex-col items-start border-l-2 border-gray-200 pl-3 rtl:pl-0 rtl:pr-3 rtl:border-l-0 rtl:border-r-2">
                          <span className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">{spec.label}</span>
                          <span className="text-black font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              )}

              {/* Nutritional Info */}
              {product?.nutrition?.length > 0 && (
                <details className="group border-b border-gray-200">
                  <summary className="flex items-center justify-between py-4 cursor-pointer list-none select-none">
                    <span className="text-sm font-medium text-black">{ui.nutritionTitle}</span>
                    <span className="text-gray-400 group-open:rotate-45 transition-transform duration-200">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </summary>
                  <div className="pb-6 pt-1 text-sm text-gray-600">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {product.nutrition.map((n, i) => (
                        <div key={i} className="flex flex-col items-start border border-gray-200 p-3 rounded-md bg-[#fafafa]">
                          <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">{n.label}</span>
                          <span className="text-black font-mono font-medium">{n.value}</span>
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
      
      {/* Styles for hidden scrollbars */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        details > summary::-webkit-details-marker { display: none; }
      `}} />
    </section>
  );
}