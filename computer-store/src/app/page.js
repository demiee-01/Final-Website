"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

// Hero slides using available banner images
const heroSlides = [
  {
    image: "/images/banner/banner_1.jpg",
    badge: "New Arrivals",
    title: "Find the Perfect Laptop",
    subtitle: "Top picks for work, study, and gaming — all in one place.",
    cta: "Shop Now",
    href: "/laptops",
  },
  {
    image: "/images/banner/banner_2.jpg",
    badge: "Lenovo Legion",
    title: "Legion of Power",
    subtitle: "Next-level gaming with Lenovo's finest machines.",
    cta: "Shop Legion",
    href: "/laptops",
  },
  {
    image: "/images/banner/rog_1.jpg",
    badge: "ASUS ROG",
    title: "Dominate Every Game",
    subtitle: "Ultimate performance for serious gamers. Built to win.",
    cta: "Shop ROG",
    href: "/laptops",
  },
];

const brands = [
  { name: "ASUS", logo: "/images/laptops/asus/asus_1.png", href: "/laptops" },
  { name: "Dell", logo: "/images/laptops/dell/dell_1.png", href: "/laptops" },
  { name: "HP", logo: "/images/laptops/hp/hp_1.png", href: "/laptops" },
  { name: "Lenovo", logo: "/images/laptops/lenovo/lenovo_1.png", href: "/laptops" },
  { name: "MSI", logo: "/images/laptops/msi/msi_1.png", href: "/laptops" },
];

const features = [
  {
    icon: "🚀",
    title: "Top Performance",
    desc: "Latest gen CPUs and GPUs for work and gaming.",
  },
  {
    icon: "🛡️",
    title: "Warranty Included",
    desc: "All laptops come with official manufacturer warranty.",
  },
  {
    icon: "🚚",
    title: "Fast Delivery",
    desc: "Same-day dispatch on orders placed before 2PM.",
  },
  {
    icon: "💬",
    title: "Expert Support",
    desc: "Our tech team is ready to help you choose the right laptop.",
  },
];

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const [laptops, setLaptops] = useState([]);
  const [added, setAdded] = useState(null);
  const [heroSearch, setHeroSearch] = useState("");

  const { addToCart } = useCart();
  const router = useRouter();

  function handleHeroSearch(e) {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/laptops?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      router.push("/laptops");
    }
  }

  function handleAddToCart(laptop) {
    addToCart(laptop);
    setAdded(laptop.id);
    setTimeout(() => setAdded(null), 1500);
  }

  function handleBuyNow(laptop) {
    addToCart(laptop);
    router.push("/cart");
  }

  // Auto-advance hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Fetch featured laptops
  useEffect(() => {
    fetch("/api/laptops")
      .then((r) => r.json())
      .then((result) => {
        if (result.success) setLaptops(result.data.slice(0, 6));
      })
      .catch(() => {});
  }, []);

  const current = heroSlides[slide];

  return (
    <main className="bg-white">
      {/* ── HERO SLIDER ── */}
      <section className="relative h-[560px] overflow-hidden bg-gray-950">
        {/* Background image */}
        <div className="absolute inset-0 transition-opacity duration-800">
          <Image
            src={current.image}
            alt={current.title}
            fill
            priority
            className="object-cover opacity-60"
          />
        </div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/20 to-transparent" />

        {/* Content */}
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
          <span className="mb-3 inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white w-fit">
            {current.badge}
          </span>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            {current.title}
          </h1>
          <p className="mt-4 max-w-lg text-lg text-gray-300">{current.subtitle}</p>
          <div className="mt-8 flex gap-4">
            <Link
              href={current.href}
              className="rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              {current.cta}
            </Link>
            <Link
              href="/brands"
              className="rounded-lg border border-gray-400 px-7 py-3 font-semibold text-white hover:bg-white hover:text-gray-900 transition-colors"
            >
              View Brands
            </Link>
          </div>

          {/* Hero search */}
          <form onSubmit={handleHeroSearch} className="mt-8 flex w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-lg">
            <input
              type="text"
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              placeholder="Search laptops, brands, specs..."
              className="flex-1 px-5 py-3.5 text-sm text-gray-800 outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 px-6 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-2 rounded-full transition-all ${
                i === slide ? "w-8 bg-blue-500" : "w-2 bg-gray-500"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── BRANDS BAR ── */}
      <section className="border-b border-gray-100 bg-gray-50 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-gray-400">
            Top Brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {brands.map((brand) => (
              <Link key={brand.name} href={brand.href} className="group flex flex-col items-center gap-2">
                <div className="relative h-16 w-24 grayscale transition-all group-hover:grayscale-0">
                  <Image src={brand.logo} alt={brand.name} fill className="object-contain" />
                </div>
                <span className="text-xs font-medium text-gray-500 group-hover:text-blue-600">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED LAPTOPS ── */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Featured
              </p>
              <h2 className="mt-1 text-3xl font-bold text-gray-900">
                Popular Laptops
              </h2>
            </div>
            <Link
              href="/laptops"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              View all →
            </Link>
          </div>

          {laptops.length === 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-80 animate-pulse rounded-2xl bg-gray-100" />
              ))}
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {laptops.map((laptop) => (
                <article
                  key={laptop.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="relative h-48 w-full bg-gray-50">
                    <Image
                      src={laptop.image}
                      alt={laptop.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                      {laptop.brand}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-gray-900">
                      {laptop.name}
                    </h3>

                    {/* Specs */}
                    <div className="mt-3 space-y-2">
                      {[
                        { label: "CPU", value: laptop.cpu },
                        { label: "GPU", value: laptop.gpu },
                        { label: "RAM", value: laptop.ram },
                        { label: "Storage", value: laptop.storage },
                      ].map((r) => r.value ? (
                        <div key={r.label} className="flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3 text-sm">
                          <span className="font-semibold text-blue-600">{r.label}</span>
                          <span className="font-medium text-gray-800">{r.value}</span>
                        </div>
                      ) : null)}
                    </div>

                    {/* Price */}
                    <p className="mt-4 text-2xl font-extrabold text-gray-900">
                      ${laptop.price.toLocaleString()}
                    </p>

                    {/* Actions */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleAddToCart(laptop)}
                        className={`rounded-xl py-2.5 text-sm font-semibold transition-colors ${
                          added === laptop.id
                            ? "bg-green-500 text-white"
                            : "border border-blue-600 text-blue-600 hover:bg-blue-50"
                        }`}
                      >
                        {added === laptop.id ? "✓ Added!" : "Add to Cart"}
                      </button>
                      <button
                        onClick={() => handleBuyNow(laptop)}
                        className="rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
