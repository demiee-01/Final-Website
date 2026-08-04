import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Computer Store
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link href="/laptops" className="hover:text-blue-600">
            Laptops
          </Link>

          <Link href="/brands" className="hover:text-blue-600">
            Brands
          </Link>

          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>

          <Link href="/contact" className="hover:text-blue-600">
            Contact
          </Link>

          <Link
            href="/cart"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Cart
          </Link>

          <Link href="/admin" className="hover:text-blue-600">
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}
