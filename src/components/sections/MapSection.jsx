"use client";

import { motion } from "framer-motion";

export default function MapSection() {
  // Mocked positions for the floating pins to match the Riyadh spread in the screenshot
  const pins = [
    { id: 1, top: "20%", left: "45%", delay: 0.1 },
    { id: 2, top: "30%", left: "58%", delay: 0.2 },
    { id: 3, top: "25%", left: "70%", delay: 0.3 },
    { id: 4, top: "40%", left: "75%", delay: 0.4 },
    { id: 5, top: "45%", left: "55%", delay: 0.5 },
    { id: 6, top: "55%", left: "62%", delay: 0.6 },
    { id: 7, top: "65%", left: "50%", delay: 0.7 },
    { id: 8, top: "80%", left: "58%", delay: 0.8 },
    { id: 9, top: "75%", left: "70%", delay: 0.9 },
  ];

  return (
    <section className="relative w-full h-[60vh] min-h-[400px] max-h-[700px] bg-[#f9f8f4] overflow-hidden">
      
      {/* Map Background Placeholder */}
      {/* Note: For a fully interactive map, you can replace this iframe with 'react-google-maps/api' 
          and pass the SVG below into your Marker's icon prop. */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <iframe
          title="BiteHolic Riyadh Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d463877.31243208534!2d46.49286820542152!3d24.72545537233718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          className="w-full h-full border-0"
          style={{ filter: "opacity(0.85) contrast(1.1) brightness(1.05)" }}
          loading="lazy"
        />
      </div>

      {/* Floating Markers Overlay */}
      <div className="absolute inset-0 z-10 w-full relative pointer-events-none">
        {pins.map((pin) => (
          <motion.div
            key={pin.id}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: pin.delay, type: "spring", stiffness: 200 }}
            className="absolute transform -translate-x-1/2 -translate-y-full"
            style={{ top: pin.top, left: pin.left }}
          >
            {/* Custom BiteHolic Marker (Orange teardrop with 'B') */}
            <div className="relative group cursor-pointer pointer-events-auto origin-bottom">
              <svg 
                width="32" 
                height="42" 
                viewBox="0 0 32 42" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              >
                <path d="M16 0C7.16344 0 0 7.16344 0 16C0 28 16 42 16 42C16 42 32 28 32 16C32 7.16344 24.8366 0 16 0Z" fill="#E88D15"/>
                <text x="16" y="22" fontSize="14" fill="white" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  B
                </text>
              </svg>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}