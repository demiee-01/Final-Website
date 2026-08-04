import Image from "next/image";
import Link from "next/link";
import DeleteLaptopButton from "@/components/DeleteLaptopButton";

export default function LaptopCard({ laptop, onDeleted }) {
  return (
    <article className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="relative h-52 w-full bg-gray-100">
        <Image
          src={laptop.image}
          alt={laptop.name}
          fill
          className="object-contain p-4"
        />
      </div>

      <div className="p-5">
        <p className="text-sm font-medium text-blue-600">{laptop.brand}</p>

        <h2 className="mt-1 text-xl font-bold text-gray-900">{laptop.name}</h2>

        <div className="mt-3 space-y-1 text-sm text-gray-600">
          <p>CPU: {laptop.cpu}</p>
          <p>RAM: {laptop.ram}</p>
          <p>Storage: {laptop.storage}</p>
        </div>

        <p className="mt-4 text-2xl font-bold text-gray-900">${laptop.price}</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link
            href={`/admin/products/${laptop.id}/edit`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
          >
            Edit
          </Link>

          <DeleteLaptopButton
            laptopId={laptop.id}
            laptopName={laptop.name}
            onDeleted={onDeleted}
          />
        </div>
      </div>
    </article>
  );
}
