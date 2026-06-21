import { notFound } from "next/navigation";
import {
  IBM_Plex_Sans,
  Montserrat,
  Cairo,
} from "next/font/google";

import "../globals.css";
import SmoothScroll from "@/components/animation/SmoothScroll";
import Footer from "@/components/layout/Footer";
import { Suspense } from "react";
import FloatingNav from "@/components/layout/FloatingNav";
import CursorProvider from "@/components/ui/CursorProvider";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const validLocales = ["en", "ar"];


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
    <html lang={lang} dir={direction}>
      <body
        className={`
          ${ibmPlexSans.variable}
          ${montserrat.variable}
          ${cairo.variable}
          antialiased
        `}
      >
        <div className="relative min-h-screen flex flex-col overflow-x-hidden bg-[#050505] text-white">

          {/* Global Orange Glow */}
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E88C15]/10 blur-[120px]" />
          </div>

          <Suspense fallback={null}>
            <FloatingNav lang={lang}/>
          </Suspense>

          <SmoothScroll>
            <CursorProvider/>
            {children}
          </SmoothScroll>

          <Footer lang={lang} />
        </div>
      </body>
    </html>
  );
}