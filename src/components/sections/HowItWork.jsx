"use client";

import Animate from "@/components/animation/Animate";

const icons = [
  (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M4 4h5M4 9h2m-2 5h2m-2 5h5" />
    </svg>
  ),
  (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )
];

const content = {
  en: {
    badge: "Direct Ordering",
    title: "Skip the Checkout",
    steps: [
      { id: "01", title: "Select Item", desc: "Click 'Order Now' on your favorite burger." },
      { id: "02", title: "WhatsApp Chat", desc: "A pre-filled message with details opens instantly." },
      { id: "03", title: "Get Your Food", desc: "Confirm your location in chat and wait for the sizzle." },
    ]
  },
  ar: {
    badge: "طلب مباشر",
    title: "بدون دفع إلكتروني",
    steps: [
      { id: "٠١", title: "اختر طلبك", desc: "اضغط على 'اطلب الآن' تحت وجبتك المفضلة." },
      { id: "٠٢", title: "محادثة واتساب", desc: "ستفتح محادثة برسالة مجهزة بكل تفاصيل طلبك." },
      { id: "٠٣", title: "استلم وجبتك", desc: "أكد موقعك في المحادثة واستعد للاستمتاع بالطعم." },
    ]
  }
};

export default function HowItWorks({ lang = "en" }) {
  const t = content[lang] || content.en;
  const isAr = lang === "ar";

  return (
    <section className="relative w-full bg-[#050505] text-white py-24 lg:py-32 overflow-hidden selection:bg-[#E88C15] selection:text-black">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-[#E88C15]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header: Focus on "No Checkout" */}
        <div className="flex flex-col items-center text-center mb-24 lg:mb-32">
          <Animate y={20} opacity={0}>
            <span className="text-[#E88C15] font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">
              {t.badge}
            </span>
          </Animate>
          <Animate y={20} opacity={0} delay={0.1}>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
              {t.title}<span className="text-[#E88C15]">.</span>
            </h2>
          </Animate>
        </div>

        {/* Steps: Visual Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 start-[15%] end-[15%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {t.steps.map((step, index) => (
            <Animate
              key={step.id}
              y={40}
              opacity={0}
              delay={0.2 + index * 0.15}
              className="flex flex-col items-center text-center group"
            >
              {/* Step Circle with Interaction */}
              <div className="relative mb-10">
                {/* Pulse Effect */}
                <div className="absolute inset-0 bg-[#E88C15]/20 rounded-full scale-125 animate-pulse group-hover:bg-[#E88C15]/40" />
                
                {/* Main Icon Circle */}
                <div className="relative w-24 h-24 bg-[#111] border-2 border-white/10 rounded-full flex items-center justify-center text-white group-hover:border-[#E88C15] group-hover:scale-110 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                  {icons[index]}
                  
                  {/* Step ID Label */}
                  <div className="absolute -bottom-2 bg-[#E88C15] text-black font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                    {step.id}
                  </div>
                </div>
              </div>

              {/* Text: Explaining the WhatsApp Path */}
              <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#E88C15] transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed max-w-[260px] mx-auto">
                  {step.desc}
                </p>
              </div>

              {/* Mobile Arrow */}
              {index < t.steps.length - 1 && (
                <div className="md:hidden mt-12 opacity-20">
                  <svg className="w-8 h-8 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              )}
            </Animate>
          ))}
        </div>

        {/* Bottom Micro-Copy */}
        <Animate y={20} opacity={0} delay={0.6} className="mt-24 text-center">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em]">
                Fast • Secure • No Registration
            </p>
        </Animate>

      </div>
    </section>
  );
}