"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Inline dictionary for static translations
const dict = {
  en: {
    title: "Our Menu",
    currency: "SAR",
  },
  ar: {
    title: "القائمة لدينا",
    currency: "ر.س",
  }
};

export default function HomeMenuSection({ products = [], lang = "en" }) {
  const isAr = lang === "ar";
  const t = dict[lang] || dict.en;
  
  // State to track which item is loading
  const [loadingSlug, setLoadingSlug] = useState(null);

  if (!products || products.length === 0) return null;

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="w-full bg-[#fcf9f0] py-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-wide">
            {t.title}
          </h2>
          {/* Optional: Link to full menu */}
          <Link 
            href={`/${lang}/menu`} 
            className="text-sm font-semibold text-[#E88D15] hover:text-gray-900 transition-colors duration-300"
          >
            {isAr ? "عرض الكل ←" : "View All →"}
          </Link>
        </div>

        {/* Grid Container: 2 on mobile, 3 on tablet, 5 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => {
            // Safely extract the image URL
            const imageUrl = product?.mainImage?.asset?.url || "/placeholder.png"; 
            const productSlug = product.slug?.current || product.slug;
            
            // Determine active pricing
            const hasDiscount = product.isOnSale && product.discountPrice;
            const currentPrice = hasDiscount ? product.discountPrice : product.price;
            const oldPrice = hasDiscount ? product.price : null;
            
            // Check if this specific card is loading
            const isLoading = loadingSlug === productSlug;

            return (
              <Link
                key={product._id}
                href={`/${lang}/menu/${productSlug}`} 
                onClick={() => setLoadingSlug(productSlug)}
                className="group flex flex-col bg-transparent p-2 md:p-3 hover:bg-white rounded-2xl transition-all duration-300 ease-in-out cursor-pointer"
              >
                {/* Product Image */}
                <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-xl bg-gray-100 flex-shrink-0">
                  <Image
                    src={imageUrl}
                    alt={product.name || "Product"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  
                  {/* Calorie / Custom Badge */}
                  {product.badge && (
                    <div className="absolute top-2 start-2 bg-[#E88D15] text-white text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full shadow-sm z-10">
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Details Container */}
                <div className="flex flex-col flex-grow justify-between px-1">
                  {/* Product Name */}
                  <h3 className="text-gray-900 font-bold text-sm md:text-base line-clamp-2 leading-snug mb-2">
                    {product.name}
                  </h3>

                  {/* Price & Action */}
                  <div className="flex items-end justify-between mt-auto">
                    <div className="flex flex-col">
                      {oldPrice && (
                        <span className="text-gray-400 line-through text-[10px] md:text-xs mb-0.5">
                          {oldPrice} {t.currency}
                        </span>
                      )}
                      <span className="text-[#E88D15] font-black text-base md:text-lg leading-none">
                        {currentPrice} <span className="text-[10px] md:text-xs font-bold text-gray-900 ml-0.5">{t.currency}</span>
                      </span>
                    </div>

                    {/* Action Indicator (Arrow or Spinner) */}
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#E88D15] group-hover:text-white text-gray-500 transition-colors duration-300 flex-shrink-0">
                      {isLoading ? (
                        <svg className="w-4 h-4 md:w-5 md:h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg 
                          className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 ${isAr ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}