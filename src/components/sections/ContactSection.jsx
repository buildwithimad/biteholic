"use client";

import { motion } from "framer-motion";

// Unified Multi-language Content Dictionary
const content = {
  en: {
    contactInfo: {
      title: "Contact Info!",
      cards: [
        {
          id: "location",
          title: "Location",
          desc: "11564, An Nasim Al Gharbi\nRiyadh, Saudi Arabia",
          icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )
        },
        {
          id: "phone",
          title: "Phone Number",
          desc: "+966-9200-16666",
          icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          )
        },
        {
          id: "email",
          title: "Email Address",
          desc: "cs@biteholic.com",
          icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )
        },
        {
          id: "hours",
          title: "Open & Closing",
          desc: "Sat - Fri: 05:00AM\nto 03:30AM",
          icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        }
      ]
    },
    getInTouch: {
      title: "Get In Touch",
      subtitle: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      fields: {
        name: { label: "Your Name", placeholder: "John Doe" },
        email: { label: "Your Email", placeholder: "email@example.com" },
        phone: { label: "Your Number", placeholder: "+966 5x xxx xxxx" },
        company: { label: "Company Name", placeholder: "BiteHolic (Optional)" },
        type: { label: "Contact Type", placeholder: "Select Inquiry Type" },
        message: { label: "Message", placeholder: "Hi, I would like to talk about..." }
      },
      button: "Send Message",
      options: ["General Inquiry", "Feedback", "Careers", "Franchise"]
    }
  },
  ar: {
    contactInfo: {
      title: "معلومات التواصل!",
      cards: [
        {
          id: "location",
          title: "الموقع",
          desc: "11564، النسيم الغربي\nالرياض، المملكة العربية السعودية",
          icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )
        },
        {
          id: "phone",
          title: "رقم الهاتف",
          desc: "+966-9200-16666",
          icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          )
        },
        {
          id: "email",
          title: "البريد الإلكتروني",
          desc: "cs@biteholic.com",
          icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )
        },
        {
          id: "hours",
          title: "أوقات العمل",
          desc: "السبت - الجمعة: 05:00 صباحاً\nإلى 03:30 صباحاً",
          icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        }
      ]
    },
    getInTouch: {
      title: "تواصل معنا",
      subtitle: "يسعدنا الاستماع إليك. أرسل لنا رسالة وسنقوم بالرد في أقرب وقت ممكن.",
      fields: {
        name: { label: "الاسم", placeholder: "الاسم الكريم" },
        email: { label: "البريد الإلكتروني", placeholder: "email@example.com" },
        phone: { label: "رقم الهاتف", placeholder: "+966 5x xxx xxxx" },
        company: { label: "اسم الشركة", placeholder: "بايت هوليك (اختياري)" },
        type: { label: "نوع التواصل", placeholder: "اختر نوع الاستفسار" },
        message: { label: "الرسالة", placeholder: "مرحباً، أود التحدث حول..." }
      },
      button: "إرسال الرسالة",
      options: ["استفسار عام", "ملاحظات", "وظائف", "الامتياز التجاري"]
    }
  }
};

export default function ContactUnified({ lang = "en" }) {
  const t = content[lang] || content.en;
  const isAr = lang === "ar";

  // Reusable Input Wrapper with interactive focus states
  const InputWrapper = ({ label, icon, children }) => (
    <div className="flex flex-col w-full mb-8 group">
      <label className="text-gray-500 text-sm font-medium mb-2 px-1 group-focus-within:text-[#E88D15] transition-colors duration-300">
        {label}
      </label>
      <div className="relative flex items-center border-b border-gray-200 focus-within:border-[#E88D15] transition-all duration-300 pb-3">
        {icon && (
          <div className={`text-gray-400 group-focus-within:text-[#E88D15] transition-colors duration-300 ${isAr ? "ml-3" : "mr-3"}`}>
            {icon}
          </div>
        )}
        <div className="w-full flex-1">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <section 
      dir={isAr ? "rtl" : "ltr"} 
      className="relative w-full pt-20 pb-24 bg-white overflow-hidden font-sans text-[#333333] selection:bg-[#E88D15] selection:text-white"
    >
      {/* --- SEAMLESS BACKGROUND SHAPE --- */}
      {/* This gray block starts behind the contact cards and wraps all the way down around the form */}
      <div className="absolute top-[280px] lg:top-[220px] left-1/2 -translate-x-1/2 w-[96%] max-w-[1400px] h-[calc(100%-200px)] bg-[#fafafa] rounded-t-[40px] z-0 pointer-events-none border border-gray-100/50 shadow-inner" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6">
        
        {/* =========================================
            PART 1: CONTACT INFO CARDS
        ========================================= */}
        
        {/* Contact Info Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#222222] tracking-wide" style={{ fontFamily: 'cursive, serif' }}>
            {t.contactInfo.title}
          </h2>
        </motion.div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {t.contactInfo.cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pt-12 group cursor-pointer"
            >
              {/* Floating Icon Circle */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.06)] z-20">
                <div className="text-[#E88D15] group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
              </div>

              {/* Card Body */}
              <div className="relative w-full h-full bg-white rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.06)] overflow-hidden border border-gray-50">
                {/* Hover Animation Layer: Orange circle expanding from bottom-right */}
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#E88D15] rounded-full transform scale-0 group-hover:scale-[30] transition-transform duration-700 ease-in-out origin-center z-0" />

                {/* Card Content */}
                <div className="relative z-10 pt-14 md:pt-16 pb-10 px-6 flex flex-col items-center text-center">
                  <h3 className="text-lg font-bold text-[#111111] group-hover:text-white transition-colors duration-500 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-[#E88D15] text-sm md:text-base font-medium whitespace-pre-line group-hover:text-white transition-colors duration-500">
                    {card.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


        {/* =========================================
            PART 2: GET IN TOUCH FORM
        ========================================= */}
        
        <div className="mt-32 max-w-[1000px] mx-auto">
          
          {/* Form Heading Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center items-center mb-12 text-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#222222] tracking-wide" style={{ fontFamily: 'cursive, serif' }}>
                {t.getInTouch.title}
              </h2>
              {/* Target Icon */}
              <div className="w-6 h-6 rounded-full border-2 border-[#E88D15] flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E88D15] opacity-50" />
              </div>
            </div>
            <p className="text-gray-500 max-w-[500px] text-sm md:text-base leading-relaxed">
              {t.getInTouch.subtitle}
            </p>
          </motion.div>

          {/* Form Card Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-[2rem] shadow-[0_15px_60px_rgba(0,0,0,0.04)] p-8 md:p-12 border border-gray-100"
          >
            <form className="w-full flex flex-col" onSubmit={(e) => e.preventDefault()}>
              
              {/* Top 4 Fields - 2 Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16">
                
                {/* Name */}
                <InputWrapper 
                  label={t.getInTouch.fields.name.label}
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                >
                  <input 
                    type="text" 
                    placeholder={t.getInTouch.fields.name.placeholder}
                    className="w-full bg-transparent outline-none text-base text-gray-800 placeholder-gray-300"
                  />
                </InputWrapper>

                {/* Email */}
                <InputWrapper 
                  label={t.getInTouch.fields.email.label}
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  <input 
                    type="email" 
                    placeholder={t.getInTouch.fields.email.placeholder}
                    className="w-full bg-transparent outline-none text-base text-gray-800 placeholder-gray-300"
                    dir="ltr"
                  />
                </InputWrapper>

                {/* Phone Number */}
                <InputWrapper 
                  label={t.getInTouch.fields.phone.label}
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                >
                  <input 
                    type="tel" 
                    placeholder={t.getInTouch.fields.phone.placeholder}
                    className="w-full bg-transparent outline-none text-base text-gray-800 placeholder-gray-300"
                    dir="ltr"
                  />
                </InputWrapper>

                {/* Company Name */}
                <InputWrapper 
                  label={t.getInTouch.fields.company.label}
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  }
                >
                  <input 
                    type="text" 
                    placeholder={t.getInTouch.fields.company.placeholder}
                    className="w-full bg-transparent outline-none text-base text-gray-800 placeholder-gray-300"
                  />
                </InputWrapper>
              </div>

              {/* Contact Type - Full Width Dropdown */}
              <div className="relative">
                <InputWrapper 
                  label={t.getInTouch.fields.type.label}
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  }
                >
                  <select className="w-full bg-transparent outline-none text-base text-gray-800 appearance-none cursor-pointer" defaultValue="">
                    <option value="" disabled className="text-gray-400">{t.getInTouch.fields.type.placeholder}</option>
                    {t.getInTouch.options.map((opt, i) => (
                      <option key={i} value={opt} className="text-gray-800">{opt}</option>
                    ))}
                  </select>
                </InputWrapper>
                
                {/* Custom Animated Arrow for Select */}
                <div className={`absolute top-[42px] ${isAr ? "left-2" : "right-2"} pointer-events-none text-gray-400 group-focus-within:text-[#E88D15] transition-colors duration-300`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Message - Full Width Textarea */}
              <div className="flex flex-col w-full mb-10 group">
                <label className="text-gray-500 text-sm font-medium mb-3 px-1 group-focus-within:text-[#E88D15] transition-colors duration-300">
                  {t.getInTouch.fields.message.label}
                </label>
                <textarea 
                  rows={4}
                  placeholder={t.getInTouch.fields.message.placeholder}
                  className="w-full bg-transparent outline-none text-base text-gray-800 placeholder-gray-300 border-b border-gray-200 focus:border-[#E88D15] transition-colors duration-300 resize-none pb-3"
                />
              </div>

              {/* Submit Button */}
              <div className="w-full flex justify-center mt-2">
                <motion.button 
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full md:w-auto bg-[#E88D15] hover:bg-[#d67e0f] text-white font-semibold text-base py-4 px-14 rounded-full shadow-[0_8px_20px_rgba(232,141,21,0.25)] transition-colors duration-300"
                >
                  {t.getInTouch.button}
                </motion.button>
              </div>

            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
}