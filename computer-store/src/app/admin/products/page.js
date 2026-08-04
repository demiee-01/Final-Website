"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AdminProductsPage() {
  const [laptops, setLaptops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    async function fetchLaptops() {
      try {
        setError("");

        const response = await fetch("/api/laptops");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load laptops.");
        }

        setLaptops(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLaptops();
  }, []);

  async function handleDelete(laptop) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${laptop.name}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setDeletingId(laptop.id);

      const response = await fetch(`/api/laptops/${laptop.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete laptop.");
      }

      setLaptops((currentLaptops) =>
        currentLaptops.filter((item) => item.id !== laptop.id),
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setDeletingId(null);
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen p-10">
        <p>Loading products...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Product Management
            </h1>

            <p className="mt-2 text-gray-600">
              Manage laptop products in your store.
            </p>
          </div>

          <Link
            href="/admin/products/new"
            className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            Add Laptop
          </Link>
        </div>

        {error && (
          <p className="mt-6 rounded-lg bg-red-100 p-3 text-red-700">{error}</p>
        )}

        {laptops.length === 0 ? (
          <div className="mt-8 rounded-xl bg-white p-10 text-center shadow-sm">
            <p className="text-gray-600">No laptop products found.</p>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-xl bg-white shadow-sm">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Image</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Brand</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">RAM</th>
                  <th className="p-4 text-left">Storage</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {laptops.map((laptop) => (
                  <tr key={laptop.id} className="border-t">
                    <td className="p-4">
                      <div className="relative h-16 w-20 rounded bg-gray-100">
                        <Image
                          src={laptop.image}
                          alt={laptop.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    </td>

                    <td className="p-4 font-medium">{laptop.name}</td>

                    <td className="p-4">{laptop.brand}</td>

                    <td className="p-4">${laptop.price}</td>

                    <td className="p-4">{laptop.ram}</td>

                    <td className="p-4">{laptop.storage}</td>

                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <Link
                          href={`/admin/products/${laptop.id}/edit`}
                          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(laptop)}
                          disabled={deletingId === laptop.id}
                          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                        >
                          {deletingId === laptop.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
