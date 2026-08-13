"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestSupabasePage() {
  const [status, setStatus] = useState("Click button to test connection");
  const [buckets, setBuckets] = useState([]);

  async function testConnection() {
    setStatus("Testing connection...");
    
    try {
      // Test 1: Check if Supabase client is configured
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      console.log("Supabase URL:", url);
      console.log("Supabase Key (first 20 chars):", key?.substring(0, 20));
      
      if (!url || !key) {
        setStatus("❌ Environment variables not found! Did you restart the dev server?");
        return;
      }

      // Test 2: List buckets
      const { data, error } = await supabase.storage.listBuckets();
      
      if (error) {
        setStatus(`❌ Error: ${error.message}`);
        console.error("Error details:", error);
        return;
      }

      setBuckets(data);
      
      // Test 3: Check if laptop-images bucket exists
      const laptopBucket = data.find(b => b.name === 'laptop-images');
      
      if (!laptopBucket) {
        setStatus(`⚠️ Connection works BUT "laptop-images" bucket NOT FOUND!\n\nFound buckets: ${data.map(b => b.name).join(', ') || 'none'}\n\nYou need to create the bucket in Supabase dashboard!`);
      } else {
        setStatus(`✅ SUCCESS! Bucket "laptop-images" exists and is ${laptopBucket.public ? 'PUBLIC' : 'PRIVATE'}\n\n${laptopBucket.public ? 'Ready to upload!' : '⚠️ Warning: Bucket is PRIVATE, make it PUBLIC!'}`);
      }
      
    } catch (err) {
      setStatus(`❌ Connection failed: ${err.message}`);
      console.error("Connection error:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🧪 Supabase Connection Test</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <button
            onClick={testConnection}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Test Supabase Connection
          </button>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <pre className="whitespace-pre-wrap text-sm">{status}</pre>
          </div>
        </div>

        {buckets.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">📦 Found Buckets:</h2>
            <ul className="space-y-2">
              {buckets.map(bucket => (
                <li key={bucket.id} className="p-3 bg-gray-50 rounded border border-gray-200">
                  <div className="font-semibold">{bucket.name}</div>
                  <div className="text-sm text-gray-600">
                    Public: {bucket.public ? '✅ Yes' : '❌ No'} | 
                    ID: {bucket.id}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-bold text-yellow-900 mb-2">📝 Quick Fix:</h3>
          <ol className="text-sm text-yellow-800 space-y-1 list-decimal list-inside">
            <li>Go to <a href="https://supabase.com/dashboard" target="_blank" className="underline">Supabase Dashboard</a></li>
            <li>Click <strong>Storage</strong> in sidebar</li>
            <li>Click <strong>Create a new bucket</strong></li>
            <li>Name: <code className="bg-yellow-100 px-2 py-0.5 rounded">laptop-images</code></li>
            <li>Check ✅ <strong>Public bucket</strong></li>
            <li>Click <strong>Create bucket</strong></li>
            <li>Come back and test again!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
