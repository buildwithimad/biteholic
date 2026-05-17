export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { Suspense } from "react";
import MenuClient from "./MenuClient";
import { getFilteredProducts, getCategories } from "@/services/categoryServices";

const validLocales = ["en", "ar"];

export default async function MenuPage({ params, searchParams }) {
  const { lang } = await params;
  const currentSearchParams = await searchParams;

  if (!validLocales.includes(lang)) {
    notFound();
  }

  const [categories, { items, totalPages, currentPage }] = await Promise.all([
    getCategories(lang),
    getFilteredProducts(lang, currentSearchParams)
  ]);

  return (
    <main>
      <Suspense fallback={<div className="text-white p-10">Loading menu...</div>}>
        <MenuClient 
          lang={lang} 
          categories={categories} 
          items={items} 
          totalPages={totalPages} 
          currentPage={currentPage} 
        />
      </Suspense>
    </main>
  );
}