import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css"; // Note the "../" because we are inside the [lang] folder now
import SmoothScroll from "@/components/animation/SmoothScroll";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

// Font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define valid languages
const validLocales = ["en", "ar"];

// Metadata (You can even make this dynamic per language later!)
export const metadata = {
  title: "Biteholic | Premium Gourmet Burgers",
  description: "Experience the pinnacle of gourmet burgers crafted with premium ingredients.",
};

// Optional: Generates static routes at build time
export async function generateStaticParams() {
  return validLocales.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }) {
  // 1. Await params (Next.js 15+)
  const { lang } = await params;

  // 2. Validate the language
  if (!validLocales.includes(lang)) {
    notFound();
  }

  // 3. Determine Right-to-Left or Left-to-Right
  const direction = lang === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={direction}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* 4. Added your brutalist background and selection colors here to protect the global theme */}
      <body className="min-h-full flex flex-col bg-[#050505] text-white selection:bg-white selection:text-[#E88C15]">
        
        <Navbar lang={lang} />

        <SmoothScroll>
          {children}
        </SmoothScroll>

        {/* Passing 'lang' to Footer just in case you want to translate it too! */}
        <Footer lang={lang} />
        
      </body>
    </html>
  );
}