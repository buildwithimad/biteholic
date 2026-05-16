import ProductDetail from "./ProductDetailsClient";
import { getProductBySlug } from "@/services/productServices";
import { notFound } from "next/navigation";

export default async function ProductDetailsPage({ params }) {
  const { lang, slug } = await params;

  const product = await getProductBySlug(slug, lang);

  console.log("slug:", slug);
  console.log("product:", product);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} lang={lang} />;
}