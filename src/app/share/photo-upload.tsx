"use client";

import { useRef, useState } from "react";

const CLOUD_NAME = "dmmbcrpuy";
const UPLOAD_PRESET = "kdmkrave";

interface UploadedFile {
  name: string;
  url: string;
}

export default function PhotoUpload() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<UploadedFile[]>([]);
  const [error, setError] = useState("");

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");

    const newUploads: UploadedFile[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", "krave-customer-photos");

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );
        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        newUploads.push({ name: file.name, url: data.secure_url });
      } catch {
        setError(`Failed to upload ${file.name}. Please try again.`);
      }
    }

    setUploaded((prev) => [...prev, ...newUploads]);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="space-y-3">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <button
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="w-full border-2 border-dashed border-sakura-light rounded-xl py-8 flex flex-col items-center gap-2 text-gray-400 hover:border-sakura hover:text-sakura-dark transition-colors disabled:opacity-50"
      >
        {uploading ? (
          <span className="text-sm font-medium">Uploading...</span>
        ) : (
          <>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="text-sm font-medium">Tap to upload photos</span>
            <span className="text-xs">You can select multiple</span>
          </>
        )}
      </button>

      {error && <p className="text-xs text-red-500 text-center">{error}</p>}

      {uploaded.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs text-green-600 text-center font-medium">
            {uploaded.length} photo{uploaded.length !== 1 ? "s" : ""} uploaded
            — thank you!
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {uploaded.map((f, i) => (
              <img
                key={i}
                src={f.url}
                alt={f.name}
                className="w-16 h-16 rounded-lg object-cover border border-sakura-light"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
