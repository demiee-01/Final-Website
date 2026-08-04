import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main>
      <section className="bg-gray-950 px-6 py-20 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">
              New Generation Laptops
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Find the perfect laptop for work, study, and gaming
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Explore powerful laptops from ASUS, Dell, Lenovo, HP, Acer, and
              more.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/laptops"
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
              >
                Shop Laptops
              </Link>

              <Link
                href="/brands"
                className="rounded-lg border border-gray-500 px-6 py-3 font-medium text-white hover:bg-white hover:text-gray-900"
              >
                Explore Brands
              </Link>
            </div>
          </div>

          <div className="relative h-80 w-full lg:h-[440px]">
            <Image
              src="/images/banner/banner1.jpg"
              alt="Gaming laptop"
              fill
              priority
              className="rounded-2xl object-contain"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
