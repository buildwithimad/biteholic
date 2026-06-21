import { client } from "@/sanity/lib/client";

export default async function sitemap() {
  const baseUrl = "https://www.biteholic.com";

  // Fetch all products from Sanity
  const products = await client.fetch(`
    *[_type == "product"]{
      "slug": slug.current,
      _updatedAt
    }
  `);

  // Static Pages
  const staticPages = [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/ar`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${baseUrl}/en/menu`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ar/menu`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/en/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ar/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/en/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ar/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic Product Pages
  const productPages = products.flatMap((product) => [
    {
      url: `${baseUrl}/en/menu/${product.slug}`,
      lastModified: product._updatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ar/menu/${product.slug}`,
      lastModified: product._updatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]);

  return [...staticPages, ...productPages];
}