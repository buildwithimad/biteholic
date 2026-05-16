"use client";

import Animate from "@/components/animation/Animate";

// Inline Multi-language Content Dictionary
const content = {
  en: {
    brand1: "Bite",
    brand2: "holic",
    desc: "Redefining the gourmet burger experience with premium ingredients, masterful recipes, and an unapologetic dedication to flavor.",
    newsletterTitle: "Join The Secret Club",
    placeholder: "EMAIL ADDRESS",
    joinBtn: "Join",
    navTitle: "Navigation",
    navLinks: ['Menu', 'Locations', 'Our Story', 'Careers', 'Contact'],
    connectTitle: "Connect",
    location: "Riyadh, Saudi Arabia",
    email: "HELLO@BITEHOLIC.COM",
    phone: "+966 50 123 4567",
    copyright: "Biteholic. All Rights Reserved.",
    privacy: "Privacy",
    terms: "Terms",
    bgText: "Biteholic"
  },
  ar: {
    brand1: "بايت",
    brand2: "هوليك",
    desc: "نعيد تعريف تجربة البرجر الفاخر بمكونات ممتازة، ووصفات متقنة، وشغف لا مثيل له بالنكهة.",
    newsletterTitle: "انضم إلى النادي السري",
    placeholder: "البريد الإلكتروني",
    joinBtn: "انضم",
    navTitle: "روابط سريعة",
    navLinks: ['القائمة', 'الفروع', 'قصتنا', 'الوظائف', 'اتصل بنا'],
    connectTitle: "تواصل معنا",
    location: "الرياض، المملكة العربية السعودية",
    email: "HELLO@BITEHOLIC.COM",
    phone: "+966 50 123 4567",
    copyright: "بايت هوليك. جميع الحقوق محفوظة.",
    privacy: "الخصوصية",
    terms: "الشروط",
    bgText: "بايت هوليك"
  }
};

export default function Footer({ lang = "en" }) {
  const t = content[lang] || content.en;

  // Social media names (kept standard as they are global brand names)
  const socials = ['Instagram', 'Twitter', 'TikTok'];

  return (
    <footer className="relative w-full bg-[#050505] text-white pt-20 lg:pt-32 overflow-hidden font-sans border-t border-white/10 selection:bg-white selection:text-[#E88C15]">
      
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* --- MAIN FOOTER GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20 lg:mb-32">
          
          {/* Column 1: Brand & Newsletter (Takes up more space) */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Animate y={20} opacity={0}>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tighter mb-6 cursor-pointer">
                {t.brand1}<span className="text-[#E88C15]">{t.brand2}</span><span className="text-white">.</span>
              </div>
            </Animate>
            
            <Animate y={20} opacity={0} delay={0.1}>
              <p className="text-gray-400 text-sm sm:text-base font-light max-w-sm leading-relaxed mb-8">
                {t.desc}
              </p>
            </Animate>

            {/* Newsletter Input (Sharp, flat design) */}
            <Animate y={20} opacity={0} delay={0.2} className="w-full max-w-md">
              <span className="text-[10px] font-bold tracking-widest uppercase text-white mb-2 block">
                {t.newsletterTitle}
              </span>
              <div className="flex w-full">
                {/* Changed border-r-0 to border-e-0 so the attached edge flips in Arabic RTL */}
                <input 
                  type="email" 
                  placeholder={t.placeholder}
                  className="w-full bg-[#0a0a0a] border border-white/10 border-e-0 px-4 py-3 sm:py-4 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E88C15] transition-colors placeholder:text-gray-600"
                />
                <button className="px-6 py-3 sm:py-4 bg-white text-[#050505] font-black uppercase tracking-widest text-xs sm:text-sm hover:bg-[#E88C15] hover:text-white transition-colors duration-300">
                  {t.joinBtn}
                </button>
              </div>
            </Animate>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <Animate y={20} opacity={0} delay={0.3}>
              <h4 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-6 sm:mb-8">
                {t.navTitle}
              </h4>
            </Animate>
            <ul className="flex flex-col gap-4">
              {t.navLinks.map((link, i) => (
                <Animate key={i} y={20} opacity={0} delay={0.4 + i * 0.05}>
                  <li>
                    <a href="#" className="text-sm sm:text-base font-bold uppercase tracking-tight text-white hover:text-[#E88C15] transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                </Animate>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Socials */}
          <div className="flex flex-col">
            <Animate y={20} opacity={0} delay={0.5}>
              <h4 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-6 sm:mb-8">
                {t.connectTitle}
              </h4>
            </Animate>
            
            <Animate y={20} opacity={0} delay={0.6}>
              <div className="flex flex-col gap-2 mb-8">
                <span className="text-sm font-light text-gray-400">{t.location}</span>
                <span className="text-sm font-bold text-white hover:text-[#E88C15] transition-colors cursor-pointer" dir="ltr">
                  {t.email}
                </span>
                <span className="text-sm font-bold text-white hover:text-[#E88C15] transition-colors cursor-pointer" dir="ltr">
                  {t.phone}
                </span>
              </div>
            </Animate>

            {/* Social Icons (Sharp squares) */}
            <Animate y={20} opacity={0} delay={0.7}>
              <div className="flex gap-3">
                {socials.map((social, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-white hover:bg-[#E88C15] hover:text-[#050505] hover:border-[#E88C15] transition-all duration-300">
                    <span className="text-[10px] font-black tracking-widest uppercase">
                      {social.substring(0, 2)}
                    </span>
                  </a>
                ))}
              </div>
            </Animate>
          </div>

        </div>

        {/* --- COPYRIGHT BAR --- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-white/10 relative z-20">
          <Animate y={10} opacity={0} delay={0.8}>
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-gray-500 uppercase">
              © {new Date().getFullYear()} {t.copyright}
            </span>
          </Animate>
          <Animate y={10} opacity={0} delay={0.9}>
            <div className="flex gap-6">
              <a href="#" className="text-[10px] sm:text-xs font-bold tracking-widest text-gray-500 uppercase hover:text-white transition-colors">
                {t.privacy}
              </a>
              <a href="#" className="text-[10px] sm:text-xs font-bold tracking-widest text-gray-500 uppercase hover:text-white transition-colors">
                {t.terms}
              </a>
            </div>
          </Animate>
        </div>

      </div>

      {/* --- MASSIVE BACKGROUND ANCHOR TEXT --- */}
      {/* Changed left-0 to start-0 for dynamic alignment */}
      <div className="absolute bottom-[-5%] start-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0">
        <h1 className="text-[25vw] font-black leading-[0.75] tracking-tighter text-[#0a0a0a] uppercase">
          {t.bgText}
        </h1>
      </div>

    </footer>
  );
}