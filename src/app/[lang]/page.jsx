import { notFound } from "next/navigation";

// Components
import Hero from "@/components/sections/Hero";
import HomeMenuSection from "@/components/sections/MenuSection"; // <-- Import it here
import MapSection from "@/components/sections/MapSection";
import ContactSection from "@/components/sections/ContactSection";

// Services
import { getProducts } from "@/services/productServices";

const validLocales = ["en", "ar"];

export default async function Home({ params }) {
  const { lang } = await params;
  
  if (!validLocales.includes(lang)) {
    notFound();
  }

  // Fetch products and PASS the lang so your mapper translates it!
  const products = await getProducts(lang);

  return (
    <main className="flex flex-col min-h-screen bg-[#050505]">
      
      <Hero lang={lang} />
      
      <MapSection/>

        {/* Plug in the new section right below the Hero */}
      <HomeMenuSection products={products} lang={lang} />

      <ContactSection lang={lang}/>
      
    </main>
  );
}