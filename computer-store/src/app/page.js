/* ============================================================
   page.js — Home Page
   This is the main landing page of the store at route "/"
   Sections: Hero Slider, Brands Bar, Popular Laptops
   ============================================================ */

"use client"; /* Marks this as a Client Component — needed for useState, useEffect */

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import ScrollReveal from "@/components/ScrollReveal";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@clerk/nextjs";

/* ── HERO SLIDES DATA ──
   Each slide has an image, badge text, title, subtitle, and a CTA button */
const heroSlides = [
  {
    image: "/images/banner/banner_2.png",
    badge: "New Arrivals",
    title: "Find the Perfect Laptop",
    subtitle: "Top picks for work, study, and gaming — all in one place.",
    cta: "Shop Now",
    href: "/laptops",
  },
  {
    image: "/images/banner/banner_6.png",
    badge: "ASUS ROG",
    title: "Dominate Every Game",
    subtitle: "Ultimate performance for serious gamers. Built to win.",
    cta: "Shop ROG",
    href: "/laptops",
  },
  {
    image: "/images/banner/banner_3.png",
    badge: "Top Deals",
    title: "Powerful Laptops, Great Prices",
    subtitle: "Explore our latest collection of high-performance laptops.",
    cta: "Browse Now",
    href: "/laptops",
  },
  {
    image: "/images/banner/banner_4.png",
    badge: "Gaming Series",
    title: "Level Up Your Game",
    subtitle: "Built for speed, power, and unstoppable performance.",
    cta: "Shop Gaming",
    href: "/laptops",
  },
  {
    image: "/images/banner/banner_5.png",
    badge: "Work & Study",
    title: "Laptops for Every Task",
    subtitle: "Productivity meets performance — find your perfect match.",
    cta: "View All",
    href: "/laptops",
  },
  
  {
    image: "/images/banner/banner_1.jpg",
    badge: "New Stock",
    title: "Fresh Arrivals In Store",
    subtitle: "The latest models from top brands, now available.",
    cta: "See What's New",
    href: "/laptops",
  },
];

/* ── BRANDS DATA ──
   Shown in the brands bar below the hero */
const brands = [
  { name: "ASUS", logo: "/images/laptops/asus/asus_6.png", href: "/laptops" },
  { name: "Dell", logo: "/images/laptops/dell/dell_2.png", href: "/laptops" },
  { name: "HP", logo: "/images/laptops/hp/hp_4.png", href: "/laptops" },
  { name: "Lenovo", logo: "/images/laptops/lenovo/lenovo_4.png", href: "/laptops" },
  { name: "MSI", logo: "/images/laptops/msi/msi_4.png", href: "/laptops" },
];

export default function HomePage() {
  /* ── STATE ── */
  const [slide, setSlide] = useState(0);        /* Current hero slide index */
  const [prevSlide, setPrevSlide] = useState(null); /* Previous slide for crossfade */
  const [animKey, setAnimKey] = useState(0);    /* Key to re-trigger text animation */
  const [laptops, setLaptops] = useState([]);   /* Featured laptops fetched from API */
  const [added, setAdded] = useState(null);     /* Tracks which laptop just got "Added!" */
  const [heroSearch, setHeroSearch] = useState(""); /* Search input value in hero */
  const [showAuthGuard, setShowAuthGuard] = useState(false);

  const { addToCart } = useCart();
  const router = useRouter();
  const { isSignedIn } = useAuth();

  /* ── HERO SEARCH ──
     When user submits the search, go to /laptops with ?q= in the URL */
  function handleHeroSearch(e) {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/laptops?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      router.push("/laptops");
    }
  }

  /* ── ADD TO CART — requires sign in ── */
  function handleAddToCart(laptop) {
    if (!isSignedIn) { setShowAuthGuard(true); return; }
    addToCart(laptop);
    setAdded(laptop.id);
    setTimeout(() => setAdded(null), 1500);
  }

  /* ── BUY NOW — requires sign in ── */
  function handleBuyNow(laptop) {
    if (!isSignedIn) { setShowAuthGuard(true); return; }
    addToCart(laptop);
    router.push("/cart");
  }

  /* ── AUTO SLIDE ──
     Automatically changes hero slide every 5 seconds with crossfade */
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

  /* ── FETCH LAPTOPS ──
     Loads first 6 laptops from the API for the Popular Laptops section */
  useEffect(() => {
    fetch("/api/laptops")
      .then((r) => r.json())
      .then((result) => {
        if (result.success) setLaptops(result.data.slice(0, 8));
      })
      .catch(() => {});
  }, []);

  const current = heroSlides[slide]; /* Current slide object */

  return (
    <main className="bg-white">
      {showAuthGuard && <AuthGuard onClose={() => setShowAuthGuard(false)} />}

      {/* ── HERO SLIDER ── */}
      <section className="relative h-[560px] overflow-hidden bg-gray-950">

        {/* Previous slide — fades out */}
        {prevSlide !== null && (
          <div key={`prev-${prevSlide}`} className="absolute inset-0 animate-hero-fade-out">
            <Image
              src={heroSlides[prevSlide].image}
              alt=""
              fill
              className="object-cover opacity-60"
            />
          </div>
        )}

        {/* Current slide — fades in */}
        <div key={`curr-${slide}`} className="absolute inset-0 animate-hero-fade-in">
          <Image
            src={heroSlides[slide].image}
            alt={heroSlides[slide].title}
            fill
            priority
            className="object-cover opacity-60"
          />
        </div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/30 to-transparent" />

        {/* Animated text content — re-mounts on slide change via key */}
        <div key={animKey} className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6 animate-hero-text">
          <span className="mb-3 inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white w-fit">
            {heroSlides[slide].badge}
          </span>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            {heroSlides[slide].title}
          </h1>
          <p className="mt-4 max-w-lg text-lg text-gray-300">{heroSlides[slide].subtitle}</p>

          {/* CTA Buttons */}
          <div className="mt-8 flex gap-4">
            <Link href={heroSlides[slide].href} className="rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white hover:bg-blue-700 transition-colors">
              {heroSlides[slide].cta}
            </Link>
            <Link href="/brands" className="rounded-lg border border-gray-400 px-7 py-3 font-semibold text-white hover:bg-white hover:text-gray-900 transition-colors">
              View Brands
            </Link>
          </div>

          {/* Hero Search Bar */}
          <form onSubmit={handleHeroSearch} className="mt-8 flex w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-lg">
            <input
              type="text"
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              placeholder="Search laptops, brands, specs..."
              className="flex-1 px-5 py-3.5 text-sm text-gray-800 outline-none"
            />
            <button type="submit" className="bg-blue-600 px-6 text-sm font-bold text-white hover:bg-blue-700 transition-colors">
              Search
            </button>
          </form>
        </div>

        {/* Slide Dots */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === slide ? "w-8 bg-blue-400" : "w-2 bg-gray-500 hover:bg-gray-300"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── BRANDS BAR ──
          Shows brand logos with grayscale → color hover effect */}
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

      {/* ── POPULAR LAPTOPS ──
          Shows first 6 laptops fetched from /api/laptops
          Each card has specs, price, Add to Cart, and Buy Now */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl">

          {/* Section Header */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">Featured</p>
              <h2 className="mt-1 text-3xl font-bold text-gray-900">Popular Laptops</h2>
            </div>
            <Link href="/laptops" className="text-sm font-semibold text-blue-600 hover:underline">
              View all →
            </Link>
          </div>

          {/* Skeleton loading — shown while data is being fetched */}
          {laptops.length === 0 ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-72 animate-pulse rounded-2xl bg-gray-100" />
              ))}
            </div>
          ) : (
            /* Laptop Cards Grid — 4 per row */
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {laptops.map((laptop, index) => (
                <ScrollReveal key={laptop.id} delay={(index % 4) + 1}>
                <article
                  className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Laptop Image — 10% smaller: h-52→h-48, w-52→w-48 */}
                  <div className="flex h-56 w-full items-center justify-center bg-white p-3">
                    <div className="relative h-44 w-44">
                      <Image src={laptop.image} alt={laptop.name} fill className="object-contain" />
                    </div>
                  </div>

                  {/* Laptop Info */}
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">{laptop.brand}</span>
                    <h3 className="mt-1 text-lg font-bold text-gray-900">{laptop.name}</h3>

                    {/* Spec Rows — each spec shown as a blue pill row */}
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
                    <p className="mt-4 text-2xl font-extrabold text-gray-900">${laptop.price.toLocaleString()}</p>

                    {/* Action Buttons */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {/* Add to Cart — turns green briefly when clicked */}
                      <button
                        onClick={() => handleAddToCart(laptop)}
                        className={`rounded-xl py-2.5 text-sm font-semibold transition-colors ${
                          added === laptop.id ? "bg-green-500 text-white" : "border border-blue-600 text-blue-600 hover:bg-blue-50"
                        }`}
                      >
                        {added === laptop.id ? "✓ Added!" : "Add to Cart"}
                      </button>
                      {/* Buy Now — adds to cart and goes straight to cart page */}
                      <button
                        onClick={() => handleBuyNow(laptop)}
                        className="rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </article>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
