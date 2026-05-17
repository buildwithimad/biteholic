import { notFound } from "next/navigation";
import AboutClient from "./AboutClient";

const validLocales = ["en", "ar"];

export const metadata = {
  title: "Our Story | Biteholic",
  description: "Discover the roots of Biteholic and our passion for premium gourmet burgers.",
};

export default async function AboutPage({ params }) {
  // Await params (Required in Next.js 15+)
  const { lang } = await params;

  if (!validLocales.includes(lang)) {
    notFound();
  }

  // If you ever create an About document in Sanity, you can fetch it here 
  // and pass it down as a prop to AboutClient.

  return (
    <main className="flex flex-col min-h-screen bg-[#050505]">
      <AboutClient lang={lang} />
    </main>
  );
}