"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import BurgerCard from "../cards/BurgerCard";

// Inline dictionary for static translations
const dict = {
  en: {
    label: "Discover",
    title: "Featured Menu",
    description: "Handcrafted burgers made with premium ingredients. Taste the difference.",
    viewFull: "View Full Menu",
    currency: "SAR",
    categories: {
      all: "All Items",
      burgers: "Burgers",
      sides: "Sides",
      drinks: "Drinks",
      desserts: "Desserts"
    }
  },
  ar: {
    label: "اكتشف",
    title: "القائمة المميزة",
    description: "برجر مصنوع يدويًا من مكونات فاخرة. تذوق الفرق.",
    viewFull: "عرض القائمة الكاملة",
    currency: "ر.س",
    categories: {
      all: "كل العناصر",
      burgers: "برجر",
      sides: "مقبلات",
      drinks: "مشروبات",
      desserts: "حلويات"
    }
  }
};

export default function HomeMenuSection({ products = [], lang = "en" }) {
  const isAr = lang === "ar";
  const t = dict[lang] || dict.en;
  const [activeCategory, setActiveCategory] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);

  // Extract unique categories from products
  const categories = ["all", ...new Set(products.map(p => p.category?.toLowerCase() || "uncategorized").filter(Boolean))];
  
  // Filter products by active category
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => (p.category?.toLowerCase() || "") === activeCategory);

  // Handle horizontal scroll for mobile category tabs
  const scrollTabs = (direction) => {
    const container = document.getElementById("category-tabs");
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200;
      container.scrollBy({ left: isAr ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  // Detect scroll for shadow effect on tabs
  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById("category-tabs");
      if (container) {
        setIsScrolled(container.scrollLeft > 10);
      }
    };

    const container = document.getElementById("category-tabs");
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [isAr]);

  if (!products || products.length === 0) return null;

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="w-full bg-[#fcf9f0] py-20 px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          {/* Accent Label */}
          <span className="inline-block text-[#E88D15] font-bold text-xs md:text-sm uppercase tracking-[0.2em] mb-4">
            {t.label}
          </span>
          
          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#050505] tracking-tight leading-[1.1] mb-6">
            {t.title}
          </h2>
          
          {/* Description */}
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            {t.description}
          </p>
        </div>

        {/* CATEGORY TABS */}
        <div className="relative mb-12">
          {/* Left Shadow Gradient */}
          {isScrolled && (
            <div className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r ${isAr ? 'from-[#fcf9f0] to-transparent' : 'from-[#fcf9f0] to-transparent'} z-10 pointer-events-none`} />
          )}
          
          {/* Right Shadow Gradient */}
          <div className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l ${isAr ? 'from-[#fcf9f0] to-transparent' : 'from-[#fcf9f0] to-transparent'} z-10 pointer-events-none hidden md:block`} />

          {/* Scroll Buttons (Desktop) */}
          <button 
            onClick={() => scrollTabs("left")}
            className={`absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-[#E88D15] transition-colors z-20 hidden md:flex ${isAr ? 'right-2 left-auto' : ''}`}
          >
            <svg className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => scrollTabs("right")}
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-[#E88D15] transition-colors z-20 hidden md:flex ${isAr ? 'left-2 right-auto' : ''}`}
          >
            <svg className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Category Pills Container */}
          <div 
            id="category-tabs"
            className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2 px-2 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;
              const categoryKey = category === "all" ? "all" : category;
              const label = t.categories[categoryKey] || category.charAt(0).toUpperCase() + category.slice(1);
              
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex-shrink-0 px-6 py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ease-out whitespace-nowrap ${
                    isActive
                      ? "bg-[#E88D15] text-white shadow-lg shadow-orange-500/30 scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-16">
            {filteredProducts.map((product) => (
              <BurgerCard 
                key={product._id} 
                product={product} 
                lang={lang} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}

        {/* VIEW FULL MENU CTA */}
        <div className="text-center">
          <Link 
            href={`/${lang}/menu`} 
            prefetch={false}
            className="inline-flex items-center gap-3 bg-[#E88D15] text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-1 transition-all duration-300 group"
          >
            <span>{t.viewFull}</span>
            <svg 
              className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${isAr ? 'rotate-180 group-hover:translate-x-0 group-hover:-translate-x-1' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
