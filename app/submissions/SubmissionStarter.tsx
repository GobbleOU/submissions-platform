"use client";

import { useState } from "react";

type FilmOption = {
  id: string;
  title: string;
};

type Props = {
  opportunityId: string;
  films: FilmOption[];
};

export default function SubmissionStarter({
  opportunityId,
  films,
}: Props) {
  const [filmId, setFilmId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function startSubmission() {
    if (!filmId) {
      setMessage("Please choose a film first.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage(null);

      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filmId,
          opportunityId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setSuccess(false);
        setMessage(
          result.error ||
            "The submission could not be started."
        );
        return;
      }

      setSuccess(true);
      setMessage("Submission added to your tracker.");
    } catch (error) {
      console.error("Start submission error:", error);

      setSuccess(false);
      setMessage("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (films.length === 0) {
    return (
      <p className="mt-4 text-sm text-zinc-500">
        Create a film before starting a submission.
      </p>
    );
  }

  return (
    <div className="mt-5 border-t border-zinc-200 pt-5">
      <p className="mb-2 text-sm font-medium">
        Track this opportunity
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          value={filmId}
          onChange={(e) => {
            setFilmId(e.target.value);
            setMessage(null);
          }}
          disabled={isSubmitting || success}
          className="min-w-64 rounded border border-zinc-300 bg-white px-3 py-2 text-sm"
        >
          <option value="">Choose a film</option>

          {films.map((film) => (
            <option
              key={film.id}
              value={film.id}
            >
              {film.title}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={startSubmission}
          disabled={
            !filmId ||
            isSubmitting ||
            success
          }
          className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Adding..."
            : success
              ? "Added"
              : "Start submission"}
        </button>
      </div>

      {message && (
        <p
          className={`mt-3 text-sm ${
            success
              ? "text-green-700"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}