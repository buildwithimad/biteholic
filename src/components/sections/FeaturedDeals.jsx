"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/services/productServices";

const dict = {
  en: {
    label: "Limited Time",
    title: "Featured Deals",
    description: "Grab our hottest deals before they're gone!",
    originalPrice: "Was",
    salePrice: "Now",
    orderNow: "Order Now",
    noDeals: "No deals currently",
    checkMenu: "Check out our full menu",
    viewMenu: "View Full Menu"
  },
  ar: {
    label: "وقت محدود",
    title: "عروض مميزة",
    description: "احصل على أفضل عروضنا قبل انتهائها!",
    originalPrice: "كان",
    salePrice: "الآن",
    orderNow: "اطلب الآن",
    noDeals: "لا توجد عروض حاليًا",
    checkMenu: "تحقق من قائمتنا الكاملة",
    viewMenu: "عرض القائمة الكاملة"
  }
};

export default function FeaturedDeals({ lang = "en" }) {
  const isAr = lang === "ar";
  const t = dict[lang] || dict.en;
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const allProducts = await fetchProducts();
        const onSale = allProducts.filter(p => p.isOnSale && p.discountPrice).slice(0, 6);
        setSaleProducts(onSale);
      } catch (error) {
        console.error("Failed to fetch sale products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-video bg-gray-200 rounded-[24px]"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (saleProducts.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-lg">{t.noDeals}</p>
          <Link href={`/${lang}/menu`} className="inline-block mt-4 text-[#E88D15] font-semibold hover:underline">
            {t.checkMenu} →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-[#E88D15] font-bold text-sm md:text-base uppercase tracking-widest mb-3">
            {t.label}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#050505] mb-4 font-montserrat">
            {t.title}
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {saleProducts.map((product, index) => {
            const imageUrl = product?.mainImage?.asset?.url || "/placeholder.png";
            const productSlug = product.slug?.current || product.slug;
            const discountPercent = Math.round(((product.price - product.discountPrice) / product.price) * 100);

            return (
              <Link
                key={product._id || index}
                href={`/${lang}/menu/${productSlug}`}
                className="group relative bg-white rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-gray-50">
                  <Image
                    src={imageUrl}
                    alt={product.name || "Product"}
                    fill
                    quality={85}
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 bg-[#E88D15] text-white font-black text-sm md:text-base px-4 py-2 rounded-full shadow-lg">
                    -{discountPercent}%
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-[#050505] mb-2 line-clamp-2 font-montserrat">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price Row */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-gray-400 line-through text-lg">
                      {t.originalPrice} {product.price} {t.salePrice === "الآن" ? "ر.س" : "SAR"}
                    </span>
                    <span className="text-[#E88D15] font-black text-2xl md:text-3xl">
                      {product.discountPrice} {t.salePrice === "الآن" ? "ر.س" : "SAR"}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-[#050505] text-white font-bold py-4 rounded-xl hover:bg-[#E88D15] transition-colors duration-300 ease-out">
                    {t.orderNow}
                  </button>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile Horizontal Slider */}
        <div className="md:hidden flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory -mx-4 px-4 scrollbar-hide">
          {saleProducts.map((product, index) => {
            const imageUrl = product?.mainImage?.asset?.url || "/placeholder.png";
            const productSlug = product.slug?.current || product.slug;
            const discountPercent = Math.round(((product.price - product.discountPrice) / product.price) * 100);

            return (
              <Link
                key={product._id || index}
                href={`/${lang}/menu/${productSlug}`}
                className="group flex-shrink-0 w-[280px] bg-white rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-out snap-center"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-gray-50">
                  <Image
                    src={imageUrl}
                    alt={product.name || "Product"}
                    fill
                    quality={85}
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="280px"
                  />
                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3 bg-[#E88D15] text-white font-black text-xs px-3 py-1.5 rounded-full shadow-lg">
                    -{discountPercent}%
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#050505] mb-2 line-clamp-2 font-montserrat">
                    {product.name}
                  </h3>

                  {/* Price Row */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-gray-400 line-through text-sm">
                      {product.price} {t.salePrice === "الآن" ? "ر.س" : "SAR"}
                    </span>
                    <span className="text-[#E88D15] font-black text-xl">
                      {product.discountPrice} {t.salePrice === "الآن" ? "ر.س" : "SAR"}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-[#050505] text-white font-bold py-3 rounded-xl hover:bg-[#E88D15] transition-colors duration-300 ease-out text-sm">
                    {t.orderNow}
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
