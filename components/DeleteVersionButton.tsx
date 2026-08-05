"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteVersionButton({
  filmId,
  versionId,
  canDelete,
}: {
  filmId: string;
  versionId: string;
  canDelete: boolean;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function deleteVersion() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this version?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);
      setError("");

      const response = await fetch(
        `/api/films/${filmId}/allversions/${versionId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to delete version"
        );
      }

      router.push(`/films/${filmId}/allversions`);
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete version"
      );

      setIsDeleting(false);
    }
  }

  return (
    <div>
     <button
  type="button"
  onClick={deleteVersion}
  disabled={isDeleting || !canDelete}
  className="rounded border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
>
  {!canDelete
    ? "Cannot delete only version"
    : isDeleting
      ? "Deleting..."
      : "Delete version"}
</button>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}