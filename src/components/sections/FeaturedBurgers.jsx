"use client";

import Image from "next/image";
import Animate from "@/components/animation/Animate";

// Mock data for the featured burgers
const featuredBurgers = [
  {
    id: 1,
    name: "The Classic Wagyu",
    desc: "100% Wagyu beef, aged cheddar, caramelized onions, truffle mayo.",
    price: "68 SAR",
    image: "/hero.png", // Replace with actual transparent PNG
  },
  {
    id: 2,
    name: "Inferno Blaze",
    desc: "Spicy pepper jack, roasted jalapenos, secret blazing hot sauce.",
    price: "55 SAR",
    image: "/hero.png", // Replace with actual transparent PNG
  },
  {
    id: 3,
    name: "Truffle Mushroom",
    desc: "Melted Swiss, wild roasted mushrooms, rich garlic aioli.",
    price: "62 SAR",
    image: "/hero.png", // Replace with actual transparent PNG
  },
  {
    id: 4,
    name: "Double Smash",
    desc: "Two crispy smashed patties, smoked bacon, signature house sauce.",
    price: "75 SAR",
    image: "/hero.png", // Replace with actual transparent PNG
  },
];

export default function FeaturedBurgers() {
  return (
    <section className="relative w-full bg-[#050505] text-white py-16 sm:py-24 lg:py-32 overflow-hidden font-sans selection:bg-white selection:text-[#E88C15]">
      
      {/* --- BACKGROUND TYPOGRAPHY --- */}
      <div className="absolute top-[2%] left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0">
        <h2 className="text-[28vw] font-black leading-none tracking-tighter text-[#0a0a0a] uppercase">
          Menu
        </h2>
      </div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 lg:mb-24">
          <Animate y={20} opacity={0}>
            <span className="text-[#E88C15] font-bold tracking-widest uppercase text-[10px] sm:text-xs lg:text-sm mb-3 sm:mb-4 block">
              Taste the Perfection
            </span>
          </Animate>
          <Animate y={20} opacity={0} delay={0.1}>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-none">
              Signature <br className="md:hidden" /><span className="text-[#E88C15]">Burgers</span>
            </h2>
          </Animate>
          <Animate y={20} opacity={0} delay={0.2}>
            <p className="mt-3 sm:mt-4 lg:mt-6 text-gray-400 max-w-lg mx-auto text-xs sm:text-sm lg:text-base font-light">
              Crafted for true flavor lovers. Experience the finest ingredients combined to create the ultimate bite.
            </p>
          </Animate>
        </div>

        {/* --- BURGERS GRID --- */}
        {/* Enforced 2 columns on mobile, 3 on tablet, 4 on desktop. Increased gap-y to account for removed card boxes. */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16 lg:gap-x-10 lg:gap-y-20">
          {featuredBurgers.map((burger, index) => (
            <Animate
              key={burger.id}
              y={30}
              opacity={0}
              delay={0.2 + index * 0.1} // Staggered, smooth natural entrance
              className="h-full"
            >
              {/* Breathable, Flat Container (No backgrounds, borders, or shadows) */}
              <div className="group relative h-full flex flex-col cursor-pointer rounded-md">
                
                {/* Burger Image container with subtle, premium hover scale */}
                <div className="relative w-full h-28 sm:h-40 lg:h-52 mb-5 sm:mb-6 lg:mb-8 flex items-center justify-center z-10 pointer-events-none">
                  <Image
                    src={burger.image}
                    alt={burger.name}
                    fill
                    className="object-contain transform group-hover:scale-[1.07] transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>

                {/* Text Content */}
                <div className="relative z-10 flex-1 flex flex-col text-center md:text-left">
                  {/* Clean, Bold Title */}
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#E88C15] transition-colors duration-300">
                    {burger.name}
                  </h3>
                  {/* Muted Gray Description */}
                  <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs lg:text-sm text-gray-500 font-light leading-snug sm:leading-relaxed line-clamp-2">
                    {burger.desc}
                  </p>
                  
                  {/* Footer: Price & Minimal Action */}
                  <div className="mt-auto pt-5 sm:pt-6 lg:pt-8 flex flex-col md:flex-row items-center md:items-end justify-between gap-3 md:gap-0">
                    <span className="text-sm sm:text-base lg:text-lg font-bold text-white whitespace-nowrap">
                      {burger.price}
                    </span>
                    
                    {/* Clean Action Button - rounded-md as requested */}
                    <button className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white text-[#050505] font-bold uppercase tracking-widest text-[9px] sm:text-[10px] lg:text-xs rounded-md group-hover:bg-[#E88C15] group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                      Order
                    </button>
                  </div>
                </div>

              </div>
            </Animate>
          ))}
        </div>

        {/* --- VIEW ALL MENU CTA --- */}
        <Animate y={20} opacity={0} delay={0.6} className="mt-16 sm:mt-20 lg:mt-24 flex justify-center">
          <button className="group px-6 py-3 sm:px-8 sm:py-4 bg-transparent text-white font-bold uppercase tracking-widest text-[10px] sm:text-xs lg:text-sm hover:text-[#E88C15] transition-colors duration-300 flex items-center gap-2 sm:gap-3 rounded-md">
            Explore Full Menu
            <svg className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </Animate>

      </div>
    </section>
  );
}