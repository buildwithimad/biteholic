"use client";

import Animate from "@/components/animation/Animate";

const content = {
  en: {
    bgText: "Vibe",
    badge: "The Verdict",
    title: "Real Talk from Real Fans",
    reviews: [
      { id: 1, name: "Ahmed A.", handle: "@ahmed_eats", rating: 5, text: "The Monarch Wagyu is an absolute masterpiece. The truffle sauce is out of this world. Best burger I've had in the city, hands down.", initials: "AA" },
      { id: 2, name: "Sarah M.", handle: "@sarah_foodie", rating: 5, text: "Delivery was incredibly fast, and the burger arrived sizzling hot. You can instantly taste the premium quality of the ingredients.", initials: "SM" },
      { id: 3, name: "Khalid R.", handle: "@khalid_reviews", rating: 5, text: "Finally, a real gourmet burger place without the gimmicks. Just pure, unadulterated quality and a perfectly toasted bun.", initials: "KR" },
    ]
  },
  ar: {
    bgText: "ثقة",
    badge: "رأي الخبراء",
    title: "قالوا عن بايت هوليك",
    reviews: [
      { id: 1, name: "أحمد أ.", handle: "@ahmed_eats", rating: 5, text: "برجر ذا مونارك واغيو تحفة فنية بكل المقاييس. صلصة الكمأة خيالية. أفضل برجر تذوقته في المدينة بلا منازع.", initials: "أ.أ" },
      { id: 2, name: "سارة م.", handle: "@sarah_foodie", rating: 5, text: "التوصيل كان سريعاً جداً، ووصل البرجر ساخناً. يمكنك تذوق الجودة العالية للمكونات فوراً في أول لقمة.", initials: "س.م" },
      { id: 3, name: "خالد ر.", handle: "@khalid_reviews", rating: 5, text: "أخيراً، مطعم برجر فاخر حقيقي بدون مبالغات. مجرد جودة نقية ومكونات ممتازة وخبز محمص بشكل مثالي.", initials: "خ.ر" },
    ]
  }
};

export default function Testimonials({ lang = "en" }) {
  const t = content[lang] || content.en;
  const isAr = lang === "ar";

  return (
    <section className="relative w-full bg-[#050505] text-white py-24 lg:py-40 overflow-hidden selection:bg-[#E88C15] selection:text-black border-t border-white/5">
      
      {/* --- BACKGROUND TYPOGRAPHY (Vertical Watermark) --- */}
      <div className={`absolute top-0 ${isAr ? 'left-4' : 'right-4'} h-full flex items-center pointer-events-none select-none z-0 opacity-[0.03]`}>
        <h2 className="text-[20vw] font-black uppercase leading-none tracking-tighter rotate-90 origin-center whitespace-nowrap">
          {t.bgText}
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div className={`flex flex-col mb-20 ${isAr ? 'items-end text-right' : 'items-start text-left'}`}>
          <Animate y={20} opacity={0}>
            <span className="bg-[#E88C15] text-black font-black tracking-[0.3em] uppercase text-[10px] px-3 py-1 mb-6 block">
              {t.badge}
            </span>
          </Animate>
          <Animate y={20} opacity={0} delay={0.1}>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              {t.title}<span className="text-[#E88C15]">.</span>
            </h2>
          </Animate>
        </div>

        {/* --- REVIEWS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {t.reviews.map((review, index) => (
            <Animate
              key={review.id}
              y={40}
              opacity={0}
              delay={0.2 + index * 0.15}
            >
              <div className="group relative h-full flex flex-col p-8 lg:p-10 bg-[#0A0A0A] border border-white/10 hover:border-[#E88C15]/50 transition-all duration-500 rounded-tr-[3rem] rounded-bl-[3rem] hover:rounded-none">
                
                {/* Huge Quote Icon Decoration */}
                <span className={`absolute top-6 ${isAr ? 'left-8' : 'right-8'} text-6xl font-serif text-white/5 group-hover:text-[#E88C15]/20 transition-colors`}>
                  “
                </span>

                {/* Stars */}
                <div className={`flex items-center gap-1 mb-8 ${isAr ? 'justify-end' : 'justify-start'}`}>
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#E88C15] drop-shadow-[0_0_8px_rgba(232,140,21,0.5)]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Review Text */}
                <blockquote className={`text-base sm:text-lg text-gray-400 font-light leading-relaxed flex-1 mb-12 italic ${isAr ? 'text-right' : 'text-left'}`}>
                  "{review.text}"
                </blockquote>

                {/* Profile Section */}
                <div className={`flex items-center gap-5 pt-8 border-t border-white/5 ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-[#E88C15] to-orange-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-[2px]" />
                    <div className="relative w-14 h-14 bg-[#151515] text-white flex items-center justify-center font-black text-xl rounded-lg border border-white/10">
                      {review.initials}
                    </div>
                  </div>
                  
                  <div className={`flex flex-col ${isAr ? 'items-end' : 'items-start'}`}>
                    <span className="text-sm font-bold uppercase tracking-widest text-white group-hover:text-[#E88C15] transition-colors">
                      {review.name}
                    </span>
                    <span className="text-[10px] text-gray-600 font-bold tracking-widest uppercase mt-1" dir="ltr">
                      {review.handle}
                    </span>
                  </div>
                </div>
                
              </div>
            </Animate>
          ))}
        </div>

        {/* Trust Signals / Footer */}
        <Animate y={20} opacity={0} delay={0.6} className="mt-24 flex flex-wrap justify-center items-center gap-10 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
           <div className="flex items-center gap-2">
             <span className="text-3xl font-black italic">Google</span>
             <span className="text-xs font-bold uppercase tracking-widest">4.9/5 Rating</span>
           </div>
           <div className="w-1 h-1 bg-white/20 rounded-full" />
           <div className="flex items-center gap-2">
             <span className="text-3xl font-black italic">TripAdvisor</span>
             <span className="text-xs font-bold uppercase tracking-widest">Excellent</span>
           </div>
        </Animate>

      </div>
    </section>
  );
}