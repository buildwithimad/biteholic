"use client";

import Animate from "@/components/animation/Animate";
// Import your new BurgerCard
import BurgerCard from "@/components/cards/BurgerCard"; 

const content = {
  en: {
    badge: "Most Requested",
    title1: "Featured",
    title2: "Burgers",
    desc: "Premium burgers with carefully selected ingredients.",
    orderBtn: "Order Now",
    exploreBtn: "View Full Menu",
    currency: "SAR",
    category: "Burger"
  },
  ar: {
    badge: "الأكثر طلباً",
    title1: "مميز", 
    title2: "البرغر",  
    desc: "برجر فاخر بمكونات مختارة بعناية",
    orderBtn: "اطلب الآن",
    exploreBtn: "عرض القائمة كاملة",
    currency: "SAR",
    category: "برجر"
  }
};

export default function FeaturedBurgers({ lang = "en", products = [] }) {
  const t = content[lang] || content.en;
  
  // Limit to 4 products for the 4-column layout
  const displayProducts = products.slice(0, 4);

  return (
    <section className="relative w-full overflow-hidden  selection:text-white">
      
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 relative z-10 py-16 lg:py-24">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
          <Animate y={20} opacity={0}>
            <span className="text-gray-400 text-sm font-medium mb-4 block">
              {t.badge}
            </span>
          </Animate>
          <Animate y={20} opacity={0} delay={0.1}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
              {t.title1} {t.title2}
            </h2>
          </Animate>
          <Animate y={20} opacity={0} delay={0.2}>
            <p className="text-gray-400 text-sm sm:text-base font-normal">
              {t.desc}
            </p>
          </Animate>
        </div>

        {/* --- REAL PRODUCTS GRID --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-8">
          {displayProducts.map((product, index) => (
            <Animate
              key={product._id || index}
              y={30}
              opacity={0}
              delay={0.1 * index}
              className="h-full"
            >
              {/* Using the reusable BurgerCard */}
              <BurgerCard product={product} t={t} />
            </Animate>
          ))}
        </div>

      </div>
    </section>
  );
}