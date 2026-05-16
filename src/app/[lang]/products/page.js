import { getProducts } from "@/services/productServices";
import Link from "next/link";

export default async function ProductsPage({ params }) {
  const { lang } = await params;

  const products = await getProducts(lang);

  return (
    <section className="min-h-screen bg-[#0B0B0B] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {products.map((product) => (
          <Link
            key={product._id}
            href={`/${lang}/products/${product.slug}`}
            className="bg-[#111] rounded-xl p-4 block"
          >
            <h2 className="text-lg">{product.name}</h2>
          </Link>
        ))}

      </div>
    </section>
  );
}