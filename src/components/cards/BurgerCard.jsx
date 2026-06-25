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
      className="group relative flex flex-col h-full bg-white rounded-[24px] border border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300 ease-out overflow-hidden"
    >

      {/* --- LOADING OVERLAY --- */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[2px] transition-all duration-300">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#E88D15] rounded-full animate-spin shadow-lg"></div>
        </div>
      )}

      {/* --- IMAGE CONTAINER --- */}
      <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">

        {/* Top Left Badge (Chef's Pick / Custom Badge) */}
        {product?.badge && (
          <div className="absolute top-4 start-4 z-10 px-3 py-1.5 bg-[#E88D15] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
            {product.badge}
          </div>
        )}

        {/* Top Right Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-4 end-4 z-10 px-3 py-1.5 bg-white border border-gray-100 text-[#E88D15] text-[10px] sm:text-xs font-bold tracking-wider rounded-full shadow-md">
            -{discountPercent}%
          </div>
        )}

        {/* Burger Image */}
        <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out">
          <Image
            src={imageUrl}
            alt={product?.name || "Premium Burger"}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
        </div>
      </div>

      {/* --- PRODUCT INFO --- */}
      <div className="flex-1 flex flex-col p-5 sm:p-6">

        {/* Category Label */}
        <span className="inline-block mb-3 text-[#E88D15] text-[10px] sm:text-xs uppercase tracking-widest font-bold">
          {categoryName || t?.category || "Burger"}
        </span>

        {/* Product Title */}
        <h3 className="text-base sm:text-lg font-bold text-[#222222] leading-snug mb-2 line-clamp-2">
          {product?.name || "Untitled Product"}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {product?.shortDescription || "Experience our handcrafted premium selection."}
        </p>

        {/* --- PRICE & BUTTON AREA --- */}
        <div className="mt-auto space-y-3">

          {/* Price Row */}
          <div className="flex items-baseline gap-2">
            {hasDiscount ? (
              <>
                <span className="text-xl sm:text-2xl font-bold text-[#E88D15] leading-none">
                  {product.discountPrice} <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider ms-0.5">{t?.currency || "SAR"}</span>
                </span>
                <span className="text-sm text-gray-400 font-medium line-through">
                  {product.price}
                </span>
              </>
            ) : (
              <span className="text-xl sm:text-2xl font-bold text-[#E88D15] leading-none">
                {product?.price} <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider ms-0.5">{t?.currency || "SAR"}</span>
              </span>
            )}
          </div>

          {/* Add To Cart Button */}
          <button className="w-full py-3 px-4 bg-[#050505] text-white text-sm font-semibold rounded-xl hover:bg-[#E88D15] transition-colors duration-300 ease-out">
            {t?.addToCart || "Add to Cart"}
          </button>

        </div>

      </div>

    </Link>
  );
}
