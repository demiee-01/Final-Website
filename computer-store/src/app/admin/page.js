import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>

        <p className="mt-3 text-gray-600">Manage your computer store.</p>

        <div className="mt-8">
          <Link
            href="/admin/products"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Manage Products
          </Link>
        </div>
      </div>
    </main>
  );
}
