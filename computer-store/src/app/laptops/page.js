"use client";

import { useEffect, useState } from "react";
import LaptopCard from "@/components/LaptopCard";

export default function LaptopsPage() {
  const [laptops, setLaptops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLaptops() {
      try {
        const response = await fetch("/api/laptops");

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch laptops.");
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

  function handleLaptopDeleted(deletedId) {
    setLaptops((currentLaptops) =>
      currentLaptops.filter((laptop) => laptop.id !== deletedId),
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen p-10">
        <p>Loading laptops...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-10">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-gray-900">Laptops</h1>

        <p className="mt-4 text-gray-600">
          Explore our available laptop products.
        </p>

        {laptops.length === 0 ? (
          <p className="mt-10 text-gray-600">No laptops found.</p>
        ) : (
          <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {laptops.map((laptop) => (
              <LaptopCard
                key={laptop.id}
                laptop={laptop}
                onDeleted={handleLaptopDeleted}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
