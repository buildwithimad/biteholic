import { notFound } from "next/navigation";

// Components
import Hero from "@/components/sections/Hero";


// Services
import { getHomeProducts } from "@/services/productServices";
import { getTestimonials } from "@/services/testimonialServices";
import MapSection from "@/components/sections/MapSection";
import ContactSection from "@/components/sections/ContactSection";

const validLocales = ["en", "ar"];

// Optional: Add Revalidation if you want the page to update periodically (e.g., every 60 seconds)
// export const revalidate = 60; 

export default async function Home({ params }) {
  // 1. Await params (Required in Next.js 15+)
  const { lang } = await params;
  
  if (!validLocales.includes(lang)) {
    notFound();
  }

  // 2. Fetch all data in PARALLEL for maximum speed
  const [productsData, testimonials] = await Promise.all([
    getHomeProducts(lang).catch(() => null), // Catch errors so one failure doesn't crash the whole page
    getTestimonials(lang).catch(() => [])
  ]);

  // 3. Safely destructure with fallbacks to prevent crashes if data is missing
  const { 
    featured = [], 
    bestSellers = [], 
    menuPreview = [], 
    specialOffers = [] 
  } = productsData || {};

  return (
    <main className="flex flex-col min-h-screen bg-[#050505]">
      
      <Hero lang={lang} />
      
      <MapSection/>

      <ContactSection lang={lang}/>
      
    </main>
  );
}