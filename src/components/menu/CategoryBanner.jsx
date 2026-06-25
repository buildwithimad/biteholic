export default function CategoryBanner({ category, lang = "en" }) {
  const isAr = lang === "ar";

  // Fallback for missing category data
  if (!category) return null;

  const name = category.name || "Category";
  const description = category.description || "";

  return (
    <div className="relative w-full bg-[#fcf9f0] rounded-[32px] overflow-hidden mb-12 transition-all duration-500 ease-out hover:shadow-lg group">
      {/* Decorative Elements (CSS Only) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large blurred orange circle - top right */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#E88D15]/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700 ease-out" />
        
        {/* Abstract geometric shape - bottom left */}
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#E88D15]/5 rounded-full blur-2xl group-hover:translate-x-4 transition-transform duration-700 ease-out" />
        
        {/* Floating accent dot */}
        <div className="absolute top-8 right-1/3 w-3 h-3 bg-[#E88D15]/20 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
        
        {/* Subtle pattern line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E88D15]/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14 md:px-14 md:py-16">
        <div className="max-w-4xl">
          {/* Accent Label */}
          <span className="inline-block text-[#E88D15] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-3 sm:mb-4">
            Category
          </span>

          {/* Category Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#050505] leading-tight mb-3 sm:mb-4">
            {name}
          </h2>

          {/* Category Description */}
          {description && (
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E88D15]/0 via-transparent to-[#E88D15]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none" />
    </div>
  );
}
