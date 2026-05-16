export default {
  name: "seo",
  type: "object",
  title: "SEO",
  fields: [
    { name: "metaTitle", type: "localeString" },
    { name: "metaDescription", type: "localeText" },
    {
      name: "keywords",
      type: "array",
      of: [{ type: "string" }]
    },
    {
      name: "ogImage",
      type: "image",
      options: { hotspot: true }
    }
  ]
};