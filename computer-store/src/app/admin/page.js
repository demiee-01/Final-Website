"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [laptops, setLaptops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => { fetchLaptops(); }, []);

  async function fetchLaptops() {
    try {
      const res = await fetch("/api/laptops");
      const data = await res.json();
      if (data.success) setLaptops(data.data);
    } catch {}
    finally { setIsLoading(false); }
  }

  async function handleDelete() {
    const laptop = confirmTarget;
    setConfirmTarget(null);
    setDeletingId(laptop.id);
    try {
      await fetch(`/api/laptops/${laptop.id}`, { method: "DELETE" });
      setLaptops((prev) => prev.filter((l) => l.id !== laptop.id));
    } catch {}
    finally { setDeletingId(null); }
  }

  const totalValue = laptops.reduce((s, l) => s + l.price, 0);
  const brands = [...new Set(laptops.map((l) => l.brand))];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Good day, Admin 👋</h1>
          <p className="mt-1 text-sm text-gray-500">Here's what's happening in your store.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
        >
          + Add Laptop
        </Link>
      </div>

      {/* Stats cards */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Products</p>
          <p className="mt-2 text-4xl font-extrabold text-gray-900">{laptops.length}</p>
          <p className="mt-1 text-xs text-gray-400">Laptops in store</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Brands</p>
          <p className="mt-2 text-4xl font-extrabold text-gray-900">{brands.length}</p>
          <p className="mt-1 text-xs text-gray-400">{brands.join(", ") || "—"}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Inventory Value</p>
          <p className="mt-2 text-4xl font-extrabold text-gray-900">${totalValue.toLocaleString()}</p>
          <p className="mt-1 text-xs text-gray-400">Combined price total</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Store Status</p>
          <p className="mt-2 text-xl font-extrabold text-green-600">● Live</p>
          <p className="mt-1 text-xs text-gray-400">Store is running</p>
        </div>
      </div>

      {/* Product list */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Product List</h2>
          <Link href="/admin/products" className="text-sm font-semibold text-blue-600 hover:underline">
            View all →
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
          {isLoading ? (
            <div className="space-y-3 p-6">
              {[1,2,3].map(n => <div key={n} className="h-12 animate-pulse rounded-xl bg-gray-100" />)}
            </div>
          ) : laptops.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-4xl">📦</p>
              <p className="mt-3 font-semibold text-gray-600">No products yet</p>
              <Link href="/admin/products/new" className="mt-3 inline-block rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                Add first laptop
              </Link>
            </div>
          ) : (
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <th className="px-5 py-4">Image</th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Brand</th>
                  <th className="px-5 py-4">CPU</th>
                  <th className="px-5 py-4">GPU</th>
                  <th className="px-5 py-4">RAM</th>
                  <th className="px-5 py-4">Storage</th>
                  <th className="px-5 py-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {laptops.map((laptop) => (
                  <tr key={laptop.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="h-12 w-16 rounded-lg bg-gray-100 flex items-center justify-center p-1">
                        <img src={laptop.image} alt={laptop.name} className="w-full h-full object-contain" />
                      </div>
                    </td>
                    <td className="px-5 py-3 font-semibold text-gray-900">{laptop.name}</td>
                    <td className="px-5 py-3">
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">{laptop.brand}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-500">{laptop.cpu || "—"}</td>
                    <td className="px-5 py-3 text-gray-500">{laptop.gpu || "—"}</td>
                    <td className="px-5 py-3 text-gray-500">{laptop.ram || "—"}</td>
                    <td className="px-5 py-3 text-gray-500">{laptop.storage || "—"}</td>
                    <td className="px-5 py-3 font-bold text-gray-900">${laptop.price.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Delete confirm modal */}
      {confirmTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
            <p className="text-2xl">🗑️</p>
            <h2 className="mt-3 text-xl font-bold text-gray-900">Confirm Delete</h2>
            <p className="mt-2 text-gray-600">
              Delete <span className="font-semibold text-gray-900">{confirmTarget.name}</span>? This cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setConfirmTarget(null)} className="flex-1 rounded-xl border border-gray-200 py-3 font-semibold text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleDelete} className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
