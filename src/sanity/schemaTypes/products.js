export default {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    // BASIC
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
      name: "sku",
      type: "string"
    },
    {
      name: "category",
      type: "reference",
      to: [{ type: "category" }]
    },

    // PRICING
    {
      name: "price",
      type: "number",
      validation: Rule => Rule.required()
    },
    {
      name: "discountPrice",
      type: "number"
    },
    {
      name: "isOnSale",
      type: "boolean",
      initialValue: false
    },

    // MEDIA
    {
      name: "mainImage",
      type: "image",
      options: { hotspot: true }
    },
    {
      name: "gallery",
      type: "array",
      title: "Product Gallery (Max 5 Images)",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text (SEO)",
              description: "Describe the image for SEO"
            }
          ]
        }
      ],
      validation: Rule => Rule.required().min(1).max(5).error("Add 1 to 5 images only")
    },

    // CONTENT
    {
      name: "description",
      type: "localeText"
    },
    {
      name: "shortDescription",
      type: "localeString"
    },

    // FLAGS
    {
      name: "badge",
      type: "localeString"
    },
    {
      name: "isFeatured",
      title: "Is Featured?",
      type: "boolean",
      initialValue: false
    },
    {
      name: "isBestSeller",
      title: "Is Best Seller?",
      type: "boolean",
      initialValue: false
    },
    // --- SPECIAL OFFER SECTION ---
    {
      name: "isSpecialOffer",
      title: "Is Special Offer?",
      description: "Toggle on to feature this product in the Special Offer Banner",
      type: "boolean",
      initialValue: false
    },
    {
      name: "offerStartDate",
      title: "Offer Start Date",
      type: "datetime",
      hidden: ({ document }) => !document?.isSpecialOffer 
    },
    {
      name: "offerEndDate",
      title: "Offer End Date",
      type: "datetime",
      hidden: ({ document }) => !document?.isSpecialOffer 
    },
    {
      name: "offerBadge",
      title: "Offer Badge Text",
      description: "e.g., 'Limited Time Only • No Code Required'",
      type: "localeString",
      hidden: ({ document }) => !document?.isSpecialOffer 
    },
    {
      name: "offerTitle1",
      title: "Offer Title Line 1",
      description: "e.g., 'BUY 1'",
      type: "localeString",
      hidden: ({ document }) => !document?.isSpecialOffer 
    },
    {
      name: "offerTitle2",
      title: "Offer Title Line 2",
      description: "e.g., 'GET 1'",
      type: "localeString",
      hidden: ({ document }) => !document?.isSpecialOffer 
    },
    {
      name: "offerSubtitle",
      title: "Offer Subtitle",
      description: "e.g., 'FREE'",
      type: "localeString",
      hidden: ({ document }) => !document?.isSpecialOffer 
    },
    {
      name: "offerButtonText",
      title: "Offer Button Text",
      description: "e.g., 'Claim This Offer'",
      type: "localeString",
      hidden: ({ document }) => !document?.isSpecialOffer 
    },

    // DETAILS
    {
      name: "specs",
      type: "array",
      of: [{ type: "spec" }]
    },
    {
      name: "nutrition",
      type: "array",
      of: [{ type: "nutrition" }]
    },

    // ADDONS
    {
      name: "addons",
      type: "array",
      of: [{ type: "addon" }]
    },

    // AVAILABILITY
    {
      name: "isAvailable",
      type: "boolean",
      initialValue: true
    },
    {
      name: "preparationTime",
      type: "number"
    },

    // ORDER
    {
      name: "whatsappMessage",
      type: "localeString"
    },

    // SEO
    {
      name: "seo",
      type: "seo"
    }
  ]
};