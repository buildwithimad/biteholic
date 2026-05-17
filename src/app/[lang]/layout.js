import { Roboto, Montserrat, Cairo } from "next/font/google";import { notFound } from "next/navigation";
import "../globals.css"; // Note the "../" because we are inside the [lang] folder now
import SmoothScroll from "@/components/animation/SmoothScroll";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Suspense } from "react";



const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
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
  className={`${roboto.variable} ${montserrat.variable} ${cairo.variable} h-full antialiased`}
>
      {/* 4. Added your brutalist background and selection colors here to protect the global theme */}
      <body className="min-h-full flex flex-col bg-[#050505] text-white selection:bg-white selection:text-[#E88C15]">

        {/* Dynamic Background Image - Changes on Hover */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] opacity-10 blur-[100px] pointer-events-none transition-all duration-1000">
        <div className="w-full h-full bg-[#E88C15] rounded-full" />
      </div>
        
        <Suspense fallback={null}>
  <Navbar lang={lang} />
</Suspense>

        <SmoothScroll>
          {children}
        </SmoothScroll>

        {/* Passing 'lang' to Footer just in case you want to translate it too! */}
        <Footer lang={lang} />
        
      </body>
    </html>
  );
}