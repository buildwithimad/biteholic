"use client";

import Animate from "@/components/animation/Animate";

const content = {
  en: {
    bgText: "Vibe",
    badge: "Community Vibe",
    title: "Google Verified Reviews"
  },
  ar: {
    bgText: "ثقة",
    badge: "مجتمع بايت هوليك",
    title: "مراجعات موثقة من جوجل"
  }
};

// Authentic Google colors for avatars
const avatarColors = [
  "bg-[#4285F4]", // Blue
  "bg-[#EA4335]", // Red
  "bg-[#FBBC05]", // Yellow
  "bg-[#34A853]", // Green
  "bg-[#9C27B0]", // Purple
];

// Single Review Card Component
const ReviewCard = ({ review, index }) => {
  const bgColor = avatarColors[index % avatarColors.length];

  return (
    <div className="w-[300px] sm:w-[350px] lg:w-[400px] flex-shrink-0 flex flex-col p-6 bg-[#111] border border-white/5 rounded-2xl hover:bg-[#1a1a1a] transition-colors duration-300 cursor-pointer">
      
      {/* Header: Avatar, Name, & Google Icon */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar Circle */}
          <div className={`w-10 h-10 flex-shrink-0 text-white flex items-center justify-center font-bold text-sm rounded-full uppercase ${bgColor}`}>
            {review.initials}
          </div>
          
          {/* Name & Handle */}
          <div className="flex flex-col text-start">
            <span className="text-sm font-bold text-white tracking-wide">
              {review.name}
            </span>
            <span className="text-[10px] text-gray-500 tracking-widest uppercase" dir="ltr">
              {review.handle}
            </span>
          </div>
        </div>

        {/* Authentic Multi-color Google 'G' Icon */}
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      </div>

      {/* Review Text */}
      <p className="text-sm text-gray-300 font-light leading-relaxed flex-1 text-start mb-5 line-clamp-3">
        {review.text}
      </p>

      {/* Stars Footer - Forced to Yellow */}
      <div className="flex items-center gap-1 mt-auto">
        {[...Array(review.rating || 5)].map((_, i) => (
          <svg key={i} className="w-4 h-4 drop-shadow-sm" fill="#FBBC05" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default function Testimonials({ lang = "en", testimonials = [] }) {
  const t = content[lang] || content.en;
  const isAr = lang === "ar";

  if (!testimonials || testimonials.length === 0) return null;

  // Helper function to ensure we have enough reviews to fill a wide screen row
  const fillRow = (items, minLength = 8) => {
    let result = [];
    while (result.length < minLength) {
      result = result.concat(items);
    }
    return result.slice(0, minLength);
  };

  // Generate 3 distinct, long rows to ensure the marquee never runs out of content
  const row1 = fillRow(testimonials, 10);
  const row2 = fillRow([...testimonials].reverse(), 10);
  const row3 = fillRow(testimonials, 10).slice(1).concat(fillRow(testimonials, 10).slice(0, 1)); // Shifted row

  return (
    <section className="relative w-full bg-[#050505] text-white py-24 lg:py-32 overflow-hidden selection:bg-[#E88C15] selection:text-black border-t border-white/5">
      
      {/* --- BACKGROUND TYPOGRAPHY --- */}
      <div className={`absolute top-0 ${isAr ? 'left-4' : 'right-4'} h-full flex items-center pointer-events-none select-none z-0 opacity-[0.02]`}>
        <h2 className="text-[20vw] font-black uppercase leading-none tracking-tighter rotate-90 origin-center whitespace-nowrap">
          {t.bgText}
        </h2>
      </div>

      <div className="max-w-[100rem] mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col mb-16 px-6 lg:px-12 text-start">
          <Animate y={20} opacity={0}>
            <span className="bg-[#E88C15] text-black font-black tracking-[0.3em] uppercase text-[10px] px-3 py-1 mb-6 w-fit block">
              {t.badge}
            </span>
          </Animate>
          <Animate y={20} opacity={0} delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
              {t.title}<span className="text-[#E88C15]">.</span>
            </h2>
          </Animate>
        </div>

        {/* --- MOVING MARQUEE ROWS --- */}
        {/* Force LTR here so the CSS translate animations work mathematically in both English and Arabic */}
        <div className="relative flex flex-col gap-6 overflow-hidden py-4" dir="ltr">
          
          {/* Gradient Edge Masks */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

          {/* ROW 1: Moves Left */}
          {/* FIX: Changed w-[200%] to w-max. This allows flex to naturally size the container! */}
          <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused]">
            {/* FIX: Changed justify-around to gap-6 pr-6. This ensures the loop seam is flawless. */}
            <div className="flex gap-6 pr-6">
              {row1.map((review, i) => <ReviewCard key={`r1a-${i}`} review={review} index={i} />)}
            </div>
            <div className="flex gap-6 pr-6">
              {row1.map((review, i) => <ReviewCard key={`r1b-${i}`} review={review} index={i} />)}
            </div>
          </div>

          {/* ROW 2: Moves Right */}
          {/* Offset starting position using margin */}
          <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused] ml-[-250px]">
            <div className="flex gap-6 pr-6">
              {row2.map((review, i) => <ReviewCard key={`r2a-${i}`} review={review} index={i + 2} />)}
            </div>
            <div className="flex gap-6 pr-6">
              {row2.map((review, i) => <ReviewCard key={`r2b-${i}`} review={review} index={i + 2} />)}
            </div>
          </div>

          {/* ROW 3: Moves Left Fast (Hidden on Mobile) */}
          <div className="flex w-max animate-marquee-left-fast hover:[animation-play-state:paused] ml-[-150px] hidden md:flex">
            <div className="flex gap-6 pr-6">
              {row3.map((review, i) => <ReviewCard key={`r3a-${i}`} review={review} index={i + 4} />)}
            </div>
            <div className="flex gap-6 pr-6">
              {row3.map((review, i) => <ReviewCard key={`r3b-${i}`} review={review} index={i + 4} />)}
            </div>
          </div>

        </div>
      </div>

      {/* Tailwind Custom CSS Animations injected for the marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-left {
          animation: marqueeLeft 45s linear infinite;
        }
        .animate-marquee-left-fast {
          animation: marqueeLeft 35s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 50s linear infinite;
        }
      `}} />
    </section>
  );
}