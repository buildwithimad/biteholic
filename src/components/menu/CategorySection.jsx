"use client";

import Animate from "@/components/animation/Animate";
import BurgerCard from "@/components/cards/BurgerCard";

export default function CategorySection({ 
  category, 
  products = [], 
  lang = "en",
  ui
}) {
  const isAr = lang === "ar";

  if (!products || products.length === 0) return null;

  return (
    <div id={`category-${category.slug}`} className="mb-12 scroll-mt-32">
      {/* Category Banner */}
      <div className="mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          {category.icon && (
            <div className="w-8 h-8 flex items-center justify-center bg-[#E88D15] rounded-lg text-white">
              <span className="text-sm">{category.icon}</span>
            </div>
          )}
          <h2 className="text-2xl md:text-3xl font-bold text-black tracking-tight">
            {category.name}
          </h2>
        </div>
        
        {category.description && (
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-3xl">
            {category.description}
          </p>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6">
        {products.map((product, index) => (
          <Animate key={product._id} opacity={0} delay={index * 0.03} className="h-full">
            <BurgerCard product={product} lang={lang} t={ui} />
          </Animate>
        ))}
      </div>
    </div>
  );
}
