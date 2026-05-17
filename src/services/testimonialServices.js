import { client } from "@/sanity/lib/client";
import { testimonialsQuery } from "@/sanity/queries";


const getLocalizedText = (field, lang) => {
  if (!field) return null;
  if (typeof field === 'string') return field; // If it's just a string, return it
  return field[lang] || field.en || null; // If it's a translation object, get the language
};

// 🟢 Get all Testimonials
export async function getTestimonials(lang = "en") {
  const data = await client.fetch(testimonialsQuery);
  
  if (!data) return [];
  
  return data.map(t => ({
    ...t,
    name: getLocalizedText(t.name, lang),
    initials: getLocalizedText(t.initials, lang),
    text: getLocalizedText(t.text, lang),
  }));
}