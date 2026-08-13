"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@clerk/nextjs";
import SpecSheet from "@/components/SpecSheet";

function CartCard({ item, selected, onToggle, updateQty, removeFromCart }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={`flex flex-col rounded-2xl border bg-white p-4 shadow-sm transition-all ${
        selected ? "border-blue-400 ring-2 ring-blue-100" : "border-gray-100 hover:shadow-md"
      }`}>

      {/* Top Row: Checkbox + Image + Basic Info */}
      <div className="flex gap-3" onClick={onToggle}>
        {/* Checkbox */}
        <div className="flex shrink-0 items-start pt-1">
          <input
            type="checkbox"
            checked={selected}
            onChange={onToggle}
            onClick={(e) => e.stopPropagation()}
            className="h-5 w-5 accent-blue-600 cursor-pointer rounded"
          />
        </div>

        {/* Image - smaller on mobile */}
        <div className="h-24 w-24 sm:h-32 sm:w-32 shrink-0 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-2">
          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col justify-between min-w-0">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">{item.brand}</span>
            <h2 className="mt-0.5 text-sm sm:text-base font-bold text-gray-900 line-clamp-2">{item.name}</h2>
            <p className="mt-2 text-xl sm:text-2xl font-extrabold text-gray-900">${(item.price * item.qty).toLocaleString()}</p>
            {item.qty > 1 && (
              <p className="text-xs text-gray-400">${item.price.toLocaleString()} × {item.qty}</p>
            )}
          </div>
        </div>
      </div>

      {/* Spec Sheet */}
      <div className="mt-3 pl-11">
        <SpecSheet laptop={item} className="" />
      </div>

      {/* More details toggle */}
      <button
        onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
        className="mt-3 ml-11 w-fit text-xs font-semibold text-blue-600 hover:underline"
      >
        {expanded ? "▲ Hide details" : "▼ More details"}
      </button>

      {expanded && (
        <div className="mt-3 ml-11 space-y-1.5">
          {[
            { label: "Unit Price", value: `$${item.price.toLocaleString()}` },
            { label: "Quantity", value: String(item.qty) },
            { label: "Subtotal", value: `$${(item.price * item.qty).toLocaleString()}` },
          ].map((r) => (
            <div key={r.label} className="flex items-center justify-between rounded-xl bg-blue-50 px-4 py-2.5 text-sm">
              <span className="font-semibold text-blue-600">{r.label}</span>
              <span className="font-medium text-gray-800">{r.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Controls - Full width on mobile */}
      <div className="mt-4 ml-11 flex flex-col sm:flex-row gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 w-full sm:w-auto justify-center">
          <button
            onClick={() => updateQty(item.id, item.qty - 1)}
            className="px-4 py-2.5 text-lg font-bold text-gray-600 hover:text-gray-900"
          >
            −
          </button>
          <span className="w-12 text-center text-sm font-semibold text-gray-900">{item.qty}</span>
          <button
            onClick={() => updateQty(item.id, item.qty + 1)}
            className="px-4 py-2.5 text-lg font-bold text-gray-600 hover:text-gray-900"
          >
            +
          </button>
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors w-full sm:w-auto"
        >
          Remove
        </button>
      </div>
    </article>
  );
}

function AddLaptopCard({ laptop }) {
  const [added, setAdded] = useState(false);
  const [showAuthGuard, setShowAuthGuard] = useState(false);
  const { addToCart } = useCart();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  function handleAdd() {
    if (!isSignedIn) { setShowAuthGuard(true); return; }
    addToCart(laptop);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    
    // Scroll to order summary on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        const orderSummary = document.getElementById('order-summary');
        if (orderSummary) {
          orderSummary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
  }

  function handleBuyNow() {
    if (!isSignedIn) { setShowAuthGuard(true); return; }
    addToCart(laptop);
    
    // Scroll to order summary on mobile before redirect
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      const orderSummary = document.getElementById('order-summary');
      if (orderSummary) {
        orderSummary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      setTimeout(() => router.push("/cart"), 500);
    } else {
      router.push("/cart");
    }
  }

  return (
    <>
      {showAuthGuard && <AuthGuard onClose={() => setShowAuthGuard(false)} />}
      <article className="flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex h-32 sm:h-64 w-full items-center justify-center bg-white p-2 sm:p-4">
        <img 
          src={laptop.image} 
          alt={laptop.name} 
          className="h-24 sm:h-52 w-24 sm:w-52 object-contain"
        />
      </div>
      <div className="flex flex-1 flex-col p-2 sm:p-5">
        <span className="text-[9px] sm:text-xs font-semibold uppercase tracking-wide text-blue-600">{laptop.brand}</span>
        <h2 className="mt-1 text-xs sm:text-lg font-bold text-gray-900 line-clamp-2 min-h-[2rem] sm:min-h-[3rem]">{laptop.name}</h2>

        <SpecSheet laptop={laptop} className="mt-2 sm:mt-3" />

        <p className="mt-2 sm:mt-4 text-base sm:text-2xl font-extrabold text-gray-900">${laptop.price.toLocaleString()}</p>

        <div className="mt-2 sm:mt-4 grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3">
          <button
            onClick={handleAdd}
            className={`rounded-lg sm:rounded-xl py-2 sm:py-2.5 text-[10px] sm:text-xs md:text-sm font-semibold transition-colors ${
              added ? "bg-green-500 text-white" : "border border-blue-600 text-blue-600 hover:bg-blue-50"
            }`}
          >
            {added ? "✓ Added!" : "Add to Cart"}
          </button>
          <button
            onClick={handleBuyNow}
            className="rounded-lg sm:rounded-xl bg-blue-600 py-2 sm:py-2.5 text-[10px] sm:text-xs md:text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
    </>
  );
}

export default function CartPage() {
  const { cartItems, removeFromCart, updateQty } = useCart();
  const [allLaptops, setAllLaptops] = useState([]);

  // all selected by default on first load only
  const [selected, setSelected] = useState(() => new Set(cartItems.map((i) => i.id)));

  // Scroll to order summary on mobile when cart changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      const timer = setTimeout(() => {
        const orderSummary = document.getElementById('order-summary');
        if (orderSummary && cartItems.length > 0) {
          orderSummary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [cartItems.length]);

  useEffect(() => {
    fetch("/api/laptops")
      .then((r) => r.json())
      .then((res) => { if (res.success) setAllLaptops(res.data); })
      .catch(() => {});
  }, []);

  function toggleItem(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (selected.size === cartItems.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(cartItems.map((i) => i.id)));
    }
  }

  const selectedItems = cartItems.filter((i) => selected.has(i.id));
  const selectedTotal = selectedItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const cartIds = new Set(cartItems.map((i) => i.id));
  const suggestions = allLaptops.filter((l) => !cartIds.has(l.id));

  return (
    <main className="min-h-screen bg-gray-50 px-4 sm:px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="mt-2 text-gray-500">
          {cartItems.length} item{cartItems.length > 1 ? "s" : ""} in your cart
        </p>

        {cartItems.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-6xl">🛒</p>
            <h2 className="mt-4 text-xl sm:text-2xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500">Pick something from the list below.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">

            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">

              {/* Select all */}
              <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-gray-100 bg-white px-4 sm:px-5 py-3 shadow-sm text-xs sm:text-sm font-semibold text-gray-700">
                <input
                  type="checkbox"
                  checked={selected.size === cartItems.length}
                  onChange={toggleAll}
                  className="h-5 w-5 accent-blue-600 cursor-pointer"
                />
                Select all ({cartItems.length} items)
              </label>

              {cartItems.map((item) => (
                <CartCard
                  key={item.id}
                  item={item}
                  selected={selected.has(item.id)}
                  onToggle={() => toggleItem(item.id)}
                  updateQty={updateQty}
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>

            {/* Order summary */}
            <div id="order-summary" className="h-fit rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-sm lg:sticky lg:top-24">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Order Summary</h2>
              <p className="mt-1 text-xs text-gray-400">{selected.size} of {cartItems.length} items selected</p>

              <div className="mt-4 max-h-48 overflow-y-auto space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
                {selectedItems.length === 0 ? (
                  <p className="text-gray-400 text-xs">No items selected.</p>
                ) : selectedItems.map((item) => (
                  <div key={item.id} className="flex justify-between gap-2">
                    <span className="truncate text-xs sm:text-sm">{item.name} × {item.qty}</span>
                    <span className="font-medium text-gray-800 shrink-0 text-xs sm:text-sm">${(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-900">
                <span className="text-sm sm:text-base">Total</span>
                <span className="text-lg sm:text-xl">${selectedTotal.toLocaleString()}</span>
              </div>

              <Link
                href="/checkout"
                className={`mt-6 block w-full rounded-xl py-3 text-center text-sm sm:text-base font-bold text-white transition-colors ${
                  selectedItems.length > 0
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 pointer-events-none"
                }`}
              >
                Checkout ({selected.size})
              </Link>

              <Link href="/laptops" className="mt-3 block w-full rounded-xl border border-gray-200 py-3 text-center text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}

        {/* You may also like */}
        {suggestions.length > 0 && (
          <section className="mt-12 sm:mt-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-0">
              <div>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-blue-600">Add More</p>
                <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900">You may also like</h2>
              </div>
              <Link href="/laptops" className="text-sm font-semibold text-blue-600 hover:underline">View all →</Link>
            </div>
            <div className="mt-8 grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-3">
              {suggestions.map((laptop) => (
                <AddLaptopCard key={laptop.id} laptop={laptop} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
