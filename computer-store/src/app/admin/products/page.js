"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminProductsPage() {
  const [laptops, setLaptops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  // confirm modal state
  const [confirmTarget, setConfirmTarget] = useState(null);

  useEffect(() => {
    fetchLaptops();
  }, []);

  async function fetchLaptops() {
    try {
      setError("");
      const response = await fetch("/api/laptops", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to load laptops.");
      setLaptops(result.data || []);
    } catch (err) {
      console.error("Error fetching laptops:", err);
      setError(err.message || "Failed to load laptops. Please try again later.");
      setLaptops([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    const laptop = confirmTarget;
    setConfirmTarget(null);
    try {
      setError("");
      setDeletingId(laptop.id);
      const response = await fetch(`/api/laptops/${laptop.id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to delete laptop.");
      setLaptops((prev) => prev.filter((item) => item.id !== laptop.id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1,2,3].map(n => <div key={n} className="h-16 animate-pulse rounded-xl bg-gray-200" />)}
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen">
        {/* Header with View all link */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Product List</h1>
          <Link
            href="/admin/products/new"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View all →
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        )}

        {laptops.length === 0 ? (
          <div className="mt-12 rounded-2xl bg-white p-16 text-center shadow-xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900">No products yet</h3>
            <p className="mt-2 text-gray-600">Get started by adding your first laptop</p>
            <Link 
              href="/admin/products/new" 
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add your first laptop
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Image</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Brand</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">CPU</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">GPU</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">RAM</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Storage</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Price</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {laptops.map((laptop) => (
                    <tr key={laptop.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="h-12 w-16 overflow-hidden rounded-lg bg-gray-50 p-1 flex items-center justify-center">
                          <img src={laptop.image} alt={laptop.name} className="h-full w-full object-contain" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{laptop.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block text-sm font-medium text-blue-600">{laptop.brand}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{laptop.cpu || "—"}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{laptop.gpu || "—"}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{laptop.ram || "—"}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{laptop.storage || "—"}</td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900">${laptop.price.toLocaleString()}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Link
                            href={`/admin/products/${laptop.id}/edit`}
                            className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => setConfirmTarget(laptop)}
                            disabled={deletingId === laptop.id}
                            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
                          >
                            {deletingId === laptop.id ? "..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {confirmTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md transform rounded-2xl bg-white p-8 shadow-2xl transition-all">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Delete Laptop?</h2>
            <p className="mt-3 text-center text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">{confirmTarget.name}</span>?
              This action cannot be undone.
            </p>
            <div className="mt-8 flex gap-3">
              <button 
                onClick={() => setConfirmTarget(null)} 
                className="flex-1 rounded-xl border-2 border-gray-200 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete} 
                className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700 shadow-lg shadow-red-600/30 transition-all"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
