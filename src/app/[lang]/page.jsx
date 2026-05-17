import { notFound } from "next/navigation";

import FeaturedBurgers from "@/components/sections/FeaturedBurgers";
import Hero from "@/components/sections/Hero";
import BestSeller from "@/components/sections/BestSeller";
import WyChooseUs from "@/components/sections/WhyChooseUs";
import MenuPreview from "@/components/sections/Menu";
import SpecialOfferBanner from "@/components/sections/SpecialOffer"; // Make sure path matches your setup
import HowItWorks from "@/components/sections/HowItWork";
import Testimonials from "@/components/sections/Tertimonials";
import { getHomeProducts } from "@/services/productServices";

const validLocales = ["en", "ar"];

export default async function Home({ params }) {
  const { lang } = await params;
  
  if (!validLocales.includes(lang)) {
    notFound();
  }

  // Fetch the categorized products in a single, efficient query
  const { featured, bestSellers, menuPreview, specialOffers } = await getHomeProducts(lang);

  return (
    <main>
      <Hero lang={lang} />
      <FeaturedBurgers lang={lang} products={featured} />
      <MenuPreview lang={lang} products={menuPreview} />
      <BestSeller lang={lang} products={bestSellers} />
      
      {/* FIX: Change prop name from offerProduct to offerProducts */}
      <SpecialOfferBanner lang={lang} offerProducts={specialOffers} />
      
      <HowItWorks lang={lang} />
      <WyChooseUs lang={lang} />
      <Testimonials lang={lang} />
    </main>
  );
}