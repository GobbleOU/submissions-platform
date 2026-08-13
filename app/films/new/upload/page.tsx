"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/SupabaseProvider";

export default function UploadFilmPage() {
  const router = useRouter();
  const session = useSession();

  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (session === null) {
      router.push("/login");
    }
  }, [router, session]);

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

    try {
      setIsProcessing(true);

      // Send the file directly to the extraction API.
      // The original file is NOT stored permanently.
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/extract-document", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Document validation/extraction failed:", result);

        alert(
          result.error ||
            "The document could not be processed."
        );

        return;
      }

      console.log("Document extracted successfully.");

      // Send the validated extracted text to the AI.
      const aiResponse = await fetch("/api/extract-film", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: result.text,
        }),
      });

      const aiResult = await aiResponse.json();

      if (!aiResponse.ok) {
        console.error("AI extraction failed:", aiResult);

        alert(
          aiResult.error ||
            "Film information could not be extracted."
        );

        return;
      }

      const params = new URLSearchParams();

      Object.entries(aiResult).forEach(([key, value]) => {
        if (
          value !== null &&
          value !== undefined
        ) {
          params.set(key, String(value));
        }
      });

      router.push(`/films/new?${params.toString()}`);
    } catch (error) {
      console.error("Upload processing error:", error);

      alert(
        "Something went wrong while processing the document."
      );
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <main className="p-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">
        Upload AllVersions
      </h1>

      <div className="space-y-4">
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          disabled={isProcessing}
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
          disabled={isProcessing}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isProcessing
            ? "Processing..."
            : "Upload"}
        </button>
      </div>
    </main>
  );
}