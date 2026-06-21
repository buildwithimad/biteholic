import ProductDetail from "./ProductDetailsClient";
import { getProductBySlug } from "@/services/productServices";
import { notFound } from "next/navigation";

/* ==================================================
   SEO
================================================== */

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;

  const product = await getProductBySlug(slug, lang);

  if (!product) {
    return {};
  }

  const title =
    product.seo?.metaTitle ||
    `${product.name} | BiteHolic`;

  const description =
    product.seo?.metaDescription ||
    product.shortDescription ||
    product.description ||
    "";

  const image =
    product.gallery?.[0]?.asset?.url ||
    product.mainImage?.asset?.url ||
    "https://www.biteholic.com/og-image.jpg";

  return {
    metadataBase: new URL("https://www.biteholic.com"),

    title,

    description,

    keywords: product.seo?.keywords || [],

    alternates: {
      canonical: `https://www.biteholic.com/${lang}/menu/${slug}`,
      languages: {
        en: `https://www.biteholic.com/en/menu/${slug}`,
        ar: `https://www.biteholic.com/ar/menu/${slug}`,
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
      title,
      description,

      url: `https://www.biteholic.com/${lang}/menu/${slug}`,

      siteName: "BiteHolic",

      locale: lang === "ar" ? "ar_SA" : "en_US",

      type: "website",

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/* ==================================================
   PAGE
================================================== */

export default async function ProductDetailsPage({
  params,
}) {
  const { lang, slug } = await params;

  const product = await getProductBySlug(
    slug,
    lang
  );

  if (!product) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",

    "@type": "Product",

    name: product.name,

    description:
      product.shortDescription ||
      product.description,

    image:
      product.gallery?.map(
        (img) => img.asset?.url
      ) || [],

    sku: product.sku,

    category: product.category?.name,

    brand: {
      "@type": "Brand",
      name: "BiteHolic",
    },

    offers: {
      "@type": "Offer",

      priceCurrency: "SAR",

      price:
        product.discountPrice ||
        product.price,

      availability: product.isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",

      url: `https://www.biteholic.com/${lang}/menu/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <ProductDetail
        product={product}
        lang={lang}
      />
    </>
  );
}