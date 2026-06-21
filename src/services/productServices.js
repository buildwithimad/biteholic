import { client } from "@/sanity/lib/client";
import { productsQuery, productBySlugQuery, homeProductsQuery } from "@/sanity/queries";

// Helper to safely extract text whether it's a simple string or a localized object
const getLocalizedText = (field, lang) => {
  if (!field) return null;
  if (typeof field === 'string') return field; // If it's just a string, return it
  return field[lang] || field.en || null; // If it's a translation object, get the language
};

// Helper to map language fields over an array of products (used for lists/cards)
const mapProductLanguage = (productsArray, lang) => {
  if (!productsArray) return [];
  return productsArray.map((item) => ({
    ...item,
    name: getLocalizedText(item.name, lang),
    shortDescription: getLocalizedText(item.shortDescription, lang),
    badge: getLocalizedText(item.badge, lang),
    category: {
      ...item.category,
      name: getLocalizedText(item.category?.name, lang),
    }
  }));
};


// 🟢 Get all products (General list for Menu/Shop pages)
export async function getProducts(lang = "en") {
  const data = await client.fetch(productsQuery);
  return mapProductLanguage(data, lang);
}


// 🟢 Get categorized homepage products
export async function getHomeProducts(lang = "en") {
  const data = await client.fetch(homeProductsQuery);

  // Fallback to empty arrays if no data is found
  if (!data) return { featured: [], bestSellers: [], menuPreview: [], specialOffers: [] };

  return {
    featured: mapProductLanguage(data.featured, lang),
    bestSellers: mapProductLanguage(data.bestSellers, lang),
    menuPreview: mapProductLanguage(data.menuPreview, lang),
    
    // Map over the array of special offers to translate dynamic fields safely
    specialOffers: data.specialOffers?.map(offer => ({
      ...offer,
      name: getLocalizedText(offer.name, lang),
      offerBadge: getLocalizedText(offer.offerBadge, lang),
      offerTitle1: getLocalizedText(offer.offerTitle1, lang),
      offerTitle2: getLocalizedText(offer.offerTitle2, lang),
      offerSubtitle: getLocalizedText(offer.offerSubtitle, lang),
      offerButtonText: getLocalizedText(offer.offerButtonText, lang),
    })) || [],
  };
}


// 🔵 Get product detail by slug (For specific product page)
export async function getProductBySlug(slug, lang = "en") {
  const item = await client.fetch(productBySlugQuery, { slug });

  if (!item) return null;

  return {
    ...item,
    name: getLocalizedText(item.name, lang),
    description: getLocalizedText(item.description, lang),
    shortDescription: getLocalizedText(item.shortDescription, lang),
    badge: getLocalizedText(item.badge, lang),
    whatsappMessage: getLocalizedText(item.whatsappMessage, lang),

    seo: item.seo
  ? {
      metaTitle: getLocalizedText(
        item.seo.metaTitle,
        lang
      ),
      metaDescription: getLocalizedText(
        item.seo.metaDescription,
        lang
      ),
      keywords: item.seo.keywords || [],
    }
  : null,

    specs: item.specs?.map(s => ({
      label: getLocalizedText(s.label, lang),
      value: getLocalizedText(s.value, lang),
    })),

    nutrition: item.nutrition?.map(n => ({
      label: getLocalizedText(n.label, lang),
      value: getLocalizedText(n.value, lang),
    })),

    addons: item.addons?.map(a => ({
      name: getLocalizedText(a.name, lang),
      price: a.price,
    })),

    category: {
      ...item.category,
      name: getLocalizedText(item.category?.name, lang),
    }
  };
}