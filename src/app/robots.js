export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/dashboard/*", "/api/*",],
      },
    ],

    sitemap: "https://www.biteholic.com/sitemap.xml",

    host: "https://www.biteholic.com",
  };
}