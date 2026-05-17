"use client";

import { useState } from "react";
import Animate from "@/components/animation/Animate";

const uiText = {
  en: {
    badge: "Get in Touch",
    title: "Contact Us",
    subtitle: "Have a question, feedback, or a special request? We're here to help you experience the perfect bite.",
    
    // Info Section
    infoTitle: "Direct Lines",
    addressLabel: "Location",
    address: "123 Gourmet Ave, Riyadh, KSA",
    phoneLabel: "Phone",
    phone: "+966 50 123 4567",
    emailLabel: "Email",
    email: "hello@biteholic.com",
    hoursLabel: "Working Hours",
    hours: "Daily: 12:00 PM - 2:00 AM",
    
    // Form Section
    formTitle: "Send a Message",
    namePlace: "Your Name",
    emailPlace: "Your Email",
    subjectPlace: "Subject",
    msgPlace: "Your Message...",
    btn: "Send Message"
  },
  ar: {
    badge: "تواصل معنا",
    title: "اتصل بنا",
    subtitle: "لديك سؤال، ملاحظة، أو طلب خاص؟ نحن هنا لمساعدتك في تجربة اللقمة المثالية.",
    
    // Info Section
    infoTitle: "خطوط مباشرة",
    addressLabel: "الموقع",
    address: "١٢٣ شارع الذواقة، الرياض، السعودية",
    phoneLabel: "الهاتف",
    phone: "+966 50 123 4567",
    emailLabel: "البريد الإلكتروني",
    email: "hello@biteholic.com",
    hoursLabel: "ساعات العمل",
    hours: "يومياً: ١٢:٠٠ م - ٢:٠٠ ص",
    
    // Form Section
    formTitle: "أرسل رسالة",
    namePlace: "الاسم",
    emailPlace: "البريد الإلكتروني",
    subjectPlace: "الموضوع",
    msgPlace: "رسالتك...",
    btn: "إرسال الرسالة"
  }
};

export default function ContactClient({ lang = "en" }) {
  const ui = uiText[lang] || uiText.en;
  
  // Basic form state (UI only for now)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert(lang === "ar" ? "تم إرسال رسالتك بنجاح!" : "Message sent successfully!");
    }, 1500);
  };

  return (
    <section className="w-full bg-[#050505] text-white pt-32 pb-24 lg:pt-40 lg:pb-32 selection:bg-[#E88C15] selection:text-black overflow-hidden">
      
      {/* --- HEADER --- */}
      <div className="max-w-[90rem] mx-auto px-6 relative z-10 text-start mb-16 lg:mb-24">
        <Animate y={20} opacity={0}>
          <span className="bg-[#E88C15] text-black font-black tracking-[0.3em] uppercase text-[10px] px-3 py-1 mb-6 inline-block rounded-none">
            {ui.badge}
          </span>
        </Animate>
        <Animate y={20} opacity={0} delay={0.1}>
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-6">
            {ui.title}<span className="text-[#E88C15]">.</span>
          </h1>
        </Animate>
        <Animate y={20} opacity={0} delay={0.2}>
          <p className="text-gray-400 text-lg lg:text-2xl font-light max-w-2xl leading-relaxed">
            {ui.subtitle}
          </p>
        </Animate>
      </div>

      <div className="max-w-[90rem] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* --- LEFT: CONTACT INFO --- */}
          <div className="lg:col-span-5 flex flex-col">
            <Animate y={20} opacity={0} delay={0.3}>
              <h3 className="text-xs font-black text-[#E88C15] uppercase tracking-[0.4em] mb-12 flex items-center gap-4 text-start">
                <span className="w-12 h-[2px] bg-[#E88C15]" /> {ui.infoTitle}
              </h3>
            </Animate>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              
              {/* Info Block 1: Location */}
              <Animate y={20} opacity={0} delay={0.4}>
                <div className="flex flex-col p-8 bg-[#111] border border-white/5 rounded-none text-start h-full hover:border-[#E88C15]/50 transition-colors duration-300">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                    {ui.addressLabel}
                  </span>
                  <span className="text-lg md:text-xl font-medium text-white leading-relaxed">
                    {ui.address}
                  </span>
                </div>
              </Animate>

              {/* Info Block 2: Phone */}
              <Animate y={20} opacity={0} delay={0.5}>
                <div className="flex flex-col p-8 bg-[#111] border border-white/5 rounded-none text-start h-full hover:border-[#E88C15]/50 transition-colors duration-300">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                    {ui.phoneLabel}
                  </span>
                  <a href={`tel:${ui.phone.replace(/\s+/g, '')}`} className="text-lg md:text-xl font-medium text-white hover:text-[#E88C15] transition-colors" dir="ltr">
                    {ui.phone}
                  </a>
                </div>
              </Animate>

              {/* Info Block 3: Email */}
              <Animate y={20} opacity={0} delay={0.6}>
                <div className="flex flex-col p-8 bg-[#111] border border-white/5 rounded-none text-start h-full hover:border-[#E88C15]/50 transition-colors duration-300">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                    {ui.emailLabel}
                  </span>
                  <a href={`mailto:${ui.email}`} className="text-lg md:text-xl font-medium text-white hover:text-[#E88C15] transition-colors">
                    {ui.email}
                  </a>
                </div>
              </Animate>

              {/* Info Block 4: Hours */}
              <Animate y={20} opacity={0} delay={0.7}>
                <div className="flex flex-col p-8 bg-[#111] border border-white/5 rounded-none text-start h-full hover:border-[#E88C15]/50 transition-colors duration-300">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                    {ui.hoursLabel}
                  </span>
                  <span className="text-lg md:text-xl font-medium text-white">
                    {ui.hours}
                  </span>
                </div>
              </Animate>

            </div>
          </div>

          {/* --- RIGHT: CONTACT FORM --- */}
          <div className="lg:col-span-7 flex flex-col">
            <Animate y={20} opacity={0} delay={0.4} className="h-full">
              <div className="p-8 lg:p-12 bg-[#111] border border-white/5 rounded-none h-full flex flex-col">
                <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-white mb-8 text-start">
                  {ui.formTitle}
                </h3>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 text-start">
                  
                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <input 
                      type="text" 
                      required
                      placeholder={ui.namePlace}
                      className="w-full bg-[#0a0a0a] border border-white/5 px-6 py-5 text-sm text-white focus:outline-none focus:border-[#E88C15] transition-colors rounded-none placeholder:text-gray-600"
                    />
                  </div>

                  {/* Email & Subject Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <input 
                        type="email" 
                        required
                        placeholder={ui.emailPlace}
                        className="w-full bg-[#0a0a0a] border border-white/5 px-6 py-5 text-sm text-white focus:outline-none focus:border-[#E88C15] transition-colors rounded-none placeholder:text-gray-600"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <input 
                        type="text" 
                        required
                        placeholder={ui.subjectPlace}
                        className="w-full bg-[#0a0a0a] border border-white/5 px-6 py-5 text-sm text-white focus:outline-none focus:border-[#E88C15] transition-colors rounded-none placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="flex flex-col gap-2 flex-1">
                    <textarea 
                      required
                      placeholder={ui.msgPlace}
                      rows={6}
                      className="w-full h-full min-h-[200px] bg-[#0a0a0a] border border-white/5 px-6 py-5 text-sm text-white focus:outline-none focus:border-[#E88C15] transition-colors rounded-none placeholder:text-gray-600 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto self-start mt-4 px-10 py-5 bg-[#E88C15] text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors duration-300 rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "..." : ui.btn}
                  </button>

                </form>
              </div>
            </Animate>
          </div>

        </div>
      </div>
    </section>
  );
}