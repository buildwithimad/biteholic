import { notFound } from "next/navigation";
import ContactClient from "./ContactClient";

const validLocales = ["en", "ar"];

export const metadata = {
  title: "Contact Us | Biteholic",
  description: "Get in touch with Biteholic. We'd love to hear from you.",
};

export default async function ContactPage({ params }) {
  // Await params (Required in Next.js 15+)
  const { lang } = await params;

  if (!validLocales.includes(lang)) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-screen bg-[#050505]">
      <ContactClient lang={lang} />
    </main>
  );
}