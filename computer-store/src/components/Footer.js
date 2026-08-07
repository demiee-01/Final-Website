"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <p className="text-lg font-extrabold text-white">💻 Computer Store</p>
            <p className="mt-3 text-sm leading-relaxed">
              Your one-stop shop for premium laptops and computing gear. We bring you the latest tech at the best prices.
            </p>
            {/* Social icons */}
            <div className="mt-5 flex gap-3">
              {["f", "𝕏", "📷", "▶"].map((icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-sm text-gray-400 hover:border-blue-500 hover:text-white transition-colors">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-bold text-white">Quick Links</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Laptops", href: "/laptops" },
                { label: "Brands", href: "/brands" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-sm font-bold text-white">Support</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { label: "Cart", href: "/cart" },
                { label: "Sign In", href: "#" },
                { label: "Sign Up", href: "#" },
                { label: "Shipping Info", href: "#" },
                { label: "Returns", href: "#" },
                { label: "Admin", href: "/admin" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-sm font-bold text-white">Newsletter</p>
            <p className="mt-3 text-sm leading-relaxed">
              Subscribe for the latest deals and product launches.
            </p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition"
              />
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Computer Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
