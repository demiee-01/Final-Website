"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function TestImagePage() {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLaptops() {
      try {
        const response = await fetch("/api/laptops");
        const result = await response.json();
        setLaptops(result.data || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadLaptops();
  }, []);

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Image Debug Test</h1>
      
      <div className="space-y-8">
        {laptops.map((laptop) => (
          <div key={laptop.id} className="border p-5 rounded-lg">
            <h2 className="font-bold text-xl mb-3">{laptop.name}</h2>
            
            {/* Show image URL */}
            <div className="mb-3">
              <p className="text-sm font-semibold">Image URL:</p>
              <p className="text-xs text-gray-600 break-all">{laptop.image}</p>
            </div>

            {/* Test with regular img tag */}
            <div className="mb-5">
              <p className="text-sm font-semibold mb-2">Using &lt;img&gt; tag:</p>
              <img 
                src={laptop.image} 
                alt={laptop.name}
                className="w-64 h-64 object-contain border"
                onError={(e) => {
                  console.error("Image failed to load:", laptop.image);
                  e.target.style.border = "2px solid red";
                }}
                onLoad={() => console.log("Image loaded successfully:", laptop.image)}
              />
            </div>

            {/* Test with Next.js Image component */}
            <div>
              <p className="text-sm font-semibold mb-2">Using Next.js &lt;Image&gt; component:</p>
              <div className="relative w-64 h-64 border">
                <Image
                  src={laptop.image}
                  alt={laptop.name}
                  fill
                  className="object-contain"
                  onError={() => console.error("Next Image failed:", laptop.image)}
                  onLoad={() => console.log("Next Image loaded:", laptop.image)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
