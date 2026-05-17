"use client";

import { useState, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Animate from "@/components/animation/Animate";
import BurgerCard from "@/components/cards/BurgerCard";

// UI Dictionary
const uiText = {
  en: {
    title: "Our Menu",
    subtitle: "Discover our premium selection of handcrafted burgers and sides.",
    search: "Search...",
    categories: "Categories",
    all: "All Products",
    sort: "Sort By",
    sortFeatured: "Featured",
    sortLowHigh: "Price: Low to High",
    sortHighLow: "Price: High to Low",
    offers: "Special Offers",
    showOffers: "On Sale Only",
    filtersBtn: "Filter Menu",
    noResults: "No products found matching your criteria.",
    clearFilters: "Clear Filters",
    currency: "SAR",
    orderBtn: "Order Now"
  },
  ar: {
    title: "قائمتنا",
    subtitle: "اكتشف تشكيلتنا الفاخرة من البرجر المحضر يدوياً والأطباق الجانبية.",
    search: "بحث...",
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

export default function MenuClient({ lang = "en", categories = [], items = [], totalPages = 1, currentPage = 1 }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ui = uiText[lang] || uiText.en;

  // Mobile sidebar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Extract current filters from URL
  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "featured";
  const currentOffers = searchParams.get("offers") === "true";
  const currentSearch = searchParams.get("search") || "";

  // Helper to update the URL cleanly
  const createQueryString = useCallback((name, value) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // If updating a filter, always reset to page 1
    if (name !== "page") params.set("page", "1"); 
    
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params.toString();
  }, [searchParams]);

  const updateFilter = (key, value) => {
    router.push(pathname + "?" + createQueryString(key, value), { scroll: false });
  };

  const handlePageChange = (page) => {
    router.push(pathname + "?" + createQueryString("page", page.toString()), { scroll: true });
  };

  const clearAllFilters = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <section className="min-h-screen bg-[#050505] text-white pt-32 pb-24 selection:bg-[#E88C15] selection:text-black">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6">
        
        {/* --- PAGE HEADER --- */}
        <div className="mb-12 text-start">
          <Animate y={20} opacity={0}>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">{ui.title}</h1>
            <p className="text-gray-400 max-w-2xl inline-block font-light">{ui.subtitle}</p>
          </Animate>
        </div>

        {/* --- MAIN LAYOUT (Sidebar + Grid) --- */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* ======================================= */}
          {/* LEFT/RIGHT: FILTER SIDEBAR                */}
          {/* ======================================= */}
          <aside className="w-full lg:w-72 flex-shrink-0 relative z-30">
            
            {/* Mobile Toggle Button */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full lg:hidden flex items-center justify-between bg-[#111] p-5 rounded-none font-bold uppercase tracking-widest text-xs hover:bg-[#1a1a1a] transition-colors"
            >
              <span>{ui.filtersBtn}</span>
              {/* Smooth rotating chevron icon */}
              <svg 
                className={`w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isSidebarOpen ? "rotate-180" : "rotate-0"}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Sidebar Content (Smooth Expand on Mobile, Sticky on Desktop) */}
            <div 
              className={`grid transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isSidebarOpen ? "grid-rows-[1fr] opacity-100 pt-6 mb-8" : "grid-rows-[0fr] opacity-0 pt-0 mb-6 lg:mb-0"
              } lg:grid-rows-[1fr] lg:opacity-100 lg:pt-0`}
            >
              {/* overflow-hidden is required for the grid-row expansion to clip content cleanly */}
              <div className="overflow-hidden lg:overflow-visible">
                <div className="space-y-8 bg-[#050505] pb-2 lg:pb-8 lg:sticky lg:top-28">
                  
                  {/* Search */}
                  <div className="flex flex-col gap-3 text-start">
                    <input
                      type="text"
                      placeholder={ui.search}
                      defaultValue={currentSearch}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") updateFilter("search", e.target.value);
                      }}
                      onBlur={(e) => updateFilter("search", e.target.value)}
                      className="w-full bg-[#111] px-5 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:bg-[#1a1a1a] transition-colors rounded-none text-start"
                    />
                  </div>

                  {/* Categories */}
                  <div className="flex flex-col gap-3 text-start">
                    <h3 className="text-[10px] text-gray-500 uppercase tracking-widest font-black px-1">{ui.categories}</h3>
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => updateFilter("category", "")}
                        className={`w-full text-sm py-4 px-5 transition-colors rounded-none text-start ${currentCategory === "all" ? "bg-[#E88C15] text-black font-bold" : "bg-[#111] text-gray-400 hover:bg-[#1a1a1a] hover:text-white"}`}
                      >
                        {ui.all}
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat._id}
                          onClick={() => updateFilter("category", cat.slug)}
                          className={`w-full text-sm py-4 px-5 transition-colors rounded-none text-start ${currentCategory === cat.slug ? "bg-[#E88C15] text-black font-bold" : "bg-[#111] text-gray-400 hover:bg-[#1a1a1a] hover:text-white"}`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div className="flex flex-col gap-3 text-start">
                    <h3 className="text-[10px] text-gray-500 uppercase tracking-widest font-black px-1">{ui.sort}</h3>
                    <select
                      value={currentSort}
                      onChange={(e) => updateFilter("sort", e.target.value)}
                      className="w-full bg-[#111] px-5 py-4 text-sm text-white focus:outline-none focus:bg-[#1a1a1a] appearance-none cursor-pointer rounded-none transition-colors text-start"
                      style={{ WebkitAppearance: 'none' }}
                    >
                      <option value="featured">{ui.sortFeatured}</option>
                      <option value="low-high">{ui.sortLowHigh}</option>
                      <option value="high-low">{ui.sortHighLow}</option>
                    </select>
                  </div>

                  {/* Offers Toggle */}
                  <div className="flex flex-col gap-3 text-start">
                    <h3 className="text-[10px] text-gray-500 uppercase tracking-widest font-black px-1">{ui.offers}</h3>
                    <button
                      onClick={() => updateFilter("offers", currentOffers ? "" : "true")}
                      className={`w-full py-4 px-5 text-xs font-bold uppercase tracking-widest transition-colors rounded-none text-start ${
                        currentOffers ? "bg-[#E88C15] text-black" : "bg-[#111] text-gray-400 hover:bg-[#1a1a1a] hover:text-white"
                      }`}
                    >
                      {ui.showOffers}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </aside>

          {/* ======================================= */}
          {/* RIGHT/LEFT: PRODUCT GRID & PAGINATION     */}
          {/* ======================================= */}
          <div className="flex-1 flex flex-col relative z-20">
            {items.length > 0 ? (
              <>
                {/* Product Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-16">
                  {items.map((product, index) => (
                    <Animate key={product._id} y={20} opacity={0} delay={index * 0.05} className="h-full">
                      <BurgerCard product={product} lang={lang} t={ui} />
                    </Animate>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="w-full flex items-center justify-center gap-1 mt-8">
                    <button 
                      disabled={currentPage <= 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="w-12 h-12 flex items-center justify-center rounded-none bg-[#111] text-white hover:bg-[#1a1a1a] disabled:opacity-30 disabled:hover:bg-[#111] disabled:cursor-not-allowed transition-colors"
                    >
                      <span className="rtl:rotate-180">←</span>
                    </button>

                    {Array.from({ length: totalPages }).map((_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-12 h-12 flex items-center justify-center rounded-none text-sm font-bold transition-colors ${
                            currentPage === page 
                              ? "bg-[#E88C15] text-black" 
                              : "bg-[#111] text-gray-400 hover:bg-[#1a1a1a] hover:text-white"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    <button 
                      disabled={currentPage >= totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="w-12 h-12 flex items-center justify-center rounded-none bg-[#111] text-white hover:bg-[#1a1a1a] disabled:opacity-30 disabled:hover:bg-[#111] disabled:cursor-not-allowed transition-colors"
                    >
                      <span className="rtl:rotate-180">→</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="flex-1 flex flex-col items-center justify-center py-32 bg-[#111] rounded-none">
                <span className="text-6xl mb-6 opacity-20">🍔</span>
                <h3 className="text-xl font-light text-gray-400 mb-6">{ui.noResults}</h3>
                <button
                  onClick={clearAllFilters}
                  className="bg-[#E88C15] text-black px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors rounded-none"
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