"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

const RAM_OPTIONS = ["Any", "8GB", "16GB", "32GB"];
const CPU_OPTIONS = ["Any", "Intel", "AMD"];
const MAX_PRICE = 3500;
const BRANDS = ["All", "ASUS", "Lenovo", "MSI", "Dell", "HP", "Acer"];
const CATEGORIES = ["All", "Gaming", "Gaming & Office", "Office"];

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
  const [laptops, setLaptops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(null);

  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [brandFilter, setBrandFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [modelFilter, setModelFilter] = useState("Any");
  const [ramFilter, setRamFilter] = useState("Any");
  const [cpuFilter, setCpuFilter] = useState("Any");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

  const { addToCart } = useCart();
  const router = useRouter();

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

  function handleAddToCart(laptop) {
    addToCart(laptop);
    setAdded(laptop.id);
    setTimeout(() => setAdded(null), 1500);
  }

  function handleBuyNow(laptop) {
    addToCart(laptop);
    router.push("/cart");
  }

  function clearFilters() {
    setSearch("");
    setBrandFilter("All");
    setCategoryFilter("All");
    setModelFilter("Any");
    setRamFilter("Any");
    setCpuFilter("Any");
    setMaxPrice(MAX_PRICE);
  }

  // model options derived from current laptops
  const modelOptions = [{ id: "any", name: "Any" }, ...laptops.map((l) => ({ id: l.id, name: l.name }))];

  const filtered = laptops.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      l.name.toLowerCase().includes(q) ||
      l.brand.toLowerCase().includes(q) ||
      l.cpu?.toLowerCase().includes(q) ||
      l.gpu?.toLowerCase().includes(q);
    const matchBrand = brandFilter === "All" || l.brand === brandFilter;
    const matchModel = modelFilter === "Any" || l.name === modelFilter;
    const matchRam = ramFilter === "Any" || l.ram?.includes(ramFilter);
    const matchCpu = cpuFilter === "Any" || l.cpu?.toLowerCase().includes(cpuFilter.toLowerCase());
    const matchPrice = l.price <= maxPrice;
    const matchCat =
      categoryFilter === "All" ? true :
      l.category === categoryFilter;
    return matchSearch && matchBrand && matchModel && matchRam && matchCpu && matchPrice && matchCat;
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-7xl flex gap-8">
          <div className="hidden w-60 shrink-0 lg:block"><div className="h-96 animate-pulse rounded-2xl bg-gray-200" /></div>
          <div className="flex-1 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1,2,3,4,5].map(n => <div key={n} className="h-80 animate-pulse rounded-2xl bg-gray-200" />)}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-4xl font-bold text-gray-900">Laptops</h1>
        <p className="mt-2 text-gray-500">{filtered.length} of {laptops.length} laptops</p>

        {/* Search + Category pills */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full max-w-sm">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search laptops..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">✕</button>
            )}
          </div>

          {/* Category pills */}
          <PillGroup options={CATEGORIES} value={categoryFilter} onChange={setCategoryFilter} />
        </div>

        <div className="mt-8 flex gap-8">

          {/* ── SIDEBAR ── */}
          <aside className="hidden w-60 shrink-0 lg:block">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">

              {/* Brand */}
              <RadioGroup label="Brand" options={BRANDS} value={brandFilter} onChange={setBrandFilter} />

              <hr className="border-gray-100" />

              {/* Model */}
              <div>
                <p className="text-sm font-bold text-gray-900">Model</p>
                <div className="mt-3 space-y-2.5">
                  {modelOptions.map((opt) => (
                    <label key={opt.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-600 hover:text-gray-900">
                      <input type="radio" name="model" value={opt.name} checked={modelFilter === opt.name} onChange={() => setModelFilter(opt.name)} className="accent-blue-600 h-4 w-4" />
                      <span className="truncate">{opt.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Max Price */}
              <div>
                <p className="text-sm font-bold text-gray-900">
                  Max Price: <span className="text-blue-600">${maxPrice.toLocaleString()}</span>
                </p>
                <input type="range" min={0} max={MAX_PRICE} step={50} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="mt-3 w-full accent-blue-600" />
                <div className="mt-1 flex justify-between text-xs text-gray-400">
                  <span>$0</span><span>${MAX_PRICE.toLocaleString()}</span>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* RAM */}
              <RadioGroup label="RAM" options={RAM_OPTIONS} value={ramFilter} onChange={setRamFilter} />

              <hr className="border-gray-100" />

              {/* CPU */}
              <RadioGroup label="CPU" options={CPU_OPTIONS} value={cpuFilter} onChange={setCpuFilter} />

              <hr className="border-gray-100" />

              <button onClick={clearFilters} className="w-full rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">
                Clear Filters
              </button>
            </div>
          </aside>

          {/* ── GRID ── */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="mt-10 text-center">
                <p className="text-4xl">🔍</p>
                <p className="mt-3 text-lg font-semibold text-gray-700">No laptops found</p>
                <button onClick={clearFilters} className="mt-4 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Clear Filters</button>
              </div>
            ) : (
              <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((laptop) => (
                  <article key={laptop.id} className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-48 w-full bg-gray-50">
                      <Image src={laptop.image} alt={laptop.name} fill className="object-contain p-4" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">{laptop.brand}</span>
                      <h2 className="mt-1 text-lg font-bold text-gray-900">{laptop.name}</h2>
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
                      <p className="mt-4 text-2xl font-extrabold text-gray-900">${laptop.price.toLocaleString()}</p>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleAddToCart(laptop)}
                          className={`rounded-xl py-2.5 text-sm font-semibold transition-colors ${added === laptop.id ? "bg-green-500 text-white" : "border border-blue-600 text-blue-600 hover:bg-blue-50"}`}
                        >
                          {added === laptop.id ? "✓ Added!" : "Add to Cart"}
                        </button>
                        <button onClick={() => handleBuyNow(laptop)} className="rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
