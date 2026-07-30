"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewVersionButton({
  filmId,
}: {
  filmId: string;
}) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  async function createVersion() {
    try {
      setIsCreating(true);
      setError("");

      const response = await fetch(
        `/api/films/${filmId}/allversions`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create version");
      }

      router.push(
        `/films/${filmId}/allversions/${data.id}`
      );

      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create version"
      );

      setIsCreating(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={createVersion}
        disabled={isCreating}
        className="rounded bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isCreating ? "Creating..." : "+ New version"}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}