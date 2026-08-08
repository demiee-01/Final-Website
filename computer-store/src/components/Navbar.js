"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Laptops", href: "/laptops" },
  { label: "Brands", href: "/brands" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-gray-100 px-6 py-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logos/nav-logo.png"
            alt="Computer Store"
            width={120}
            height={32}
            className="object-contain"
          />
        </Link>

        {/* ── Desktop pill nav ── */}
        <nav className="hidden md:flex items-center bg-white rounded-full shadow-sm px-2 py-1 gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
                  active
                    ? "bg-green-300 text-gray-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.label}
                {/* Badge — shows cart count on Laptops link as demo, or active indicator */}
                {active && totalItems > 0 && link.href === "/laptops" && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Right side: Sign In, Sign Up, Cart ── */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/signin"
            className="rounded-full px-4 py-1.5 text-sm font-bold text-gray-700 hover:bg-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-gray-900 px-4 py-1.5 text-sm font-bold text-white hover:bg-gray-700 transition-colors"
          >
            Sign Up
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-sm font-bold text-gray-800 shadow-sm backdrop-blur-md hover:bg-white/40 transition-all"
          >
            🛒 Cart
            {totalItems > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-gray-700 transition-all ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-gray-700 transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-gray-700 transition-all ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="mt-2 rounded-2xl bg-white px-4 pb-4 pt-2 shadow-md md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                    active ? "bg-green-300 text-gray-900" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/cart"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center justify-between rounded-full bg-gray-900 px-5 py-2.5 text-sm font-bold text-white"
            >
              🛒 Cart
              {totalItems > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-300 text-xs font-bold text-gray-900">
                  {totalItems}
                </span>
              )}
            </Link>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link href="/signin" onClick={() => setMenuOpen(false)} className="rounded-full border border-gray-200 py-2.5 text-center text-sm font-bold text-gray-700 hover:bg-gray-100">
                Sign In
              </Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)} className="rounded-full bg-gray-900 py-2.5 text-center text-sm font-bold text-white hover:bg-gray-700">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
