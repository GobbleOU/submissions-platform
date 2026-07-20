"use client";

import { useRouter } from "next/navigation";

export default function DeleteFilmButton({
  filmId,
  redirectTo = "/films",
}: {
  filmId: string;
  redirectTo?: string;
}) {
  const router = useRouter();

  async function deleteFilm() {
    if (!window.confirm("Delete this film? This cannot be undone.")) {
      return;
    }

    const response = await fetch(`/api/films/${filmId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Failed to delete film");
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={deleteFilm}
      className="rounded border border-red-200 px-4 py-2 text-red-700 hover:bg-red-50"
    >
      Delete film
    </button>
  );
}
