"use client";

import Image from "next/image";
import Link from "next/link";

export default function BurgerCard({ product, t, lang = "en" }) {
  // 1. Safely extract Image with robust fallback
  const imageUrl = product?.mainImage?.asset?.url || product?.imageUrl || "/hero.png";

  // 2. Extract the slug for the URL safely
  const productSlug = product?.slug?.current || product?.slug || "";

  // 3. Calculate Discount (Ensure no division by zero)
  const hasDiscount = product?.isOnSale && product?.price && product?.discountPrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  // 4. Safely extract Category Name
  const categoryName = typeof product?.category === 'object' 
    ? product.category?.name 
    : product?.category;

  return (
    <Link 
      href={`/${lang}/menu/${productSlug}`} 
      aria-label={`View details for ${product?.name || 'product'}`}
      className="group relative flex flex-col h-full p-3 md:p-5 bg-transparent hover:bg-[#111] focus-visible:bg-[#111] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E88C15] transition-colors duration-300"
    >
      
      {/* --- IMAGE CONTAINER --- */}
      <div className="relative w-full aspect-square mb-3 md:mb-5 overflow-hidden bg-[#050505] group-hover:bg-[#111] transition-colors">
        
        {/* Top Left Badge (Chef's Pick / Custom Badge) */}
        {product?.badge && (
          <div className="absolute top-0 start-0 z-10 px-2 py-1 md:px-3 md:py-1.5 bg-[#E88C15] text-black text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
            {product.badge}
          </div>
        )}

        {/* Top Right Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-0 end-0 z-10 px-2 py-1 md:px-3 md:py-1.5 bg-[#dc2626] text-white text-[8px] md:text-[10px] font-bold tracking-wider">
            -{discountPercent}%
          </div>
        )}

        {/* Burger Image */}
        <div className="relative w-full h-full transform group-hover:scale-105 group-focus-visible:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0">
          <Image
            src={imageUrl}
            alt={product?.name || "Premium Burger"}
            fill
            className="object-contain p-2"
            // Production-level image sizing for mobile grids (2 cols), tablet (3 cols), and desktop (4 cols)
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
        </div>
      </div>

      {/* --- PRODUCT INFO --- */}
      <div className="flex-1 flex flex-col items-start text-start mt-1">
        
        {/* Category Label */}
        <span className="text-gray-500 text-[9px] md:text-[10px] uppercase tracking-widest mb-1 md:mb-1.5">
          {categoryName || t?.category || "Burger"}
        </span>
        
        {/* Product Title */}
        <h3 className="text-sm md:text-lg font-bold tracking-tight mb-1.5 md:mb-2 text-white leading-snug group-hover:text-[#E88C15] transition-colors duration-300">
          {product?.name || "Untitled Product"}
        </h3>
        
        {/* Short Description */}
        <p className="text-[10px] md:text-xs text-gray-400 font-light leading-relaxed mb-4 md:mb-6 line-clamp-2">
          {product?.shortDescription || "Experience our handcrafted premium selection."}
        </p>
        
        {/* --- PRICE & HOVER ACTION AREA --- */}
        {/* mt-auto ensures the price is always pushed to the bottom of the card, keeping grid rows perfectly aligned */}
        <div className="w-full mt-auto flex items-end justify-between gap-2">
          
          <div className="flex flex-wrap items-baseline gap-1.5 md:gap-2.5">
            {hasDiscount ? (
              <>
                <span className="text-base md:text-xl font-bold text-[#E88C15] leading-none">
                  {product.discountPrice} <span className="text-[8px] md:text-[10px] uppercase tracking-widest">{t?.currency || "SAR"}</span>
                </span>
                <span className="text-[10px] md:text-xs text-gray-600 line-through leading-none">
                  {product.price} {t?.currency || "SAR"}
                </span>
              </>
            ) : (
              <span className="text-base md:text-xl font-bold text-[#E88C15] leading-none">
                {product?.price} <span className="text-[8px] md:text-[10px] uppercase tracking-widest">{t?.currency || "SAR"}</span>
              </span>
            )}
          </div>

          {/* Subtle Hover Indicator (Improves UX without a bulky button) */}
          <div className="opacity-0 translate-x-[-10px] rtl:translate-x-[10px] group-hover:opacity-100 group-hover:translate-x-0 rtl:group-hover:translate-x-0 transition-all duration-300 text-[#E88C15]">
            <svg className="w-4 h-4 md:w-5 md:h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>

        </div>
      </div>
      
    </Link>
  );
}