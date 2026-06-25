"use client";

import { useEffect, useState } from "react";

export default function CategoryNav({ 
  categories = [], 
  activeCategory = "all", 
  onCategoryClick,
  lang = "en"
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isAr = lang === "ar";

  const uiText = {
    en: { all: "All Products" },
    ar: { all: "جميع المنتجات" }
  };

  const ui = uiText[lang] || uiText.en;

  // Build category list with "All" as first item
  const categoryList = [
    { _id: "all", slug: "all", name: ui.all },
    ...categories
  ];

  // Update active index when activeCategory changes
  useEffect(() => {
    const index = categoryList.findIndex(cat => cat.slug === activeCategory);
    setActiveIndex(index !== -1 ? index : 0);
  }, [activeCategory, categoryList]);

  // Scroll to category section
  const handleCategoryClick = (slug) => {
    if (slug === "all") {
      // Scroll to top of menu
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Scroll to specific category section
      const element = document.getElementById(`category-${slug}`);
      if (element) {
        const offset = 120; // Account for sticky nav and main header
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth"
        });
      }
    }
    onCategoryClick(slug);
  };

  return (
    <nav className="sticky top-24 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-3 mb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
          {categoryList.map((category, index) => (
            <button
              key={category._id}
              onClick={() => handleCategoryClick(category.slug)}
              className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E88D15] ${
                index === activeIndex
                  ? "bg-[#E88D15] text-white shadow-md"
                  : "bg-gray-50 text-gray-600 hover:bg-[#fff8f0] hover:text-black"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
