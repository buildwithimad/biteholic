"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Animate from "@/components/animation/Animate";

// Static content for headers/buttons
const content = {
  en: {
    badge: "The Full Collection",
    title: "Menu",
    premium: "Premium Selection",
    btn: "View Full Menu",
    currency: "SAR",
    otherCategory: "Other"
  },
  ar: {
    badge: "التشكيلة الكاملة",
    title: "المنيو",
    premium: "اختيار فاخر",
    btn: "عرض القائمة كاملة",
    currency: "ريال",
    otherCategory: "أخرى"
  }
};

// Helper function to safely extract Sanity Image URLs
const getImageUrl = (imageObj) => {
  if (!imageObj) return null;
  if (typeof imageObj === 'string') return imageObj;
  if (imageObj?.asset?.url) return imageObj.asset.url;
  return "/hero.png"; // Fallback image
};

export default function MenuPreview({ lang = "en", products = [] }) {
  const t = content[lang] || content.en;
  const isAr = lang === "ar";
  
  // Group products by category dynamically
  const groupedProducts = products.reduce((acc, product) => {
    const catName = product.category?.name || t.otherCategory;
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(product);
    return acc;
  }, {});

  // Get categories as an array of entries [CategoryName, ProductsArray]
  const categories = Object.entries(groupedProducts);

  // Initialize active image with the first product's image if available
  const initialImage = products.length > 0 ? getImageUrl(products[0].mainImage) : "/hero.png";
  const [activeImage, setActiveImage] = useState(initialImage);

  // Update image if products prop changes
  useEffect(() => {
    if (products.length > 0) {
      setActiveImage(getImageUrl(products[0].mainImage));
    }
  }, [products]);

  // If no products, don't render the section
  if (!products || products.length === 0) return null;

  return (
    <section className="relative w-full bg-[#050505] text-white py-24 lg:py-32 overflow-hidden selection:bg-[#E88C15] selection:text-black">
      
      <div className="max-w-[90rem] mx-auto px-6 relative z-20">
        
        {/* --- HEADER SECTION --- */}
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20 border-b border-white/5 pb-12 ${isAr ? 'md:flex-row-reverse' : ''}`}>
          <div className={`space-y-4 ${isAr ? 'text-right' : 'text-left'}`}>
            <Animate y={10} opacity={0}>
              <span className="inline-block bg-[#E88C15] text-black text-[10px] font-black uppercase px-4 py-1.5 tracking-widest rounded-none">
                {t.badge}
              </span>
            </Animate>
            <Animate y={20} opacity={0} delay={0.1}>
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
                {t.title}<span className="text-[#E88C15]">.</span>
              </h2>
            </Animate>
          </div>
          <Animate y={10} opacity={0} delay={0.2} className={`md:max-w-[250px] ${isAr ? 'text-right' : 'text-left'}`}>
            <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-[0.2em] leading-loose">
              {isAr ? "مكونات طازجة مستوردة يومياً لضمان الجودة" : "Fresh ingredients imported daily for perfection"}
            </p>
          </Animate>
        </div>

        {/* --- MENU LAYOUT --- */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 ${isAr ? 'rtl' : 'ltr'}`}>
          
          {/* Menu Items List (8 Columns) */}
          <div className="lg:col-span-8 space-y-16">
            {categories.map(([categoryName, items], catIndex) => (
              <div key={catIndex}>
                
                {/* Category Title */}
                <h3 className={`text-[#E88C15] text-xs sm:text-sm font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-8 flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <span className="w-8 sm:w-12 h-[2px] bg-[#E88C15]" /> {categoryName}
                </h3>
                
                {/* Products Grid inside Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {items.map((item, itemIndex) => {
                    const imgUrl = getImageUrl(item.mainImage);
                    const hasSale = item.isOnSale && item.discountPrice;
                    const price = item.price;
                    const discountPrice = item.discountPrice;

                    return (
                      <div 
                        key={item._id || itemIndex}
                        onMouseEnter={() => setActiveImage(imgUrl)}
                        className={`group flex items-center gap-4 cursor-pointer border-b border-white/5 pb-4 hover:border-[#E88C15] transition-colors duration-300 ${isAr ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
                      >
                        {/* Small Item Image */}
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#111] flex-shrink-0 rounded-none border border-white/5 group-hover:border-[#E88C15]/50 transition-colors">
                           <Image src={imgUrl} alt={item.name} fill className="object-contain p-2" sizes="80px" />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 w-full">
                          <div className={`flex justify-between items-baseline mb-1 ${isAr ? 'flex-row-reverse' : ''}`}>
                            <h4 className="text-sm sm:text-base font-bold group-hover:text-[#E88C15] transition-colors uppercase tracking-tight">
                              {item.name}
                            </h4>
                            <div className="flex-1 border-b border-dotted border-white/10 mx-3 group-hover:border-[#E88C15]/40 transition-colors" />
                            
                            {/* Pricing Logic */}
                            <div className={`flex items-baseline gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                               {hasSale ? (
                                 <>
                                   <span className="text-gray-600 line-through text-[10px] sm:text-xs">{price}</span>
                                   <span className="font-black text-[#E88C15] text-sm sm:text-base">
                                     {discountPrice} <small className="text-[8px] uppercase tracking-widest ml-0.5">{t.currency}</small>
                                   </span>
                                 </>
                               ) : (
                                 <span className="font-black text-white group-hover:text-[#E88C15] transition-colors text-sm sm:text-base">
                                   {price} <small className="text-[8px] uppercase tracking-widest ml-0.5">{t.currency}</small>
                                 </span>
                               )}
                            </div>
                          </div>
                          
                          <p className="text-gray-500 text-[10px] sm:text-xs font-light group-hover:text-gray-400 transition-colors line-clamp-1 mt-1">
                            {item.shortDescription || "Premium quality ingredients"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* --- STICKY VISUAL SIDEBAR (4 Columns) --- */}
          <div className="hidden lg:block lg:col-span-4 sticky top-32 h-fit">
             <div className="relative aspect-[3/4] bg-[#111] border border-white/5 group rounded-none overflow-hidden">
                
                {/* Floating Decoration */}
                <div className={`absolute top-6 ${isAr ? 'right-6' : 'left-6'} z-20 bg-[#050505] border border-white/10 px-4 py-2 rounded-none`}>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#E88C15]">{t.premium}</span>
                </div>
                
                {/* Product Image Display */}
                <div className="absolute inset-0 p-8 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
                  <Image 
                    src={activeImage} 
                    alt="Active menu item" 
                    fill 
                    className="object-contain p-12 transition-opacity duration-300"
                    priority
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                
                {/* Corner Accents */}
                <div className={`absolute bottom-6 ${isAr ? 'left-6' : 'right-6'} z-20`}>
                    <div className={`w-12 h-12 border-b-2 border-[#E88C15] ${isAr ? 'border-l-2' : 'border-r-2'}`} />
                </div>
             </div>
             
             {/* Action Button */}
             <Link href={`/${lang}/menu`} className="block w-full">
               <button className="w-full mt-6 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] md:text-xs rounded-none hover:bg-[#E88C15] hover:text-white transition-colors duration-300">
                  {t.btn}
               </button>
             </Link>
          </div>

        </div>

      </div>
    </section>
  );
}