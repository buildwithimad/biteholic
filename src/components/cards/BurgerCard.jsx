"use client";

import Image from "next/image";
import Link from "next/link";

export default function BurgerCard({ product, t, lang = "en" }) {
  // 1. Safely extract Image
  const imageUrl = product?.mainImage?.asset?.url || product?.imageUrl || "/hero.png";

  // 2. Extract the slug for the URL (handles both Sanity object slugs and plain strings)
  const productSlug = product?.slug?.current || product?.slug || "";

  // 3. Calculate Discount
  const discountPercent = product?.isOnSale && product?.price && product?.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : null;

  // 4. Safely extract Category Name
  const categoryName = typeof product?.category === 'object' 
    ? product.category?.name 
    : product?.category;

  return (
    <Link 
      // Adjust this URL path to match your actual routing structure (e.g., /menu/slug or /product/slug)
      href={`/${lang}/products/${productSlug}`} 
      className="group relative flex flex-col h-full p-3 sm:p-4 rounded-2xl hover:bg-[#151515] transition-all duration-300"
    >
      
      {/* Image Container - slightly reduced bottom margin */}
      <div className="relative w-full aspect-square mb-3">
        
        {/* Top Left Badge (Chef's Pick) */}
        {product?.badge && (
          <div className="absolute top-0 start-0 z-10 px-2 py-1 bg-[#E88C15] text-[#050505] text-[9px] sm:text-[10px] font-bold rounded-md uppercase tracking-wider">
            {product.badge}
          </div>
        )}

        {/* Top Right Discount Badge */}
        {product?.isOnSale && (
          <div className="absolute top-0 end-0 z-10 px-2 py-1 bg-[#dc2626] text-white text-[9px] sm:text-[10px] font-bold rounded-md">
            -{discountPercent || 30}%
          </div>
        )}

        {/* Burger Image (Inside the card) */}
        <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out z-0">
          <Image
            src={imageUrl}
            alt={product?.name || "Burger"}
            fill
            className="object-contain drop-shadow-2xl"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      </div>

      {/* Product Info - Tighter spacing and slightly smaller text */}
      <div className="flex-1 flex flex-col items-start text-start mt-1">
        <span className="text-gray-500 text-[9px] sm:text-[10px] uppercase tracking-wider mb-1">
          {categoryName || t?.category || "Burger"}
        </span>
        <h3 className="text-sm sm:text-base lg:text-lg font-bold tracking-tight mb-1.5 text-white leading-tight">
          {product?.name}
        </h3>
        <p className="text-[10px] sm:text-xs text-gray-400 font-normal leading-relaxed mb-5 line-clamp-2">
          {product?.shortDescription}
        </p>
        
        {/* Price & Action Area */}
        <div className="w-full mt-auto flex flex-col gap-3 sm:gap-4">
          
          <div className="flex items-center gap-2">
            {product?.isOnSale && product?.discountPrice ? (
              <>
                <span className="text-base sm:text-lg font-bold text-[#E88C15]">
                  {product.discountPrice} <span className="text-xs">{t?.currency || "SAR"}</span>
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 line-through">
                  {product.price} {t?.currency || "SAR"}
                </span>
              </>
            ) : (
              <span className="text-base sm:text-lg font-bold text-[#E88C15]">
                {product?.price} <span className="text-xs">{t?.currency || "SAR"}</span>
              </span>
            )}
          </div>

          {/* Solid White Button */}
          <button 
            // If you want this button to add to cart instead of navigating, uncomment the line below:
            // onClick={(e) => { e.preventDefault(); /* Add to cart logic here */ }}
            className="w-full py-2 sm:py-2.5 bg-white text-black text-[11px] sm:text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors duration-300"
          >
            {t?.orderBtn || "Order Now"}
          </button>

        </div>
      </div>
    </Link>
  );
}