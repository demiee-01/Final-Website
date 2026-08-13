/* ============================================================
   laptops/page.js — Laptops Listing Page
   Route: /laptops
   Features:
   - Search bar (also reads ?q= from URL sent by home page)
   - Category pills: All, Gaming, Gaming & Office, Office
   - Sidebar filters: Brand, Model, Max Price, RAM, CPU
   - Laptop cards grid with Add to Cart + Buy Now
   ============================================================ */

"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import ScrollReveal from "@/components/ScrollReveal";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@clerk/nextjs";
import SpecSheet from "@/components/SpecSheet";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

/* Filter option constants */
const RAM_OPTIONS = ["Any", "8GB", "16GB", "32GB"];
const CPU_OPTIONS = ["Any", "Intel", "AMD"];
const MAX_PRICE = 3500;
const BRANDS = ["All", "ASUS", "Lenovo", "MSI", "Dell", "HP", "Acer"];
const CATEGORIES = ["All", "Gaming", "Gaming & Office", "Office"];

/* RadioGroup — reusable radio button list for sidebar */
function RadioGroup({ label, options, value, onChange }) {
  return (
    <div>
      <p className="text-sm font-bold text-gray-900">{label}</p>
      <div className="mt-3 space-y-2.5">
        {options.map((opt) => (
          <label key={opt} className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-600 hover:text-gray-900">
            <input type="radio" name={label} value={opt} checked={value === opt} onChange={() => onChange(opt)} className="accent-blue-600 h-4 w-4" />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}

/* PillGroup — reusable pill buttons shown above the grid */
function PillGroup({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors border ${
            value === opt
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function LaptopsPage() {
  /* State */
  const [laptops, setLaptops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(null);
  const [showAuthGuard, setShowAuthGuard] = useState(false);

  /* Filter state — reads ?q= from URL for search */
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [modelFilter, setModelFilter] = useState("Any");
  const [ramFilter, setRamFilter] = useState("Any");
  const [cpuFilter, setCpuFilter] = useState("Any");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

  // Initialize from URL params
  useEffect(() => {
    if (searchParams) {
      const q = searchParams.get("q");
      const brand = searchParams.get("brand");
      if (q) setSearch(q);
      if (brand) setBrandFilter(brand);
    }
  }, [searchParams]);

  const { addToCart } = useCart();
  const router = useRouter();
  const { isSignedIn } = useAuth();

  /* Fetch all laptops from API on page load */
  useEffect(() => {
    async function fetchLaptops() {
      try {
        const response = await fetch("/api/laptops");
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to fetch laptops.");
        setLaptops(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLaptops();
  }, []);

  /* Add to cart — requires auth */
  function handleAddToCart(laptop) {
    if (!isSignedIn) { setShowAuthGuard(true); return; }
    addToCart(laptop);
    setAdded(laptop.id);
    setTimeout(() => setAdded(null), 1500);
  }

  /* Buy now — requires auth, redirects to cart */
  function handleBuyNow(laptop) {
    if (!isSignedIn) { setShowAuthGuard(true); return; }
    addToCart(laptop);
    router.push("/cart");
  }

  /* Reset all filters to default */
  function clearFilters() {
    setSearch("");
    setBrandFilter("All");
    setCategoryFilter("All");
    setModelFilter("Any");
    setRamFilter("Any");
    setCpuFilter("Any");
    setMaxPrice(MAX_PRICE);
  }

  /* Model options built from fetched laptops — uses id as key to avoid duplicates */
  const modelOptions = [{ id: "any", name: "Any" }, ...laptops.map((l) => ({ id: l.id, name: l.name }))];

  /* Apply all filters together */
  const filtered = laptops.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch = !q || l.name.toLowerCase().includes(q) || l.brand.toLowerCase().includes(q) || l.cpu?.toLowerCase().includes(q) || l.gpu?.toLowerCase().includes(q);
    const matchBrand = brandFilter === "All" || l.brand === brandFilter;
    const matchModel = modelFilter === "Any" || l.name === modelFilter;
    const matchRam = ramFilter === "Any" || l.ram?.includes(ramFilter);
    const matchCpu = cpuFilter === "Any" || l.cpu?.toLowerCase().includes(cpuFilter.toLowerCase());
    const matchPrice = l.price <= maxPrice;
    const matchCat = categoryFilter === "All" ? true : l.category === categoryFilter;
    return matchSearch && matchBrand && matchModel && matchRam && matchCpu && matchPrice && matchCat;
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 sm:px-6 py-10">
        <div className="mx-auto max-w-7xl flex gap-8">
          <div className="hidden w-60 shrink-0 lg:block"><div className="h-96 animate-pulse rounded-2xl bg-gray-200" /></div>
          <div className="flex-1 grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-3">
            {[1,2,3,4,5].map(n => <div key={n} className="h-64 sm:h-80 animate-pulse rounded-2xl bg-gray-200" />)}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 sm:px-6 py-10">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 sm:px-6 py-10">
      {showAuthGuard && <AuthGuard onClose={() => setShowAuthGuard(false)} />}
      <div className="mx-auto max-w-[1600px]">
        <h1 className="text-4xl font-bold text-gray-900">Laptops</h1>
        <p className="mt-2 text-gray-500">{filtered.length} of {laptops.length} laptops</p>

        {/* Search + Category Pills */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search input */}
          <div className="relative w-full max-w-sm">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search laptops..." className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" />
            {search && <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">✕</button>}
          </div>
          {/* Category pills */}
          <PillGroup options={CATEGORIES} value={categoryFilter} onChange={setCategoryFilter} />
        </div>

        <div className="mt-8 flex gap-5">

          {/* Sidebar — hidden on mobile */}
          <aside className="hidden w-52 shrink-0 lg:block">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-5">
              {/* Brand */}
              <RadioGroup label="Brand" options={BRANDS} value={brandFilter} onChange={setBrandFilter} />
              <hr className="border-gray-100" />
              {/* Max Price slider */}
              <div>
                <p className="text-sm font-bold text-gray-900">Max Price: <span className="text-blue-600">${maxPrice.toLocaleString()}</span></p>
                <input type="range" min={0} max={MAX_PRICE} step={50} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="mt-3 w-full accent-blue-600" />
                <div className="mt-1 flex justify-between text-xs text-gray-400"><span>$0</span><span>${MAX_PRICE.toLocaleString()}</span></div>
              </div>
              <hr className="border-gray-100" />
              {/* RAM */}
              <RadioGroup label="RAM" options={RAM_OPTIONS} value={ramFilter} onChange={setRamFilter} />
              <hr className="border-gray-100" />
              {/* CPU */}
              <RadioGroup label="CPU" options={CPU_OPTIONS} value={cpuFilter} onChange={setCpuFilter} />
              <hr className="border-gray-100" />
              {/* Clear all filters */}
              <button onClick={clearFilters} className="w-full rounded-xl border border-gray-200 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">Clear Filters</button>
            </div>
          </aside>

          {/* Laptops Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="mt-10 text-center">
                <p className="text-4xl">🔍</p>
                <p className="mt-3 text-lg font-semibold text-gray-700">No laptops found</p>
                <button onClick={clearFilters} className="mt-4 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Clear Filters</button>
              </div>
            ) : (
              <section className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filtered.map((laptop, index) => (
                  <ScrollReveal key={laptop.id} delay={(index % 3) + 1}>
                  <article className="flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                    {/* Image */}
                    <div className="flex h-32 sm:h-64 w-full items-center justify-center bg-white p-2 sm:p-4">
                      <img 
                        src={laptop.image} 
                        alt={laptop.name} 
                        className="h-24 sm:h-52 w-24 sm:w-52 object-contain"
                      />
                    </div>
                    {/* Info */}
                    <div className="flex flex-1 flex-col p-2 sm:p-5">
                      <span className="text-[9px] sm:text-xs font-semibold uppercase tracking-wide text-blue-600">{laptop.brand}</span>
                      <h2 className="mt-1 text-xs sm:text-lg font-bold text-gray-900 line-clamp-2 min-h-[2rem] sm:min-h-[3rem]">{laptop.name}</h2>
                      {/* Spec Sheet */}
                      <SpecSheet laptop={laptop} className="mt-2 sm:mt-3" />
                      {/* Price */}
                      <p className="mt-2 sm:mt-4 text-base sm:text-2xl font-extrabold text-gray-900">${laptop.price.toLocaleString()}</p>
                      {/* Buttons */}
                      <div className="mt-2 sm:mt-4 grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3">
                        <button onClick={() => handleAddToCart(laptop)} className={`rounded-lg sm:rounded-xl py-2 sm:py-2.5 text-[10px] sm:text-xs md:text-sm font-semibold transition-colors ${added === laptop.id ? "bg-green-500 text-white" : "border border-blue-600 text-blue-600 hover:bg-blue-50"}`}>
                          {added === laptop.id ? "✓ Added!" : "Add to Cart"}
                        </button>
                        <button onClick={() => handleBuyNow(laptop)} className="rounded-lg sm:rounded-xl bg-blue-600 py-2 sm:py-2.5 text-[10px] sm:text-xs md:text-sm font-semibold text-white hover:bg-blue-700 transition-colors">Buy Now</button>
                      </div>
                    </div>
                  </article>
                  </ScrollReveal>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
