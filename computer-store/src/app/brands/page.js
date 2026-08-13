"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ── HERO SLIDES ── */
const heroSlides = [
  { image: "https://ik.imagekit.io/wn1nobtx5/laptop/banner_2.png", badge: "Top Brands", title: "Our Brands", subtitle: "Top laptop manufacturers  trusted worldwide." },
  { image: "https://ik.imagekit.io/wn1nobtx5/laptop/banner_4.png", badge: "Premium Quality", title: "Built to Perform", subtitle: "From gaming beasts to office workhorses  we have it all." },
  { image: "https://ik.imagekit.io/wn1nobtx5/laptop/banner_3.png", badge: "All Categories", title: "Every Brand, One Place", subtitle: "ASUS, Lenovo, HP, Dell, MSI, Acer  explore them all." },
];

/* ── BRAND DATA ──
   wallpaper: background image shown in the card
   logo: small icon shown on top of the wallpaper */
const brands = [
  { name: "ASUS",   logo: "https://ik.imagekit.io/wn1nobtx5/laptop/asus-logo.jpg",   wallpaper: "https://ik.imagekit.io/wn1nobtx5/laptop/banner_card4.jpg", color: "from-blue-50 to-blue-100",   text: "text-blue-700",  desc: "Gaming & Professional Laptops" },
  { name: "Lenovo", logo: "https://ik.imagekit.io/wn1nobtx5/laptop/lenovo-logo.jpg", wallpaper: "https://ik.imagekit.io/wn1nobtx5/laptop/lenovo_banner.jpg",   color: "from-red-50 to-red-100",     text: "text-red-700",   desc: "ThinkPad, Legion & IdeaPad Series" },
  { name: "HP",     logo: "https://ik.imagekit.io/wn1nobtx5/laptop/hp-logo.jpg",     wallpaper: "https://ik.imagekit.io/wn1nobtx5/laptop/hp_banner.jpg",                                color: "from-sky-50 to-sky-100",     text: "text-sky-700",   desc: "Pavilion, Victus & Spectre Series" },
  { name: "Dell",   logo: "https://ik.imagekit.io/wn1nobtx5/laptop/dell-logo.jpg",                       wallpaper: "https://ik.imagekit.io/wn1nobtx5/laptop/dell_wallpaper.jpg",                                color: "from-cyan-50 to-cyan-100",   text: "text-cyan-700",  desc: "XPS, Inspiron & Gaming Series" },
  { name: "MSI",    logo:  "https://ik.imagekit.io/wn1nobtx5/laptop/msi_logo.jpg",                       wallpaper: "https://ik.imagekit.io/wn1nobtx5/laptop/msi_banner.jpg",                                color: "from-rose-50 to-rose-100",   text: "text-rose-700",  desc: "Gaming & Creator Laptops" },
  { name: "Acer",   logo: "https://ik.imagekit.io/wn1nobtx5/laptop/acer-logo.jpg",  wallpaper:  "https://ik.imagekit.io/wn1nobtx5/laptop/acer_banner.jpg",                                color: "from-green-50 to-green-100", text: "text-green-700", desc: "Aspire, Nitro & Swift Series" },
];

export default function BrandsPage() {
  const [slide, setSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(null);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => {
        setPrevSlide(prev);
        setAnimKey((k) => k + 1);
        return (prev + 1) % heroSlides.length;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function goToSlide(i) {
    setPrevSlide(slide);
    setAnimKey((k) => k + 1);
    setSlide(i);
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── HERO SLIDER ── */}
      <section className="relative h-64 overflow-hidden bg-gray-950">
        {prevSlide !== null && (
          <div key={`prev-${prevSlide}`} className="absolute inset-0 animate-hero-fade-out">
            <Image src={heroSlides[prevSlide].image} alt="" fill className="object-cover opacity-60" />
          </div>
        )}
        <div key={`curr-${slide}`} className="absolute inset-0 animate-hero-fade-in">
          <Image src={heroSlides[slide].image} alt={heroSlides[slide].title} fill priority className="object-cover opacity-60" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/40 to-transparent" />

        <div key={animKey} className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center animate-hero-text">
          <span className="inline-block rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">
            {heroSlides[slide].badge}
          </span>
          <h1 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">{heroSlides[slide].title}</h1>
          <p className="mt-2 text-gray-300">{heroSlides[slide].subtitle}</p>
        </div>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === slide ? "w-8 bg-blue-400" : "w-2 bg-gray-500 hover:bg-gray-300"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── BRAND CARDS ── */}
      <section className="px-4 sm:px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">All Brands</h2>
          <p className="mt-1 text-sm text-gray-500">Click a brand to browse its laptops.</p>

          <div className="mt-8 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={`/laptops?brand=${encodeURIComponent(brand.name)}`}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                {/* ── Wallpaper image area with small logo on top ── */}
                <div className="relative h-36 w-full overflow-hidden bg-gray-200">
                  {/* Background wallpaper — fills full area */}
                  {brand.wallpaper ? (
                    <Image
                      src={brand.wallpaper}
                      alt={brand.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    /* Fallback gradient if no wallpaper */
                    <div className={`absolute inset-0 bg-gradient-to-br ${brand.color}`} />
                  )}
                  {/* Subtle dark overlay so logo stands out */}
                  <div className="absolute inset-0 bg-black/20" />

                  {/* Small logo box — centered */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-md overflow-hidden">
                      {brand.logo ? (
                        <Image src={brand.logo} alt={brand.name} width={48} height={48} className="object-contain p-1" />
                      ) : (
                        <span className={`text-xl font-extrabold ${brand.text}`}>{brand.name[0]}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Card info ── */}
                <div className="flex flex-col items-center px-4 py-3 text-center">
                  <h3 className={`text-lg font-extrabold ${brand.text}`}>{brand.name}</h3>
                  <p className="mt-0.5 text-xs text-gray-500">{brand.desc}</p>
                  <span className={`mt-2 text-xs font-semibold ${brand.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Browse {brand.name} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
