import FeaturedBurgers from "@/components/sections/FeaturedBurgers";
import Hero from "@/components/sections/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero/>
      <FeaturedBurgers/>
    </main>
  );
}
