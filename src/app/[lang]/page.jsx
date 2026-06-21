import { notFound } from "next/navigation";

// Components
import Hero from "@/components/sections/Hero";
import HomeMenuSection from "@/components/sections/MenuSection";
import MapSection from "@/components/sections/MapSection";
import ContactSection from "@/components/sections/ContactSection";

// Services
import { getProducts } from "@/services/productServices";

const validLocales = ["en", "ar"];

/* ==========================================
   SEO
========================================== */

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const seo = {
    en: {
      title:
        "BiteHolic | Premium Burgers, Broast, Dynamite Shrimp & Fast Food in Riyadh",
      description:
        "Experience BiteHolic's signature burgers, crispy broast, dynamite shrimp, chicken strips, and more. Fresh ingredients, bold flavors, and premium fast food in Riyadh.",
      keywords: [
        "BiteHolic",
        "Burger Riyadh",
        "Best Burger Riyadh",
        "Broast Riyadh",
        "Chicken Burger Riyadh",
        "Dynamite Shrimp Riyadh",
        "Fast Food Riyadh",
        "Restaurant Riyadh",
        "Saudi Arabia Restaurant",
        "Crispy Chicken",
      ],
    },

    ar: {
      title:
        "بايت هوليك | أفضل البرجر والبروست والديناميت شرمب والوجبات السريعة في الرياض",
      description:
        "استمتع بأشهى أنواع البرجر والبروست والديناميت شرمب وشرائح الدجاج في بايت هوليك. مكونات طازجة ونكهات مميزة وتجربة طعام استثنائية في الرياض.",
      keywords: [
        "بايت هوليك",
        "برجر الرياض",
        "أفضل برجر الرياض",
        "بروست الرياض",
        "ديناميت شرمب",
        "مطعم الرياض",
        "وجبات سريعة الرياض",
        "برجر دجاج",
        "مطعم سعودي",
        "مطاعم الرياض",
      ],
    },
  };

  const current = seo[lang] || seo.en;

  return {
    metadataBase: new URL("https://www.biteholic.com"),

    title: current.title,

    description: current.description,

    keywords: current.keywords,

    applicationName: "BiteHolic",

    creator: "BiteHolic",

    publisher: "BiteHolic",

    category: "Restaurant",

    alternates: {
      canonical: `https://www.biteholic.com/${lang}`,
      languages: {
        en: "https://www.biteholic.com/en",
        ar: "https://www.biteholic.com/ar",
      },
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      title: current.title,
      description: current.description,
      url: `https://www.biteholic.com/${lang}`,
      siteName: "BiteHolic",
      locale: lang === "ar" ? "ar_SA" : "en_US",
      type: "website",

      images: [
        {
          url: "https://www.biteholic.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "BiteHolic Restaurant",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: current.title,
      description: current.description,
      images: ["https://www.biteholic.com/og-image.jpg"],
    },

    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

/* ==========================================
   PAGE
========================================== */

export default async function Home({ params }) {
  const { lang } = await params;

  if (!validLocales.includes(lang)) {
    notFound();
  }

  const products = await getProducts(lang);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "BiteHolic",
    url: "https://www.biteholic.com",
    image: "https://www.biteholic.com/og-image.jpg",
    servesCuisine: [
      "Burgers",
      "Broast",
      "Fast Food",
      "Chicken",
      "Shrimp",
    ],
    priceRange: "$$",

    address: {
      "@type": "PostalAddress",
      addressLocality: "Riyadh",
      addressCountry: "SA",
    },

    sameAs: [
      "https://www.instagram.com/biteholic",
      "https://www.tiktok.com/@biteholic",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <main className="flex flex-col min-h-screen bg-[#050505]">
        <Hero lang={lang} />

        <MapSection />

        <HomeMenuSection
          products={products}
          lang={lang}
        />

        <ContactSection lang={lang} />
      </main>
    </>
  );
}