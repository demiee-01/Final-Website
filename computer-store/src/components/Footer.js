"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import AuthGuard from "@/components/AuthGuard";

export default function Footer() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [showAuthGuard, setShowAuthGuard] = useState(false);
  const { isSignedIn } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (!isSignedIn) { setShowAuthGuard(true); return; }
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <footer id="footer" className="bg-gray-950 text-gray-400">
      {showAuthGuard && <AuthGuard onClose={() => setShowAuthGuard(false)} />}
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link href="/">
              <Image src="https://ik.imagekit.io/wn1nobtx5/laptop/nav-logo.png" alt="Computer Store" width={160} height={44} className="object-contain" />
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              Your one-stop shop for premium laptops and computing gear.
            </p>
            {/* Social icons */}
            <div className="mt-5 flex gap-3">
              {[
                { icon: "https://ik.imagekit.io/wn1nobtx5/laptop/fb.jpg", label: "Facebook", href: "#" },
                { icon: "https://ik.imagekit.io/wn1nobtx5/laptop/tele.jpg", label: "Telegram", href: "#" },
                { icon: "https://ik.imagekit.io/wn1nobtx5/laptop/tiktok.jpg", label: "TikTok", href: "#" },
                { icon: "https://ik.imagekit.io/wn1nobtx5/laptop/tee.jpg", label: "Tell", href: "#" },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="flex h-9 w-9 items-center justify-center rounded-full overflow-hidden border border-gray-700 hover:border-blue-500 transition-all hover:scale-110"
                  aria-label={social.label}
                >
                  <Image 
                    src={social.icon} 
                    alt={social.label} 
                    width={36} 
                    height={36} 
                    className="object-cover"
                  />
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
                { label: "Contact", href: "#footer" },
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
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
              {/* Admin — small and subtle */}
              <li className="pt-2 border-t border-gray-800">
                <Link href="/admin" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                  Admin ↗
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Admin / Newsletter */}
          <div>
            <p className="text-sm font-bold text-white">Contact Admin</p>
            <p className="mt-2 text-xs leading-relaxed text-gray-500">
              Send a message to the store admin.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-blue-500 transition"
              />
              <input
                type="text"
                placeholder="Message"
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-blue-500 transition"
              />

              {/* Animated send button */}
              <button
                type="submit"
                className={`w-full rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                  sent
                    ? "bg-green-500 text-white scale-95"
                    : "bg-blue-600 text-white hover:bg-blue-500 active:scale-95"
                }`}
              >
                {sent ? "✓ Sent!" : "Send Message"}
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
