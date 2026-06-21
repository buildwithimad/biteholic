"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function MapSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  // Mocked positions for the floating pins to match the Riyadh spread
  const pins = [
    { id: 1, top: "20%", left: "45%", delay: 0.1 },
    { id: 2, top: "30%", left: "58%", delay: 0.2 },
    { id: 3, top: "25%", left: "70%", delay: 0.3 },
    { id: 4, top: "40%", left: "75%", delay: 0.4 },
    { id: 5, top: "45%", left: "55%", delay: 0.5 },
    { id: 6, top: "55%", left: "62%", delay: 0.6 },
    { id: 7, top: "65%", left: "50%", delay: 0.7 },
    { id: 8, top: "80%", left: "58%", delay: 0.8 },
    { id: 9, top: "75%", left: "70%", delay: 0.9 },
  ];

  // Lightweight native observer to trigger the animation (replaces Framer Motion's whileInView)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Runs only once, mimicking viewport={{ once: true }}
        }
      },
      { rootMargin: "-50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-[80vh] min-h-[400px] max-h-[700px] bg-[#f9f8f4] overflow-hidden"
    >
      {/* OPTIMIZATION: CSS Spring Animation 
        Mimics Framer Motion's { type: "spring", stiffness: 200 } perfectly.
        Uses calc() to preserve absolute positioning translation.
      */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pinDrop {
          0% { 
            opacity: 0; 
            transform: translate(-50%, calc(-100% - 20px)); 
          }
          60% { 
            opacity: 1; 
            transform: translate(-50%, calc(-100% + 4px)); 
          }
          80% { 
            transform: translate(-50%, calc(-100% - 2px)); 
          }
          100% { 
            opacity: 1; 
            transform: translate(-50%, -100%); 
          }
        }
        .animate-pin {
          animation: pinDrop 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}} />

      {/* OPTIMIZATION: Next.js Image component replaces the heavy Google Maps iframe */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/biteholicmap.webp"
          alt="BiteHolic Riyadh Locations Map"
          fill
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
          priority={false} // Lazy loads if below fold, saving initial bandwidth
        />
      </div>

      {/* Floating Markers Overlay */}
      <div className="absolute inset-0 z-10 w-full relative pointer-events-none">
        {pins.map((pin) => (
          <div
            key={pin.id}
            className={`absolute transform -translate-x-1/2 -translate-y-full opacity-0 ${isInView ? 'animate-pin' : ''}`}
            style={{ 
              top: pin.top, 
              left: pin.left, 
              animationDelay: `${pin.delay}s` 
            }}
          >
            {/* Custom BiteHolic Marker (Orange teardrop with 'B') */}
            <div className="relative group cursor-pointer pointer-events-auto origin-bottom">
              <svg 
                width="32" 
                height="42" 
                viewBox="0 0 32 42" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="drop-shadow-lg group-hover:scale-110 transition-transform duration-300 will-change-transform"
              >
                <path d="M16 0C7.16344 0 0 7.16344 0 16C0 28 16 42 16 42C16 42 32 28 32 16C32 7.16344 24.8366 0 16 0Z" fill="#E88D15"/>
                <text x="16" y="22" fontSize="14" fill="white" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  B
                </text>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Directions Button */}
<div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
  <Link
    href="https://maps.google.com/?q=BiteHolic+مطعم+عضة+الشغف+Riyadh"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-3 bg-[#E88D15] hover:bg-[#d67f0e] text-white font-semibold px-6 py-3 rounded-full shadow-xl transition-all duration-300 hover:scale-105"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894l5-2.5a1 1 0 01.894 0l5.106 2.553a1 1 0 00.894 0l5-2.5A1 1 0 0122 3.618v10.764a1 1 0 01-.553.894l-5 2.5a1 1 0 01-.894 0L10.447 15.223a1 1 0 00-.894 0L9 20z"
      />
    </svg>

    <span>Get Directions</span>
  </Link>
</div>

    </section>
  );
}