"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/SupabaseProvider";

type ProcessingStage =
  | "idle"
  | "reading"
  | "validating"
  | "extracting"
  | "preparing";

export default function UploadFilmPage() {
  const router = useRouter();
  const session = useSession();

  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stage, setStage] = useState<ProcessingStage>("idle");

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
      setStage("idle");
    }
  }

  function getProgress() {
    switch (stage) {
      case "reading":
        return 25;
      case "validating":
        return 50;
      case "extracting":
        return 75;
      case "preparing":
        return 95;
      default:
        return 0;
    }
  }

  function getStageLabel() {
    switch (stage) {
      case "reading":
        return "Reading document...";
      case "validating":
        return "Validating document...";
      case "extracting":
        return "Extracting film information...";
      case "preparing":
        return "Preparing your film review...";
      default:
        return "";
    }
  }

  async function uploadFile() {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setIsProcessing(true);
      setStage("reading");

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/extract-document", {
        method: "POST",
        body: formData,
      });

      setStage("validating");

      const result = await response.json();

      if (!response.ok) {
        console.error(
          "Document validation/extraction failed:",
          result
        );

        alert(
          result.error ||
            "The document could not be processed."
        );

        return;
      }

      console.log("Document extracted successfully.");

      setStage("extracting");

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

      setStage("preparing");

      const params = new URLSearchParams();

      Object.entries(aiResult).forEach(([key, value]) => {
        if (
          value !== null &&
          value !== undefined
        ) {
          params.set(key, String(value));
        }
      });

      // Small delay so the user can actually see
      // the final progress state before redirecting.
      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

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

  const progress = getProgress();

  return (
  <main className="min-h-[calc(100vh-64px)] bg-zinc-50">
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">

      {/* Page heading */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-primary">
          Create a film
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Upload film dossier
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
          Upload your film dossier and Blink will automatically extract
          the available film information for you to review.
        </p>
      </div>

      {/* Upload card */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">

        {/* File picker */}
        <label
          className={`
            flex min-h-48 flex-col items-center justify-center
            rounded-lg border-2 border-dashed px-6 py-10
            text-center transition-colors
            ${
              isProcessing
                ? "cursor-not-allowed border-zinc-200 bg-zinc-50 opacity-60"
                : "cursor-pointer border-zinc-300 hover:border-primary hover:bg-accent/40"
            }
          `}
        >
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            disabled={isProcessing}
            className="hidden"
          />

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-6 w-6 text-primary"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"
              />
            </svg>
          </div>

          {file ? (
            <>
              <span className="font-medium text-zinc-900">
                {file.name}
              </span>

              <span className="mt-1 text-sm text-zinc-500">
                Click to choose a different file
              </span>
            </>
          ) : (
            <>
              <span className="font-medium text-zinc-900">
                Choose a document to upload
              </span>

              <span className="mt-1 text-sm text-zinc-500">
                Click anywhere in this area to browse
              </span>
            </>
          )}

          <span className="mt-4 text-xs text-zinc-400">
            PDF or DOCX · Maximum 50 MB
          </span>
        </label>

        {/* Processing */}
        {isProcessing && (
          <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-zinc-900">
                {getStageLabel()}
              </span>

              <span className="text-sm tabular-nums text-zinc-500">
                {progress}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="mt-3 grid grid-cols-4 text-xs">
              <span
                className={
                  progress >= 25
                    ? "font-medium text-primary"
                    : "text-zinc-400"
                }
              >
                Read
              </span>

              <span
                className={
                  progress >= 50
                    ? "text-center font-medium text-primary"
                    : "text-center text-zinc-400"
                }
              >
                Validate
              </span>

              <span
                className={
                  progress >= 75
                    ? "text-center font-medium text-primary"
                    : "text-center text-zinc-400"
                }
              >
                Extract
              </span>

              <span
                className={
                  progress >= 95
                    ? "text-right font-medium text-primary"
                    : "text-right text-zinc-400"
                }
              >
                Review
              </span>
            </div>
          </div>
        )}

        {/* Action */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="hidden text-sm text-zinc-500 sm:block">
            Your original document is not permanently stored.
          </p>

          <button
            onClick={uploadFile}
            disabled={!file || isProcessing}
            className="
              min-w-40 rounded-lg
              bg-primary px-5 py-2.5
              font-medium text-primary-foreground
              shadow-sm transition-all
              hover:bg-primary/90
              hover:shadow
              focus:outline-none
              focus:ring-2
              focus:ring-ring
              focus:ring-offset-2
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            {isProcessing
              ? "Processing..."
              : "Continue"}
          </button>
        </div>
      </div>

      {/* Explanation */}
      <p className="mt-5 text-center text-sm text-zinc-500">
        You&apos;ll be able to review and correct the extracted
        information before saving your film.
      </p>
    </div>
  </main>
);
}