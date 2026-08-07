"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

function CartCard({ item, selected, onToggle, updateQty, removeFromCart }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      onClick={onToggle}
      className={`flex cursor-pointer gap-5 rounded-2xl border bg-white p-5 shadow-sm transition-all ${
        selected ? "border-blue-400 ring-2 ring-blue-100" : "border-gray-100 hover:shadow-md"
      }`}>

      {/* Checkbox */}
      <div className="flex shrink-0 items-start pt-1">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="h-5 w-5 accent-blue-600 cursor-pointer rounded"
        />
      </div>

      {/* Image */}
      <div className="relative h-36 w-36 shrink-0 rounded-xl bg-gray-50 border border-gray-100">
        <Image src={item.image} alt={item.name} fill className="object-contain p-3" />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">{item.brand}</span>
          <h2 className="mt-0.5 text-lg font-bold text-gray-900">{item.name}</h2>

          {/* 4 spec rows */}
          <div className="mt-3 space-y-1.5">
            {[
              { label: "CPU", value: item.cpu },
              { label: "GPU", value: item.gpu },
              { label: "RAM", value: item.ram },
              { label: "Storage", value: item.storage },
            ].map((r) => r.value ? (
              <div key={r.label} className="flex items-center justify-between rounded-xl bg-blue-50 px-4 py-2.5 text-sm">
                <span className="font-semibold text-blue-600">{r.label}</span>
                <span className="font-medium text-gray-800">{r.value}</span>
              </div>
            ) : null)}
          </div>

          {/* More details toggle */}
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
            className="mt-2 w-fit text-xs font-semibold text-blue-600 hover:underline"
          >
            {expanded ? "▲ Hide details" : "▼ More details"}
          </button>

          {expanded && (
            <div className="mt-2 space-y-1.5">
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
        </div>

        {/* Price + controls */}
        <div className="mt-4 flex items-center justify-between gap-3" onClick={(e) => e.stopPropagation()}>
          <p className="text-2xl font-extrabold text-gray-900">
            ${(item.price * item.qty).toLocaleString()}
            {item.qty > 1 && (
              <span className="ml-2 text-sm font-normal text-gray-400">(${item.price.toLocaleString()} × {item.qty})</span>
            )}
          </p>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50">
              <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-3 py-2 text-lg font-bold text-gray-600 hover:text-gray-900">−</button>
              <span className="w-8 text-center text-sm font-semibold text-gray-900">{item.qty}</span>
              <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-3 py-2 text-lg font-bold text-gray-600 hover:text-gray-900">+</button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function AddLaptopCard({ laptop }) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  function handleAdd() {
    addToCart(laptop);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleBuyNow() {
    addToCart(laptop);
    router.push("/cart");
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full bg-gray-50">
        <Image src={laptop.image} alt={laptop.name} fill className="object-contain p-4" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">{laptop.brand}</span>
        <h2 className="mt-1 text-lg font-bold text-gray-900">{laptop.name}</h2>

        <div className="mt-3 space-y-1.5">
          {[
            { label: "CPU", value: laptop.cpu },
            { label: "GPU", value: laptop.gpu },
            { label: "RAM", value: laptop.ram },
            { label: "Storage", value: laptop.storage },
          ].map((r) => r.value ? (
            <div key={r.label} className="flex items-center justify-between rounded-xl bg-blue-50 px-4 py-2.5 text-sm">
              <span className="font-semibold text-blue-600">{r.label}</span>
              <span className="font-medium text-gray-800">{r.value}</span>
            </div>
          ) : null)}
        </div>

        <p className="mt-4 text-2xl font-extrabold text-gray-900">${laptop.price.toLocaleString()}</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={handleAdd}
            className={`rounded-xl py-2.5 text-sm font-semibold transition-colors ${
              added ? "bg-green-500 text-white" : "border border-blue-600 text-blue-600 hover:bg-blue-50"
            }`}
          >
            {added ? "✓ Added!" : "Add to Cart"}
          </button>
          <button
            onClick={handleBuyNow}
            className="rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}

export default function CartPage() {
  const { cartItems, removeFromCart, updateQty } = useCart();
  const [allLaptops, setAllLaptops] = useState([]);

  // all selected by default on first load only
  const [selected, setSelected] = useState(() => new Set(cartItems.map((i) => i.id)));

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
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="mt-2 text-gray-500">
          {cartItems.length} item{cartItems.length > 1 ? "s" : ""} in your cart
        </p>

        {cartItems.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-6xl">🛒</p>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">Pick something from the list below.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">

            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">

              {/* Select all */}
              <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-gray-100 bg-white px-5 py-3 shadow-sm text-sm font-semibold text-gray-700">
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
            <div className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
              <p className="mt-1 text-xs text-gray-400">{selected.size} of {cartItems.length} items selected</p>

              <div className="mt-4 space-y-3 text-sm text-gray-600">
                {selectedItems.length === 0 ? (
                  <p className="text-gray-400 text-xs">No items selected.</p>
                ) : selectedItems.map((item) => (
                  <div key={item.id} className="flex justify-between gap-2">
                    <span className="truncate">{item.name} × {item.qty}</span>
                    <span className="font-medium text-gray-800 shrink-0">${(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span className="text-xl">${selectedTotal.toLocaleString()}</span>
              </div>

              <Link
                href="/checkout"
                className={`mt-6 block w-full rounded-xl py-3 text-center font-bold text-white transition-colors ${
                  selectedItems.length > 0
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 pointer-events-none"
                }`}
              >
                Checkout ({selected.size})
              </Link>

              <Link href="/laptops" className="mt-3 block w-full rounded-xl border border-gray-200 py-3 text-center text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}

        {/* You may also like */}
        {suggestions.length > 0 && (
          <section className="mt-16">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">Add More</p>
                <h2 className="mt-1 text-3xl font-bold text-gray-900">You may also like</h2>
              </div>
              <Link href="/laptops" className="text-sm font-semibold text-blue-600 hover:underline">View all →</Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
