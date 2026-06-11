"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BurgerCard({ product, t, lang = "en" }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

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

  // Reset loading state when navigation completes or user goes back
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  return (
    <Link 
      href={`/${lang}/menu/${productSlug}`} 
      onClick={() => setIsLoading(true)}
      aria-label={`View details for ${product?.name || 'product'}`}
      className="group relative flex flex-col h-full bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E88D15] transition-all duration-300 overflow-hidden"
    >
      
      {/* --- LOADING OVERLAY --- */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[2px] transition-all duration-300">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#E88D15] rounded-full animate-spin shadow-lg"></div>
        </div>
      )}

      {/* --- IMAGE CONTAINER --- */}
      <div className="relative w-full aspect-[4/3] sm:aspect-square bg-white border-b border-gray-50 overflow-hidden flex items-center justify-center">
        
        {/* Top Left Badge (Chef's Pick / Custom Badge) */}
        {product?.badge && (
          <div className="absolute top-3 start-3 z-10 px-2.5 py-1 bg-[#E88D15] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-md">
            {product.badge}
          </div>
        )}

        {/* Top Right Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 end-3 z-10 px-2.5 py-1 bg-white border border-gray-100 text-[#E88D15] text-[9px] sm:text-[10px] font-bold tracking-wider rounded-md">
            -{discountPercent}%
          </div>
        )}

        {/* Burger Image */}
        <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out z-0">
          <Image
            src={imageUrl}
            alt={product?.name || "Premium Burger"}
            fill
            className="object-contain p-6 sm:p-8"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        </div>
      </div>

      {/* --- PRODUCT INFO --- */}
      <div className="flex-1 flex flex-col items-start text-start p-5 sm:p-6">
        
        {/* Category Label */}
        <span className="text-[#E88D15] text-[10px] sm:text-xs uppercase tracking-widest mb-1.5 font-bold">
          {categoryName || t?.category || "Burger"}
        </span>
        
        {/* Product Title */}
        <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-2 text-[#222222] leading-snug line-clamp-1">
          {product?.name || "Untitled Product"}
        </h3>
        
        {/* Short Description */}
        <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6 line-clamp-2">
          {product?.shortDescription || "Experience our handcrafted premium selection."}
        </p>
        
        {/* --- PRICE AREA --- */}
        <div className="w-full mt-auto flex items-baseline gap-2 pt-1">
          {hasDiscount ? (
            <>
              <span className="text-xl sm:text-2xl font-bold text-[#222222] leading-none tracking-tight">
                {product.discountPrice} <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest ms-1">{t?.currency || "SAR"}</span>
              </span>
              <span className="text-xs text-gray-400 font-medium line-through leading-none ms-1">
                {product.price} {t?.currency || "SAR"}
              </span>
            </>
          ) : (
            <span className="text-xl sm:text-2xl font-bold text-[#222222] leading-none tracking-tight">
              {product?.price} <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest ms-1">{t?.currency || "SAR"}</span>
            </span>
          )}
        </div>

      </div>
      
    </Link>
  );
}