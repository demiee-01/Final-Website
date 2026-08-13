"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";

const inputClass = "w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    payment: "card",        /* card | cash */
    saveInfo: false,        /* checkbox — save info for next time */
    agreeTerms: false,      /* checkbox — agree to terms */
    newsletter: false,      /* checkbox — subscribe to newsletter */
  });

  const [submitted, setSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill user info from Clerk
  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
      }));
    }
  }, [user]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!form.agreeTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    if (!isLoaded || !user) {
      alert("Please sign in to place an order");
      router.push("/sign-in?redirect=/checkout");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const orderData = {
        customerName: `${form.firstName} ${form.lastName}`,
        customerEmail: form.email,
        customerPhone: form.phone,
        shippingAddress: {
          address: form.address,
          city: form.city,
          state: form.state,
          zipCode: form.zip,
          country: form.country,
        },
        paymentMethod: form.payment === "card" ? "credit_card" : "cash_on_delivery",
        items: cartItems.map(item => ({
          laptopId: item.id,
          name: item.name,
          brand: item.brand,
          price: item.price,
          quantity: item.qty,
          image: item.image,
        })),
        totalAmount: total,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to place order");
      }

      // Clear cart and show success
      clearCart();
      setSubmitted(true);
    } catch (err) {
      console.error("Order error:", err);
      setError(err.message || "Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }

  /* Selected items total from cart */
  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="mx-auto max-w-lg text-center animate-fade-in">

          {/* Animated circle + checkmark */}
          <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
            {/* Pulsing ring */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-20 animate-ping" />
            {/* Outer ring */}
            <span className="relative flex h-28 w-28 items-center justify-center rounded-full bg-green-500 shadow-lg">
              {/* Checkmark SVG */}
              <svg className="h-14 w-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" className="animate-draw" />
              </svg>
            </span>
          </div>

          <h1 className="mt-8 text-4xl font-extrabold text-gray-900">Order Placed!</h1>
          <p className="mt-3 text-lg text-gray-500">
            Thank you, <span className="font-bold text-gray-800">{form.firstName}</span>. Your order has been received.
          </p>
          <p className="mt-2 text-sm text-gray-400">We'll send a confirmation to <span className="font-medium">{form.email}</span></p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/laptops"
              className="rounded-xl border border-gray-200 px-8 py-3 font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="rounded-xl bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <p className="mt-1 text-gray-500">Fill in your details to complete your order.</p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-3">

          {/* ── LEFT: Customer Form ── */}
          <div className="space-y-6 lg:col-span-2">

            {/* Customer Information */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Customer Information</h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">First Name *</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Your first name" className={inputClass} required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">Last Name *</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Your last name" className={inputClass} required />
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="hi@example.com" className={inputClass} required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+855 xxxxxx" className={inputClass} />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Shipping Address</h2>

              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">Street Address *</label>
                <input name="address" value={form.address} onChange={handleChange} placeholder="123 Main Street" className={inputClass} required />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">City *</label>
                  <input name="city" value={form.city} onChange={handleChange} placeholder="Phnom Penh" className={inputClass} required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">State / Province</label>
                  <input name="state" value={form.state} onChange={handleChange} placeholder="NY" className={inputClass} />
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">ZIP / Postal Code</label>
                  <input name="zip" value={form.zip} onChange={handleChange} placeholder="101010" className={inputClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">Country *</label>
                  <input name="country" value={form.country} onChange={handleChange} placeholder="Cambodia" className={inputClass} required />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Payment Method</h2>

              <div className="mt-4 space-y-3">
                {/* Card */}
                <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${form.payment === "card" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
                  <input type="radio" name="payment" value="card" checked={form.payment === "card"} onChange={handleChange} className="accent-blue-600 h-4 w-4" />
                  <span className="text-xl">💳</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Credit / Debit Card</p>
                    <p className="text-xs text-gray-500">Visa, MasterCard, AMEX</p>
                  </div>
                </label>

                {/* Cash */}
                <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${form.payment === "cash" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
                  <input type="radio" name="payment" value="cash" checked={form.payment === "cash"} onChange={handleChange} className="accent-blue-600 h-4 w-4" />
                  <span className="text-xl">💵</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Cash on Delivery</p>
                    <p className="text-xs text-gray-500">Pay when your order arrives</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Preferences</h2>

              {/* Save info */}
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" name="saveInfo" checked={form.saveInfo} onChange={handleChange} className="mt-0.5 h-4 w-4 accent-blue-600 cursor-pointer" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">Save my information for next time</p>
                  <p className="text-xs text-gray-400">Your details will be remembered for faster checkout.</p>
                </div>
              </label>

              {/* Newsletter */}
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" name="newsletter" checked={form.newsletter} onChange={handleChange} className="mt-0.5 h-4 w-4 accent-blue-600 cursor-pointer" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">Subscribe to newsletter</p>
                  <p className="text-xs text-gray-400">Get the latest deals and product updates.</p>
                </div>
              </label>

              {/* Terms — required */}
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} className="mt-0.5 h-4 w-4 accent-blue-600 cursor-pointer" required />
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    I agree to the{" "}
                    <span className="text-blue-600 hover:underline cursor-pointer">Terms & Conditions</span>
                    {" "}and{" "}
                    <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span>
                    {" "}*
                  </p>
                  <p className="text-xs text-gray-400">Required to complete your order.</p>
                </div>
              </label>
            </div>
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

            <div className="mt-4 space-y-3 text-sm text-gray-600">
              {cartItems.length === 0 ? (
                <p className="text-gray-400 text-xs">No items in cart.</p>
              ) : cartItems.map((item) => (
                <div key={item.id} className="flex justify-between gap-2">
                  <span className="truncate">{item.name} × {item.qty}</span>
                  <span className="font-medium text-gray-800 shrink-0">${(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span className="text-xl">${total.toLocaleString()}</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing || cartItems.length === 0}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-bold text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </button>

            {error && (
              <div className="mt-3 rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <Link href="/cart" className="mt-3 block w-full rounded-xl border border-gray-200 py-3 text-center text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              ← Back to Cart
            </Link>
          </div>

        </form>
      </div>
    </main>
  );
}
