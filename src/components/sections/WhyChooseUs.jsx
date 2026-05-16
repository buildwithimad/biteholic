"use client";

import Animate from "@/components/animation/Animate";

const icons = [
  (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
];

const content = {
  en: {
    badge: "The Biteholic Standard",
    title1: "What Makes Us",
    title2: "Superior",
    desc: "We don't just assemble burgers; we engineer perfection. Every detail is optimized for the ultimate gastronomic experience.",
    features: [
      { id: "01", title: "Fresh Ingredients", desc: "Farm-to-table crispness in every single bite, sourced daily." },
      { id: "02", title: "Fast Delivery", desc: "Sizzling hot and ready, delivered using our heat-locked tech." },
      { id: "03", title: "Premium Taste", desc: "Secret gourmet recipes crafted by Michelin-experienced chefs." },
      { id: "04", title: "Hygienic Kitchen", desc: "Medical-grade cleanliness for 100% safety-first preparation." },
    ]
  },
  ar: {
    badge: "معيار بايت هوليك",
    title1: "ما الذي يجعلنا",
    title2: "الأفضل",
    desc: "نحن لا نكتفي بتجميع البرجر؛ بل نهندس الكمال. تم تحسين كل تفصيلة من أجل تجربة تذوق استثنائية.",
    features: [
      { id: "٠١", title: "مكونات طازجة", desc: "طزاجة من المزرعة إلى المائدة في كل لقمة، يتم توريدها يومياً." },
      { id: "٠٢", title: "توصيل سريع", desc: "ساخن وجاهز، يصلك بتقنياتنا للحفاظ على الحرارة." },
      { id: "٠٣", title: "مذاق فاخر", desc: "وصفات سرية فاخرة مُبتكرة من قبل طهاة خبراء." },
      { id: "٠٤", title: "مطبخ صحي", desc: "نظافة بمعايير طبية لضمان سلامة التحضير بنسبة ١٠٠٪." },
    ]
  }
};

export default function TrustSection({ lang = "en" }) {
  const t = content[lang] || content.en;
  const isAr = lang === "ar";

  return (
    <section className="relative w-full  text-white py-24 lg:py-32 overflow-hidden selection:bg-[#E88C15] selection:text-black">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header with improved layout */}
        <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 ${isAr ? 'text-right' : 'text-left'}`}>
          <div className="max-w-2xl">
            <Animate y={20} opacity={0}>
              <span className="text-[#E88C15] font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">
                {t.badge}
              </span>
            </Animate>
            <Animate y={20} opacity={0} delay={0.1}>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.85]">
                {t.title1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{t.title2}</span>
              </h2>
            </Animate>
          </div>
          
          <Animate y={20} opacity={0} delay={0.2} className="max-w-md lg:pb-2">
            <p className="text-gray-500 text-sm sm:text-base font-light leading-relaxed border-l-2 border-[#E88C15]/30 pl-6 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-6">
              {t.desc}
            </p>
          </Animate>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.features.map((feature, index) => (
            <Animate
              key={feature.id}
              y={30}
              opacity={0}
              delay={0.2 + index * 0.1}
            >
              <div className="group relative h-full p-8 bg-[#0D0D0D] border border-white/5 rounded-3xl transition-all duration-500 hover:bg-[#121212] hover:border-[#E88C15]/20 overflow-hidden">
                
                {/* Background Number (Watermark) */}
                <span className="absolute -right-2 -bottom-4 text-8xl font-black text-white/[0.02] group-hover:text-[#E88C15]/[0.05] transition-colors duration-500 italic select-none">
                  {feature.id}
                </span>

                {/* Icon Box */}
                <div className="w-12 h-12 mb-8 flex items-center justify-center bg-white/5 rounded-2xl text-gray-400 group-hover:bg-[#E88C15] group-hover:text-black group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                  {icons[index]}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                    {feature.desc}
                  </p>
                </div>

                {/* Bottom Accent Bar */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E88C15] transition-all duration-700 group-hover:w-full" />
              </div>
            </Animate>
          ))}
        </div>

      </div>
    </section>
  );
}