// PRODUCT LIST (Generic / All Products)
export const productsQuery = `
*[_type == "product" && isAvailable == true]{
  _id,
  "slug": slug.current,
  name,
  shortDescription,
  price,
  discountPrice,
  isOnSale,
  badge,
  // Expand mainImage to get URL directly for cards
  mainImage{
    ...,
    asset->{
      url
    }
  },
  "category": category->{
    name,
    "slug": slug.current
  }
}
`;

// HOMEPAGE GROUPED PRODUCTS (Featured, Best Sellers, Menu Preview, Special Offers)
export const homeProductsQuery = `{
  "featured": *[_type == "product" && isAvailable == true && isFeatured == true] | order(_createdAt desc)[0...4] {
    _id, name, "slug": slug.current, price, discountPrice, isOnSale, badge, shortDescription, 
    mainImage{..., asset->{url}}, 
    "category": category->{name, "slug": slug.current}
  },
  "bestSellers": *[_type == "product" && isAvailable == true && isBestSeller == true] | order(_createdAt desc)[0...4] {
    _id, name, "slug": slug.current, price, discountPrice, isOnSale, badge, shortDescription, 
    mainImage{..., asset->{url}}, 
    "category": category->{name, "slug": slug.current}
  },
  "menuPreview": *[_type == "product" && isAvailable == true] | order(_createdAt desc)[0...8] {
    _id, name, "slug": slug.current, price, discountPrice, isOnSale, badge, shortDescription, 
    mainImage{..., asset->{url}}, 
    "category": category->{name, "slug": slug.current}
  },
  "specialOffers": *[_type == "product" && isAvailable == true && isSpecialOffer == true] | order(_createdAt desc)[0...5] {
    _id, name, "slug": slug.current, offerStartDate, offerEndDate, 
    offerBadge, offerTitle1, offerTitle2, offerSubtitle, offerButtonText,
    mainImage{..., asset->{url}}
  }
}`;

// PRODUCT DETAIL
export const productBySlugQuery = `
*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  sku,
  price,
  discountPrice,
  isOnSale,
  badge,
  description,
  shortDescription,
  
  // Expand mainImage to get the URL
  mainImage{
    ...,
    asset->{
      url
    }
  },
  
  // Expand gallery items to get their URLs
  gallery[]{
    ...,
    asset->{
      url
    },
    alt
  },
  
  specs[]{
    label,
    value
  },
  nutrition[]{
    label,
    value
  },
  addons[]{
    name,
    price
  },
  isAvailable,
  preparationTime,
  whatsappMessage,
  seo{
  metaTitle,
  metaDescription,
  keywords
},
  "category": category->{
    name,
    "slug": slug.current
  }
}
`;


// GET ALL CATEGORIES
export const categoriesQuery = `
*[_type == "category"] | order(order asc) {
  _id, 
  name, 
  "slug": slug.current, 
  image{
    ..., 
    asset->{
      url
    }
  }
}
`;



// GET ALL TESTIMONIALS
export const testimonialsQuery = `
*[_type == "testimonial"] | order(order asc) {
  _id,
  name,
  initials,
  handle,
  rating,
  text
}
`;