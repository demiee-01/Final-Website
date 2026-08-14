"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";

const initialForm = {
  name: "", brand: "", category: "Gaming", price: "", cpu: "", gpu: "", ram: "", storage: "", display: "", os: "", keyboard: "", image: "",
};

const inputClass = "w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    async function fetchLaptop() {
      try {
        const response = await fetch(`/api/laptops/${id}`, { cache: "no-store" });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to load laptop.");
        const d = result.data;
        setForm({
          name: d.name || "",
          brand: d.brand || "",
          category: d.category || "Gaming",
          price: d.price || "",
          cpu: d.cpu || "",
          gpu: d.gpu || "",
          ram: d.ram || "",
          storage: d.storage || "",
          display: d.display || "",
          os: d.os || "",
          keyboard: d.keyboard || "",
          image: d.image || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLaptop();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageUpload(url) {
    setForm((prev) => ({ ...prev, image: url }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess(""); setError("");
    if (!form.name || !form.brand || !form.price) {
      setError("Name, brand, and price are required.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/laptops/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to update laptop.");
      setSuccess("Laptop updated successfully!");
      router.refresh();
      setTimeout(() => router.push("/admin/products"), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        {[1,2,3,4].map(n => <div key={n} className="h-12 animate-pulse rounded-xl bg-gray-200" />)}
      </div>
    );
  }

  if (error && !form.name) {
    return (
      <div className="mx-auto max-w-2xl rounded-xl bg-red-50 border border-red-200 p-6 text-red-700">
        {error}
        <Link href="/admin/products" className="mt-4 block text-sm font-semibold text-blue-600 hover:underline">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">

        {/* Breadcrumb */}
        <p className="text-sm text-gray-400">
          <Link href="/admin" className="hover:text-blue-600">Dashboard</Link>
          {" / "}
          <Link href="/admin/products" className="hover:text-blue-600">Products</Link>
          {" / "}
          <span className="font-medium text-gray-700">Edit Laptop</span>
        </p>

        <h1 className="mt-4 text-3xl font-bold text-gray-900">Edit Laptop</h1>
        <p className="mt-1 text-gray-500">Product ID: {id}</p>

        {success && (
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 p-4 text-green-700 text-sm">
            <span>✅</span> {success}
          </div>
        )}
        {error && (
          <div className="mt-5 rounded-xl bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm space-y-5">

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">Laptop Name *</label>
              <input name="name" value={form.name} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">Brand *</label>
              <input name="brand" value={form.brand} onChange={handleChange} className={inputClass} required />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Price (USD) *</label>
            <input name="price" type="number" min="0" value={form.price} onChange={handleChange} className={inputClass} required />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Category *</label>
            <select name="category" value={form.category} onChange={handleChange} className={inputClass} required>
              <option value="Gaming">Gaming</option>
              <option value="Gaming & Office">Gaming &amp; Office</option>
              <option value="Office">Office</option>
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">CPU</label>
              <input name="cpu" value={form.cpu} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">GPU</label>
              <input name="gpu" value={form.gpu} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">RAM</label>
              <input name="ram" value={form.ram} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">Storage</label>
              <input name="storage" value={form.storage} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">Display</label>
              <input name="display" value={form.display} onChange={handleChange} placeholder="e.g. 15.6-inch FHD 144Hz" className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">OS</label>
              <input name="os" value={form.os} onChange={handleChange} placeholder="e.g. Windows 11 Home" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Keyboard</label>
            <input name="keyboard" value={form.keyboard} onChange={handleChange} placeholder="e.g. RGB Backlit" className={inputClass} />
          </div>

          {/* Image Upload Component */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Product Image</label>
            <ImageUpload onUploadSuccess={handleImageUpload} currentImage={form.image} />
          </div>

          <div className="flex gap-3 pt-2">
            <Link
              href="/admin/products"
              className="flex-1 rounded-xl border border-gray-200 py-3 text-center text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
    </div>
  );
}
