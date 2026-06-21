import { notFound } from "next/navigation";
import AboutClient from "./AboutClient";

const validLocales = ["en", "ar"];

/* ==================================================
   SEO
================================================== */

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const seo = {
    en: {
      title: "About BiteHolic | Our Story, Passion & Premium Burgers",
      description:
        "Learn the story behind BiteHolic. Discover our passion for premium burgers, crispy broast, quality ingredients, and unforgettable flavors in Riyadh.",
      keywords: [
        "About BiteHolic",
        "BiteHolic Story",
        "Burger Restaurant Riyadh",
        "Premium Burgers Riyadh",
        "Fast Food Restaurant Riyadh",
        "Broast Riyadh",
        "BiteHolic Restaurant",
      ],
    },

    ar: {
      title: "عن بايت هوليك | قصتنا وشغفنا بالبرجر المميز",
      description:
        "تعرف على قصة بايت هوليك وشغفنا بتقديم البرجر المميز والبروست والمكونات الطازجة والنكهات الاستثنائية في الرياض.",
      keywords: [
        "عن بايت هوليك",
        "قصة بايت هوليك",
        "مطعم برجر الرياض",
        "أفضل برجر الرياض",
        "مطعم وجبات سريعة",
        "بروست الرياض",
        "مطعم بايت هوليك",
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
      canonical: `https://www.biteholic.com/${lang}/about`,
      languages: {
        en: "https://www.biteholic.com/en/about",
        ar: "https://www.biteholic.com/ar/about",
      },
    },

    robots: {
      index: true,
      follow: true,
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
      url: `https://www.biteholic.com/${lang}/about`,
      siteName: "BiteHolic",
      locale: lang === "ar" ? "ar_SA" : "en_US",
      type: "website",

      images: [
        {
          url: "https://www.biteholic.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "About BiteHolic",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: current.title,
      description: current.description,
      images: ["https://www.biteholic.com/og-image.jpg"],
    },
  };
}

/* ==================================================
   PAGE
================================================== */

export default async function AboutPage({ params }) {
  const { lang } = await params;

  if (!validLocales.includes(lang)) {
    notFound();
  }

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: lang === "ar" ? "عن بايت هوليك" : "About BiteHolic",
    url: `https://www.biteholic.com/${lang}/about`,
    inLanguage: lang,
  };

  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",

    name: "BiteHolic",

    url: "https://www.biteholic.com",

    image: "https://www.biteholic.com/og-image.jpg",

    description:
      lang === "ar"
        ? "مطعم متخصص في البرجر والبروست والوجبات السريعة المميزة."
        : "A premium fast-food restaurant specializing in burgers, broast, chicken, and signature flavors.",

    servesCuisine: [
      "Burger",
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
          __html: JSON.stringify(aboutSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurantSchema),
        }}
      />

      <main className="flex flex-col min-h-screen bg-[#050505]">
        <AboutClient lang={lang} />
      </main>
    </>
  );
}