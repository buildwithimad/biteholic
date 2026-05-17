// src/app/not-found.jsx
import NotFoundClient from "@/components/sections/NotFoundClient";
import "./globals.css"; // Ensure your global styles are imported

export const metadata = {
  title: "404 - Page Not Found | Biteholic",
};

export default function GlobalNotFound() {
  // We default to English for global unmatched routes
  return (
    <html lang="en" dir="ltr">
      <body className="min-h-full flex flex-col bg-[#050505] text-white">
        <NotFoundClient />
      </body>
    </html>
  );
}