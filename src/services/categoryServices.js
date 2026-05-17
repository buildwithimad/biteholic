import { client } from "@/sanity/lib/client";
import { categoriesQuery } from "@/sanity/queries";

// Helper to safely extract text whether it's a simple string or a localized object
const getLocalizedText = (field, lang) => {
  if (!field) return null;
  if (typeof field === 'string') return field; 
  return field[lang] || field.en || null; 
};

// Helper to map language fields over an array of products
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

// 🟢 Get all categories
export async function getCategories(lang = "en") {
  const data = await client.fetch(categoriesQuery);
  if (!data) return [];
  return data.map(c => ({
    ...c,
    name: getLocalizedText(c.name, lang),
    imageUrl: c.image?.asset?.url || null
  }));
}

// 🟢 Dynamically fetch products based on URL parameters (Server-Side Filtering & Pagination)
export async function getFilteredProducts(lang = "en", queryParams = {}) {
  const { category, search, sort, offers, page = 1, limit = 8 } = queryParams;
  
  // Calculate Pagination logic
  const start = (Number(page) - 1) * Number(limit);
  const end = start + Number(limit);

  // 1. Build Base Filters
  let filters = `_type == "product" && isAvailable == true`;
  const params = {};

  // Category Filter
  if (category && category !== 'all') {
    filters += ` && category->slug.current == $category`;
    params.category = category;
  }

  // Offers Only Filter
  if (offers === 'true') {
    filters += ` && isOnSale == true`;
  }

  // Search Filter (checks both English and Arabic fields)
  if (search) {
    filters += ` && (name.en match $search || name.ar match $search || shortDescription.en match $search || shortDescription.ar match $search)`;
    params.search = `*${search}*`; // Wildcard for partial matches
  }

  // 2. Build Sorting Logic (GROQ coalesce handles null discount prices beautifully)
  let order = `order(_createdAt desc)`;
  if (sort === 'low-high') order = `order(coalesce(discountPrice, price) asc)`;
  if (sort === 'high-low') order = `order(coalesce(discountPrice, price) desc)`;

  // 3. Assemble Final Query
  const query = `
    {
      "items": *[${filters}] | ${order} [${start}...${end}] {
        _id, "slug": slug.current, name, shortDescription, price, discountPrice, isOnSale, badge,
        mainImage{..., asset->{url}},
        "category": category->{name, "slug": slug.current}
      },
      "total": count(*[${filters}])
    }
  `;

  // 4. Fetch and map data
  const data = await client.fetch(query, params);
  
  return {
    items: mapProductLanguage(data.items, lang),
    total: data.total,
    totalPages: Math.ceil(data.total / limit),
    currentPage: Number(page)
  };
}