"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/services/productServices";
import BurgerCard from "../cards/BurgerCard";

const dict = {
  en: {
    label: "Customer Favorites",
    title: "Best Sellers",
    description: "The most loved items by our customers. Try them now!",
    viewFull: "View Full Menu"
  },
  ar: {
    label: "مفضلات العملاء",
    title: "الأكثر مبيعًا",
    description: "العناصر الأكثر حبًا من قبل عملائنا. جربها الآن!",
    viewFull: "عرض القائمة الكاملة"
  }
};

export default function BestSellers({ lang = "en" }) {
  const isAr = lang === "ar";
  const t = dict[lang] || dict.en;
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const allProducts = await fetchProducts();
        // Sort by order field or take first 8 as best sellers
        const sorted = allProducts.sort((a, b) => (a.order || 999) - (b.order || 999));
        setBestSellers(sorted.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch best sellers:", error);
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-gray-200 rounded-[24px]"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white">
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

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {bestSellers.map((product) => (
            <BurgerCard key={product._id} product={product} lang={lang} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href={`/${lang}/menu`}
            className="inline-flex items-center justify-center bg-[#E88D15] text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#d47d0f] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
          >
            {t.viewFull} →
          </Link>
        </div>
      </div>
    </section>
  );
}
