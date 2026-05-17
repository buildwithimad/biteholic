export default {
  name: "category",
  type: "document",
  title: "Category",
  fields: [
    {
      name: "name",
      type: "localeString",
      validation: Rule => Rule.required()
    },
    {
      name: "slug",
      type: "slug",
      options: { source: "name.en", maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: "image",
      type: "image",
      options: { hotspot: true }
    },
    {
      name: "order",
      type: "number",
      title: "Display Order",
      description: "Used to sort categories (e.g., 1 for Burgers, 2 for Sides)"
    }
  ]
};