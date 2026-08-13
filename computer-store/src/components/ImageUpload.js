"use client";

import { useState, useRef } from "react";

export default function ImageUpload({ onUploadSuccess, currentImage }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || "");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  async function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setUploading(true);
    setError("");

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);

      // Upload via API route
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      console.group("📤 Supabase Upload Complete");
      console.log("✅ Upload Status: SUCCESS");
      console.log("📁 Bucket: laptop-images");
      console.log("📄 File Path:", result.path);
      console.log("🔗 Public URL:", result.url);
      console.log("📐 Size:", (file.size / 1024).toFixed(2), "KB");
      console.groupEnd();

      setPreview(result.url);
      onUploadSuccess(result.url);
      
    } catch (error) {
      console.error("Upload error:", error);
      setError(error.message);
      alert(`Upload failed: ${error.message}\n\nMake sure you created the "laptop-images" bucket in Supabase!`);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {/* Preview */}
        {preview && (
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
            <img src={preview} alt="Preview" className="h-full w-full object-contain p-2" />
          </div>
        )}

        {/* Upload Button */}
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="supabase-upload"
          />

          <label
            htmlFor="supabase-upload"
            className={`block cursor-pointer rounded-xl border-2 border-dashed px-6 py-4 text-center transition-colors ${
              uploading
                ? "border-blue-300 bg-blue-50"
                : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
            }`}
          >
            {uploading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                <span className="text-sm font-semibold text-blue-600">Uploading...</span>
              </div>
            ) : (
              <div>
                <p className="text-sm font-semibold text-gray-700">📤 Click to upload image</p>
                <p className="mt-1 text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm font-semibold text-red-900">❌ Error:</p>
          <p className="text-xs text-red-800 mt-1">{error}</p>
          <p className="text-xs text-red-700 mt-2">
            Make sure you created the "laptop-images" bucket in Supabase Dashboard!
          </p>
        </div>
      )}
    </div>
  );
}
