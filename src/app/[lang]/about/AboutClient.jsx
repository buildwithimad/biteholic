"use client";

import Image from "next/image";
import Animate from "@/components/animation/Animate";

const uiText = {
  en: {
    badge: "Our Roots",
    title: "The Story of Biteholic",
    subtitle: "We didn't just want to make another burger. We wanted to engineer the perfect bite.",
    storyTitle: "Humble Beginnings",
    storyText1: "It started with a simple obsession: finding the ultimate balance of flavor, texture, and quality. We spent months sourcing the finest Wagyu beef, baking our own artisanal buns, and crafting signature sauces from scratch.",
    storyText2: "Today, Biteholic isn't just a restaurant. It's a culinary movement dedicated to the art of the gourmet burger. No shortcuts. No compromises. Just pure, unadulterated quality.",
    stats: [
      { number: "100%", label: "Fresh Ingredients" },
      { number: "0", label: "Artificial Additives" },
      { number: "50k+", label: "Burgers Served" }
    ],
    valuesTitle: "Our Core Pillars",
    values: [
      {
        title: "Obsessive Quality",
        desc: "We source only premium, certified Wagyu and local fresh produce. Every ingredient is inspected daily to ensure perfection."
      },
      {
        title: "Craftsmanship",
        desc: "From hand-pressing our patties to toasting our buns to the exact second, every step is executed with precision."
      },
      {
        title: "Community",
        desc: "Food is about bringing people together. We built our spaces to foster connection, conversation, and great vibes."
      }
    ]
  },
  ar: {
    badge: "جذورنا",
    title: "قصة بايت هوليك",
    subtitle: "لم نكن نريد مجرد صنع برجر آخر. أردنا هندسة اللقمة المثالية.",
    storyTitle: "بدايات متواضعة",
    storyText1: "بدأ الأمر بشغف بسيط: العثور على التوازن المطلق بين النكهة والقوام والجودة. قضينا أشهراً في البحث عن أجود أنواع لحوم الواغيو، وخبز خبزنا الحرفي، وابتكار صلصاتنا الخاصة من الصفر.",
    storyText2: "اليوم، بايت هوليك ليس مجرد مطعم. إنها حركة طهي مكرسة لفن البرجر الفاخر. لا طرق مختصرة. لا تنازلات. فقط جودة نقية.",
    stats: [
      { number: "١٠٠%", label: "مكونات طازجة" },
      { number: "٠", label: "إضافات صناعية" },
      { number: "+٥٠ ألف", label: "برجر تم تقديمه" }
    ],
    valuesTitle: "ركائزنا الأساسية",
    values: [
      {
        title: "جودة استثنائية",
        desc: "نحن نستورد فقط الواغيو المعتمد والمنتجات الطازجة المحلية. يتم فحص كل مكون يومياً لضمان الجودة."
      },
      {
        title: "حرفية وإتقان",
        desc: "من تحضير شرائح اللحم يدوياً إلى تحميص الخبز بالثانية الدقيقة، يتم تنفيذ كل خطوة بدقة متناهية."
      },
      {
        title: "المجتمع",
        desc: "الطعام يجمع الناس. لقد بنينا مساحاتنا لتعزيز التواصل والمحادثات والأجواء الرائعة."
      }
    ]
  }
};

export default function AboutClient({ lang = "en" }) {
  const ui = uiText[lang] || uiText.en;
  const isAr = lang === "ar";

  return (
    <section className="w-full bg-[#050505] text-white pt-32 pb-24 lg:pt-40 lg:pb-32 selection:bg-[#E88C15] selection:text-black overflow-hidden">
      
      {/* --- HERO HEADER --- */}
      <div className="max-w-[90rem] mx-auto px-6 relative z-10 text-start mb-16 lg:mb-24">
        <Animate y={20} opacity={0}>
          <span className="bg-[#E88C15] text-black font-black tracking-[0.3em] uppercase text-[10px] px-3 py-1 mb-6 inline-block rounded-none">
            {ui.badge}
          </span>
        </Animate>
        <Animate y={20} opacity={0} delay={0.1}>
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-6">
            {ui.title.split(" ").map((word, i) => (
              <span key={i} className={i === ui.title.split(" ").length - 1 ? "text-[#E88C15]" : "text-white"}>
                {word}{" "}
              </span>
            ))}
          </h1>
        </Animate>
        <Animate y={20} opacity={0} delay={0.2}>
          <p className="text-gray-400 text-lg lg:text-2xl font-light max-w-2xl leading-relaxed">
            {ui.subtitle}
          </p>
        </Animate>
      </div>

      {/* --- STORY & IMAGE SPLIT --- */}
      <div className="max-w-[90rem] mx-auto px-6 mb-24 lg:mb-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
          
          {/* Left: Large Sharp Image */}
          <div className="w-full lg:w-1/2 h-[400px] lg:h-auto min-h-[500px] relative order-2 lg:order-none">
            <Animate y={30} opacity={0} delay={0.3} className="w-full h-full relative">
              {/* Note: Provide an actual image path from your public folder */}
              <Image 
                src="/hero.png" 
                alt="Biteholic Kitchen" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-none border border-white/5"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Decorative Corner Accent */}
              <div className={`absolute top-0 ${isAr ? 'right-0 border-l-2' : 'left-0 border-r-2'} w-16 h-16 border-b-2 border-[#E88C15]`} />
            </Animate>
          </div>

          {/* Right: Story Text & Stats */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center order-1 lg:order-none text-start">
            <Animate y={20} opacity={0} delay={0.4}>
              <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tight mb-8">
                {ui.storyTitle}
              </h3>
              <div className="space-y-6 text-gray-400 font-light leading-relaxed mb-12">
                <p>{ui.storyText1}</p>
                <p>{ui.storyText2}</p>
              </div>
            </Animate>

            {/* Stats Grid */}
            <Animate y={20} opacity={0} delay={0.5}>
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10">
                {ui.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col text-start">
                    <span className="text-3xl md:text-5xl font-black text-[#E88C15] mb-2">{stat.number}</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{stat.label}</span>
                  </div>
                ))}
              </div>
            </Animate>
          </div>
          
        </div>
      </div>

      {/* --- VALUES GRID --- */}
      <div className="max-w-[90rem] mx-auto px-6">
        <Animate y={20} opacity={0} delay={0.2}>
          <h3 className="text-xs font-black text-[#E88C15] uppercase tracking-[0.4em] mb-12 flex items-center gap-4 text-start">
            <span className="w-12 h-[2px] bg-[#E88C15]" /> {ui.valuesTitle}
          </h3>
        </Animate>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {ui.values.map((value, i) => (
            <Animate key={i} y={30} opacity={0} delay={0.3 + i * 0.1}>
              <div className="flex flex-col p-8 lg:p-12 bg-[#111] border border-white/5 rounded-none hover:bg-[#1a1a1a] hover:border-white/10 transition-colors duration-300 h-full text-start group">
                <span className="text-5xl font-black text-white/5 group-hover:text-[#E88C15]/20 transition-colors mb-6 font-serif">
                  0{i + 1}
                </span>
                <h4 className="text-xl lg:text-2xl font-black uppercase tracking-tight text-white mb-4">
                  {value.title}
                </h4>
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  {value.desc}
                </p>
              </div>
            </Animate>
          ))}
        </div>
      </div>

    </section>
  );
}