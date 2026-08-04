"use client";

import { useState } from "react";

const initialForm = {
  name: "",
  brand: "",
  price: "",
  cpu: "",
  ram: "",
  storage: "",
  image: "",
};

export default function AddProductPage() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/laptops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add laptop.");
      }

      setMessage(result.message);
      setForm(initialForm);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-gray-900">Add New Laptop</h1>

        {message && (
          <p className="mt-4 rounded-lg bg-green-100 p-3 text-green-700">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-4 rounded-lg bg-red-100 p-3 text-red-700">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Laptop name"
            className="w-full rounded-lg border p-3"
          />

          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full rounded-lg border p-3"
          />

          <input
            name="price"
            type="number"
            min="0"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full rounded-lg border p-3"
          />

          <input
            name="cpu"
            value={form.cpu}
            onChange={handleChange}
            placeholder="CPU"
            className="w-full rounded-lg border p-3"
          />

          <input
            name="ram"
            value={form.ram}
            onChange={handleChange}
            placeholder="RAM"
            className="w-full rounded-lg border p-3"
          />

          <input
            name="storage"
            value={form.storage}
            onChange={handleChange}
            placeholder="Storage"
            className="w-full rounded-lg border p-3"
          />

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="/images/laptops/asus/rog1.jpg"
            className="w-full rounded-lg border p-3"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Adding..." : "Add Laptop"}
          </button>
        </form>
      </div>
    </main>
  );
}
