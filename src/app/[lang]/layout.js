import { Roboto, Montserrat, Cairo } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
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

const validLocales = ["en", "ar"];

export const metadata = {
  title: "Biteholic | Premium Gourmet Burgers",
  description:
    "Experience the pinnacle of gourmet burgers crafted with premium ingredients.",
};

export async function generateStaticParams() {
  return validLocales.map((lang) => ({ lang }));
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;

  if (!validLocales.includes(lang)) {
    notFound();
  }

  const direction = lang === "ar" ? "rtl" : "ltr";

  return (
    <div
      dir={direction}
      className={`${roboto.variable} ${montserrat.variable} ${cairo.variable} h-full antialiased`}
    >
      <div className="min-h-full flex flex-col bg-[#050505] text-white selection:bg-white selection:text-[#E88C15]">

        {/* Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] opacity-10 blur-[100px] pointer-events-none transition-all duration-1000">
          <div className="w-full h-full bg-[#E88C15] rounded-full" />
        </div>

        <Suspense fallback={null}>
          <Navbar lang={lang} />
        </Suspense>

        <SmoothScroll>{children}</SmoothScroll>

        <Footer lang={lang} />
      </div>
    </div>
  );
}