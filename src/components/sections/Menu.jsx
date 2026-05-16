"use client";

import { useState } from "react";
import Image from "next/image";
import Animate from "@/components/animation/Animate";

const content = {
  en: {
    badge: "The Full Collection",
    title: "Menu",
    premium: "Premium Selection",
    btn: "Download PDF Menu",
    categories: [
      {
        title: "Signatures",
        items: [
          { name: "Classic Wagyu", desc: "Aged cheddar, truffle mayo", price: "68", img: "/burger1.png" },
          { name: "Inferno Blaze", desc: "Pepper jack, secret hot sauce", price: "55", img: "/burger2.png" },
          { name: "Double Smash", desc: "Double patty, smoked bacon", price: "75", img: "/burger3.png" },
          { name: "Truffle Mushroom", desc: "Swiss cheese, garlic aioli", price: "62", img: "/burger4.png" },
        ]
      },
      {
        title: "Sides",
        items: [
          { name: "Truffle Fries", desc: "Hand-cut, parmesan dusting", price: "28", img: "/fries1.png" },
          { name: "Wagyu Fries", desc: "Cheese sauce, wagyu bits", price: "38", img: "/fries2.png" },
          { name: "Onion Rings", desc: "House-made ranch dip", price: "22", img: "/rings.png" },
          { name: "Cheese Bites", desc: "Jalapeño infused cheese", price: "26", img: "/bites.png" },
        ]
      },
      {
        title: "Drinks",
        items: [
          { name: "Vanilla Shake", desc: "Hand-spun thick shake", price: "32", img: "/shake1.png" },
          { name: "Choc Truffle", desc: "Premium cocoa, whipped cream", price: "35", img: "/shake2.png" },
          { name: "Mint Lemonade", desc: "Freshly squeezed daily", price: "18", img: "/drink1.png" },
          { name: "Signature Tea", desc: "Peach infused, lightly sweetened", price: "16", img: "/drink2.png" },
        ]
      }
    ]
  },
  ar: {
    badge: "التشكيلة الكاملة",
    title: "المنيو",
    premium: "اختيار فاخر",
    btn: "تحميل القائمة PDF",
    categories: [
      {
        title: "المميزة",
        items: [
          { name: "كلاسيك واغيو", desc: "شيدر معتق، مايونيز الكمأة", price: "٦٨", img: "/burger1.png" },
          { name: "إنفرنو بليز", desc: "بيبر جاك، صلصة حارة سرية", price: "٥٥", img: "/burger2.png" },
          { name: "دبل سماش", desc: "شريحتين لحم، بيكون مدخن", price: "٧٥", img: "/burger3.png" },
          { name: "ترفل مشروم", desc: "جبنة سويسرية، أيولي الثوم", price: "٦٢", img: "/burger4.png" },
        ]
      },
      {
        title: "المقبلات",
        items: [
          { name: "بطاطس ترفل", desc: "مقطعة يدوياً، مرشوشة بالبارميزان", price: "٢٨", img: "/fries1.png" },
          { name: "بطاطس واغيو", desc: "صلصة الجبن، قطع واغيو", price: "٣٨", img: "/fries2.png" },
          { name: "حلقات بصل", desc: "تغميسة رانش محضرة محلياً", price: "٢٢", img: "/rings.png" },
          { name: "بايتس الجبن", desc: "جبنة محشوة بالهلابينو", price: "٢٦", img: "/bites.png" },
        ]
      },
      {
        title: "المشروبات",
        items: [
          { name: "فانيليا شيك", desc: "مخفوق سميك يدوي", price: "٣٢", img: "/shake1.png" },
          { name: "شوكولاتة داكنة", desc: "كاكاو فاخر، كريمة مخفوقة", price: "٣٥", img: "/shake2.png" },
          { name: "ليمونادة بالنعناع", desc: "عصير طازج يومياً", price: "١٨", img: "/drink1.png" },
          { name: "آيس تي", desc: "بنكهة الخوخ، محلى بخفة", price: "١٦", img: "/drink2.png" },
        ]
      }
    ]
  }
};

export default function MenuPreview({ lang = "en" }) {
  const t = content[lang] || content.en;
  const isAr = lang === "ar";
  const [activeImage, setActiveImage] = useState(t.categories[0].items[0].img);

  return (
    <section className="relative w-full bg-[#050505] text-white py-24 lg:py-32 overflow-hidden selection:bg-[#E88C15] selection:text-black">
      
      {/* Dynamic Background Image - Changes on Hover */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] opacity-10 blur-[100px] pointer-events-none transition-all duration-1000">
        <div className="w-full h-full bg-[#E88C15] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <Animate y={10} opacity={0}>
              <span className="inline-block bg-[#E88C15] text-black text-[10px] font-black uppercase px-3 py-1 tracking-widest">
                {t.badge}
              </span>
            </Animate>
            <Animate y={20} opacity={0} delay={0.1}>
              <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
                {t.title}<span className="text-[#E88C15]">.</span>
              </h2>
            </Animate>
          </div>
          <Animate y={10} opacity={0} delay={0.2} className="md:max-w-[200px]">
            <p className="text-gray-500 text-xs uppercase tracking-[0.2em] leading-loose">
              {isAr ? "مكونات طازجة مستوردة يومياً" : "Fresh ingredients imported daily for perfection"}
            </p>
          </Animate>
        </div>

        {/* Menu Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Menu Items List (8 Columns) */}
          <div className="lg:col-span-8 space-y-16">
            {t.categories.map((cat, catIndex) => (
              <div key={catIndex}>
                <h3 className="text-[#E88C15] text-sm font-black uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-[#E88C15]" /> {cat.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  {cat.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      onMouseEnter={() => setActiveImage(item.img)}
                      className="group cursor-pointer border-b border-white/5 pb-4 hover:border-[#E88C15] transition-all duration-500"
                    >
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-xl font-bold group-hover:text-[#E88C15] transition-colors uppercase">
                          {item.name}
                        </h4>
                        <div className="flex-1 border-b border-dotted border-white/20 mx-4 group-hover:border-[#E88C15]/40" />
                        <span className="font-black text-lg">
                          {item.price}<small className="text-[10px] ml-1 uppercase">{isAr ? "ريال" : "sar"}</small>
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs font-light group-hover:text-gray-300 transition-colors">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Visual Sidebar (4 Columns) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-32 h-fit">
             <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#111] border border-white/10 group">
                {/* Floating Decoration */}
                <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                  <span className="text-[10px] font-bold uppercase tracking-widest">{t.premium}</span>
                </div>
                
                {/* Product Image Display */}
                <div className="absolute inset-0 p-8 flex items-center justify-center transition-all duration-700 ease-out group-hover:scale-110">
                  <Image 
                    src={activeImage} 
                    alt="Active menu item" 
                    fill 
                    className="object-contain p-12 transition-all duration-500"
                    priority
                  />
                </div>
                
                {/* Corner Accents */}
                <div className="absolute bottom-6 right-6 z-20">
                    <div className="w-12 h-12 border-r-2 border-b-2 border-[#E88C15]" />
                </div>
             </div>
             
             {/* Action Button */}
             <button className="w-full mt-8 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl hover:bg-[#E88C15] hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(232,140,21,0.2)]">
                {t.btn}
             </button>
          </div>

        </div>

      </div>
    </section>
  );
}