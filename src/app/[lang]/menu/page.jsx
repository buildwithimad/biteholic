export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { Suspense } from "react";

import MenuClient from "./MenuClient";

import {
  getFilteredProducts,
  getCategories,
} from "@/services/categoryServices";

const validLocales = ["en", "ar"];

/* ==================================================
   SEO
================================================== */

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const seo = {
    en: {
      title:
        "Menu | BiteHolic - Premium Burgers, Broast & Fast Food in Riyadh",
      description:
        "Explore BiteHolic's full menu featuring burgers, broast, chicken strips, dynamite shrimp, fries, sauces and more. Fresh ingredients and bold flavors in Riyadh.",
      keywords: [
        "BiteHolic Menu",
        "Burger Menu Riyadh",
        "Best Burger Riyadh",
        "Broast Riyadh",
        "Chicken Strips Riyadh",
        "Dynamite Shrimp Riyadh",
        "Fast Food Riyadh",
        "Restaurant Menu Riyadh",
      ],
    },

    ar: {
      title:
        "المنيو | بايت هوليك - برجر وبروست ووجبات سريعة في الرياض",
      description:
        "تصفح منيو بايت هوليك واستمتع بأشهى أنواع البرجر والبروست وشرائح الدجاج والديناميت شرمب والبطاطس والصلصات الطازجة في الرياض.",
      keywords: [
        "منيو بايت هوليك",
        "برجر الرياض",
        "بروست الرياض",
        "مطعم الرياض",
        "منيو الرياض",
        "ديناميت شرمب",
        "برجر دجاج",
        "وجبات سريعة الرياض",
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
      canonical: `https://www.biteholic.com/${lang}/menu`,
      languages: {
        en: "https://www.biteholic.com/en/menu",
        ar: "https://www.biteholic.com/ar/menu",
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
      url: `https://www.biteholic.com/${lang}/menu`,
      siteName: "BiteHolic",
      locale: lang === "ar" ? "ar_SA" : "en_US",
      type: "website",

      images: [
        {
          url: "https://www.biteholic.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "BiteHolic Menu",
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

export default async function MenuPage({
  params,
  searchParams,
}) {
  const { lang } = await params;
  const currentSearchParams = await searchParams;

  if (!validLocales.includes(lang)) {
    notFound();
  }

  const [categories, { items, totalPages, currentPage }] =
    await Promise.all([
      getCategories(lang),
      getFilteredProducts(lang, currentSearchParams),
    ]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name:
      lang === "ar"
        ? "منيو بايت هوليك"
        : "BiteHolic Menu",

    url: `https://www.biteholic.com/${lang}/menu`,

    inLanguage: lang,

    hasMenuSection: categories.map((category) => ({
      "@type": "MenuSection",
      name: category.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <main>
        <Suspense
          fallback={
            <div className="text-white p-10">
              Loading menu...
            </div>
          }
        >
          <MenuClient
            lang={lang}
            categories={categories}
            items={items}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </Suspense>
      </main>
    </>
  );
}