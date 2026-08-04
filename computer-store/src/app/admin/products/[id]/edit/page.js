"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const initialForm = {
  name: "",
  brand: "",
  price: "",
  cpu: "",
  ram: "",
  storage: "",
  image: "",
};

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLaptop() {
      try {
        setError("");

        const response = await fetch(`/api/laptops/${id}`);

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load laptop.");
        }

        setForm({
          name: result.data.name || "",
          brand: result.data.brand || "",
          price: result.data.price || "",
          cpu: result.data.cpu || "",
          ram: result.data.ram || "",
          storage: result.data.storage || "",
          image: result.data.image || "",
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchLaptop();
    }
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSuccess("");
    setError("");

    if (!form.name || !form.brand || !form.price) {
      setError("Name, brand, and price are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/laptops/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update laptop.");
      }

      setSuccess(result.message);

      setTimeout(() => {
        router.push("/laptops");
        router.refresh();
      }, 1000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 p-10">
        <p className="text-lg text-gray-600">Loading laptop...</p>
      </main>
    );
  }

  if (error && !form.name) {
    return (
      <main className="min-h-screen bg-gray-50 p-10">
        <div className="mx-auto max-w-2xl rounded-lg bg-red-100 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-gray-900">Edit Laptop</h1>

        <p className="mt-2 text-gray-600">Product ID: {id}</p>

        {success && (
          <p className="mt-5 rounded-lg bg-green-100 p-3 text-green-700">
            {success}
          </p>
        )}

        {error && (
          <p className="mt-5 rounded-lg bg-red-100 p-3 text-red-700">{error}</p>
        )}

        {form.image && (
          <div className="relative mt-6 h-56 w-full rounded-lg bg-gray-100">
            <Image
              src={form.image}
              alt={form.name || "Laptop image"}
              fill
              className="object-contain p-4"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block font-medium">Laptop Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Brand</label>

            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Price</label>

            <input
              type="number"
              name="price"
              min="0"
              value={form.price}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">CPU</label>

            <input
              type="text"
              name="cpu"
              value={form.cpu}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">RAM</label>

            <input
              type="text"
              name="ram"
              value={form.ram}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Storage</label>

            <input
              type="text"
              name="storage"
              value={form.storage}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Image Path</label>

            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="/images/laptops/asus/rog1.jpg"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push("/laptops")}
              className="w-full rounded-lg border border-gray-300 px-5 py-3 font-medium hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Update Laptop"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
