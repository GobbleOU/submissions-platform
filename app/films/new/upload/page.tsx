"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";



export default function UploadFilmPage() {
  const [file, setFile] = useState<File | null>(null);

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  async function uploadFile() {
  if (!file) {
    alert("Please select a file");
    return;
  }

  const filePath = `uploads/${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("allversions")
    .upload(filePath, file);

  if (error) {
    console.error(error);
    alert("Upload failed");
    return;
  }

  console.log("Upload successful:", data);

const { data: publicUrlData } = supabase.storage
  .from("allversions")
  .getPublicUrl(filePath);

console.log("Public URL:", publicUrlData.publicUrl);

// Send the uploaded file to the extraction API
const formData = new FormData();
formData.append("file", file);

const response = await fetch("/api/extract-document", {
  method: "POST",
  body: formData,
});

const result = await response.json();

console.log(JSON.stringify(result, null, 2));

alert("Upload successful!");
}

  return (
    <main className="p-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">
        Upload AllVersions
      </h1>

      <div className="space-y-4">

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="border p-2 w-full rounded"
        />

        {file && (
          <p className="text-sm">
            Selected:
            <strong> {file.name}</strong>
          </p>
        )}

        <button
          onClick={uploadFile}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Upload
        </button>

      </div>
    </main>
  );
}