"use client";

import { useState, useCallback, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Animate from "@/components/animation/Animate";
import BurgerCard from "@/components/cards/BurgerCard";

// UI Dictionary
const uiText = {
  en: {
    title: "Our Menu",
    subtitle: "Discover our premium selection of handcrafted burgers and sides.",
    search: "Search menu...",
    categories: "CATEGORIES", // Updated to uppercase matching screenshot
    all: "All Products",
    sort: "SORT BY", // Updated to uppercase
    sortFeatured: "Featured",
    sortLowHigh: "Price: Low to High",
    sortHighLow: "Price: High to Low",
    offers: "Special Offers",
    showOffers: "ON SALE ONLY", // Updated to uppercase
    filtersBtn: "Filter Menu",
    noResults: "No products found matching your criteria.",
    clearFilters: "Clear Filters",
    currency: "SAR",
    orderBtn: "Order Now"
  },
  ar: {
    title: "قائمتنا",
    subtitle: "اكتشف تشكيلتنا الفاخرة من البرجر المحضر يدوياً والأطباق الجانبية.",
    search: "البحث في القائمة...",
    categories: "الفئات",
    all: "جميع المنتجات",
    sort: "ترتيب حسب",
    sortFeatured: "المميزة",
    sortLowHigh: "السعر: الأقل للأعلى",
    sortHighLow: "السعر: الأعلى للأقل",
    offers: "العروض الخاصة",
    showOffers: "المخفضة فقط",
    filtersBtn: "تصفية القائمة",
    noResults: "لم يتم العثور على منتجات مطابقة لبحثك.",
    clearFilters: "مسح الفلاتر",
    currency: "ريال",
    orderBtn: "اطلب الآن"
  }
};

// --- SKELETON COMPONENT ---
const ProductSkeleton = () => (
  <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
    <div className="w-full aspect-[4/3] sm:aspect-square bg-gray-100 border-b border-gray-200" />
    <div className="flex-1 flex flex-col p-5 sm:p-6 gap-3">
      <div className="w-1/4 h-3 bg-gray-200 rounded-sm" />
      <div className="w-3/4 h-5 bg-gray-200 rounded-sm mt-1" />
      <div className="w-full h-3 bg-gray-100 rounded-sm mt-2" />
      <div className="w-5/6 h-3 bg-gray-100 rounded-sm mb-4" />
      <div className="mt-auto flex justify-between items-center border-t border-gray-100 pt-4">
        <div className="w-1/3 h-6 bg-gray-200 rounded-sm" />
      </div>
    </div>
  </div>
);

export default function MenuClient({ lang = "en", categories = [], items = [], totalPages = 1, currentPage = 1 }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ui = uiText[lang] || uiText.en;
  const isAr = lang === "ar";

  const [isPending, startTransition] = useTransition();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "featured";
  const currentOffers = searchParams.get("offers") === "true";
  const currentSearch = searchParams.get("search") || "";

  const createQueryString = useCallback((name, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (name !== "page") params.set("page", "1"); 
    if (value) params.set(name, value);
    else params.delete(name);
    return params.toString();
  }, [searchParams]);

  const updateFilter = (key, value) => {
    startTransition(() => {
      router.push(pathname + "?" + createQueryString(key, value), { scroll: false });
    });
  };

  const handlePageChange = (page) => {
    startTransition(() => {
      router.push(pathname + "?" + createQueryString("page", page.toString()), { scroll: true });
    });
  };

  const clearAllFilters = () => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  return (
    <section 
      dir={isAr ? "rtl" : "ltr"} 
      className="min-h-screen w-full bg-white text-black pt-32 pb-24 font-sans selection:bg-[#E88D15] selection:text-white"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        
        {/* --- PAGE HEADER --- */}
        <div className="mb-12 text-start border-b border-gray-100 pb-8">
          <Animate opacity={0}>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-black mb-3">
              {ui.title}
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl leading-relaxed">
              {ui.subtitle}
            </p>
          </Animate>
        </div>

        {/* --- MAIN LAYOUT --- */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* ======================================= */}
          {/* FILTER SIDEBAR                          */}
          {/* ======================================= */}
          <aside className="w-full lg:w-[240px] flex-shrink-0 relative z-30">
            
            {/* Mobile Toggle Button */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full lg:hidden flex items-center justify-between bg-white border border-gray-200 text-black px-4 py-3 rounded-md font-medium text-sm transition-colors hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
            >
              <span>{ui.filtersBtn}</span>
              <svg className={`w-4 h-4 transition-transform duration-300 ${isSidebarOpen ? "rotate-180" : "rotate-0"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Sidebar Body */}
            <div className={`grid transition-all duration-300 ease-in-out ${isSidebarOpen ? "grid-rows-[1fr] opacity-100 pt-6" : "grid-rows-[0fr] opacity-0 pt-0 lg:pt-0"} lg:grid-rows-[1fr] lg:opacity-100`}>
              <div className="overflow-hidden lg:overflow-visible">
                <div className={`flex flex-col gap-8 lg:sticky lg:top-28 transition-opacity duration-300 ${isPending ? "opacity-60 pointer-events-none" : "opacity-100"}`}>
                  
                  {/* Search */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] text-gray-400 font-bold tracking-widest">{ui.search}</label>
                    <div className="relative flex items-center border border-gray-200 rounded-md focus-within:border-black transition-colors bg-white">
                      <svg className="w-4 h-4 text-gray-400 ms-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        disabled={isPending}
                        placeholder="Search menu..."
                        defaultValue={currentSearch}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") updateFilter("search", e.target.value);
                        }}
                        onBlur={(e) => updateFilter("search", e.target.value)}
                        className="w-full bg-transparent text-sm text-black placeholder-gray-400 focus:outline-none px-3 py-2 text-start disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[10px] text-gray-400 font-bold tracking-widest">{ui.categories}</h3>
                    <div className="flex flex-col gap-1">
                      <button
                        disabled={isPending || currentCategory === "all"}
                        onClick={() => updateFilter("category", "")}
                        className={`w-full text-start px-3 py-2 text-sm transition-all border-s-[2px] rounded-r-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black cursor-pointer ${
                          currentCategory === "all" 
                            ? "border-[#E88D15] bg-[#fff8f0] text-black font-bold" 
                            : "border-transparent text-gray-600 hover:text-black hover:bg-[#fff8f0] hover:border-[#E88D15] disabled:opacity-50"
                        }`}
                      >
                        {ui.all}
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat._id}
                          disabled={isPending || currentCategory === cat.slug}
                          onClick={() => updateFilter("category", cat.slug)}
                          className={`w-full text-start px-3 py-2 text-sm transition-all border-s-[2px] rounded-r-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black cursor-pointer ${
                            currentCategory === cat.slug 
                              ? "border-[#E88D15] bg-[#fff8f0] text-black font-bold" 
                              : "border-transparent text-gray-600 hover:text-black hover:bg-[#fff8f0] hover:border-[#E88D15] disabled:opacity-50"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div className="flex flex-col gap-3 pt-2 border-t border-gray-100">
                    <h3 className="text-[10px] text-gray-400 font-bold tracking-widest">{ui.sort}</h3>
                    <div className="relative border border-gray-200 rounded-md focus-within:border-black transition-colors bg-white">
                      <select
                        disabled={isPending}
                        value={currentSort}
                        onChange={(e) => updateFilter("sort", e.target.value)}
                        className="w-full bg-transparent text-sm text-black focus:outline-none appearance-none cursor-pointer px-3 py-2 text-start disabled:cursor-not-allowed"
                      >
                        <option value="featured">{ui.sortFeatured}</option>
                        <option value="low-high">{ui.sortLowHigh}</option>
                        <option value="high-low">{ui.sortHighLow}</option>
                      </select>
                      <div className="absolute top-1/2 -translate-y-1/2 end-3 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Offers Toggle */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <label 
                      className={`text-[10px] text-gray-400 font-bold tracking-widest select-none ${isPending ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      onClick={() => !isPending && updateFilter("offers", currentOffers ? "" : "true")}
                    >
                      {ui.showOffers}
                    </label>
                    <button
                      disabled={isPending}
                      onClick={() => updateFilter("offers", currentOffers ? "" : "true")}
                      className={`w-10 h-5 rounded-full relative transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#E88D15] disabled:cursor-not-allowed ${currentOffers ? "bg-[#E88D15]" : "bg-gray-200 border border-gray-300"}`}
                    >
                      <div className={`absolute top-[1px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${currentOffers ? "start-[22px]" : "start-[1px]"}`} />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </aside>

          {/* ======================================= */}
          {/* PRODUCT GRID & PAGINATION               */}
          {/* ======================================= */}
          <div className="flex-1 flex flex-col relative z-20 w-full">
            {isPending ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6 mb-12">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <ProductSkeleton key={idx} />
                ))}
              </div>
            ) : items.length > 0 ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6 mb-12">
                  {items.map((product, index) => (
                    <Animate key={product._id} opacity={0} delay={index * 0.03} className="h-full">
                      <BurgerCard product={product} lang={lang} t={ui} />
                    </Animate>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="w-full flex items-center justify-center gap-2 mt-8 border-t border-gray-100 pt-8">
                    <button 
                      disabled={currentPage <= 1 || isPending}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="w-9 h-9 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:border-black hover:text-black disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-600 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
                    >
                      <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {Array.from({ length: totalPages }).map((_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          disabled={isPending}
                          onClick={() => handlePageChange(page)}
                          className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium transition-colors border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:opacity-50 disabled:cursor-not-allowed ${
                            currentPage === page 
                              ? "bg-black text-white border-black" 
                              : "bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    <button 
                      disabled={currentPage >= totalPages || isPending}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="w-9 h-9 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:border-black hover:text-black disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-600 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
                    >
                      <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="flex-1 flex flex-col items-center justify-center py-24 bg-[#fafafa] rounded-lg border border-dashed border-gray-300 text-center px-6">
                <svg className="w-8 h-8 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-black mb-2">{ui.noResults}</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-sm">Try adjusting your filters or search terms to find what you're looking for.</p>
                <button
                  onClick={clearAllFilters}
                  disabled={isPending}
                  className="bg-[#E88D15] hover:bg-[#d67e0f] text-white px-5 py-2.5 text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E88D15]"
                >
                  {ui.clearFilters}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}