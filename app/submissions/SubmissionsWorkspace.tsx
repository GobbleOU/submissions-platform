"use client";

import { useMemo, useState } from "react";

type FilmOption = {
  id: string;
  title: string;
};

type Opportunity = {
  id: string;
  name: string;
  description: string | null;
  phaseOfDistribution: string | null;
  submissionUrl: string | null;
  event: {
    name: string;
    city: string | null;
    country: string | null;
  };
};

type Submission = {
  id: string;
  filmId: string;
  opportunityId: string;
  submissionStatus: string;
  selectionStatus: string | null;
};

type Props = {
  films: FilmOption[];
  opportunities: Opportunity[];
  submissions: Submission[];
};

export default function SubmissionsWorkspace({
  films,
  opportunities,
  submissions,
}: Props) {
  const [filmId, setFilmId] = useState(
    films.length > 0 ? films[0].id : ""
  );

  const [busyOpportunityId, setBusyOpportunityId] =
    useState<string | null>(null);

  const [messages, setMessages] = useState<
    Record<string, string>
  >({});

  const [localSubmissions, setLocalSubmissions] =
    useState<Submission[]>(submissions);

  const selectedFilm = useMemo(
    () => films.find((film) => film.id === filmId),
    [films, filmId]
  );

  const selectedFilmSubmissions = useMemo(
    () =>
      localSubmissions.filter(
        (submission) => submission.filmId === filmId
      ),
    [localSubmissions, filmId]
  );

  const trackedOpportunityIds = useMemo(
    () =>
      new Set(
        selectedFilmSubmissions.map(
          (submission) => submission.opportunityId
        )
      ),
    [selectedFilmSubmissions]
  );

  const trackedOpportunities = useMemo(
    () =>
      opportunities.filter((opportunity) =>
        trackedOpportunityIds.has(opportunity.id)
      ),
    [opportunities, trackedOpportunityIds]
  );

  async function startSubmission(opportunityId: string) {
    if (!filmId) return;

    try {
      setBusyOpportunityId(opportunityId);
      setMessages((current) => ({
        ...current,
        [opportunityId]: "",
      }));

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
        setMessages((current) => ({
          ...current,
          [opportunityId]:
            result.error ||
            "Could not start submission.",
        }));

        return;
      }

      setLocalSubmissions((current) => [
  ...current,
  {
    id: String(result.id),
    filmId: String(result.filmId),
    opportunityId: String(result.opportunityId),
    submissionStatus:
      result.submissionStatus ?? "interested",
    selectionStatus:
      result.selectionStatus ?? null,
    notes: result.notes ?? null,
    submittedAt: result.submittedAt ?? null,
  },
]);
const [editingSubmissionId, setEditingSubmissionId] =
  useState<string | null>(null);

const [savingSubmissionId, setSavingSubmissionId] =
  useState<string | null>(null);

const [editValues, setEditValues] = useState<{
  submissionStatus: string;
  selectionStatus: string;
  notes: string;
}>({
  submissionStatus: "interested",
  selectionStatus: "",
  notes: "",
});

      setMessages((current) => ({
        ...current,
        [opportunityId]:
          "Submission added to your tracker.",
      }));
    } catch (error) {
      console.error(error);

      setMessages((current) => ({
        ...current,
        [opportunityId]:
          "Something went wrong.",
      }));
    } finally {
      setBusyOpportunityId(null);
    }
  }

  if (films.length === 0) {
    return (
      <section className="mt-10 rounded-lg border border-dashed border-zinc-300 p-10 text-center">
        <h2 className="text-xl font-semibold">
          No films yet
        </h2>

        <p className="mt-2 text-zinc-600">
          Create a film before looking for submission opportunities.
        </p>
      </section>
    );
  }

  return (
    <div className="mt-10 space-y-10">
      {/* Film selector */}
      <section className="rounded-lg border border-zinc-200 bg-white p-6">
        <label
          htmlFor="film"
          className="block text-sm font-medium text-zinc-700"
        >
          Select film
        </label>

        <select
          id="film"
          value={filmId}
          onChange={(e) => {
            setFilmId(e.target.value);
            setMessages({});
          }}
          className="mt-2 w-full max-w-md rounded border border-zinc-300 bg-white px-3 py-2"
        >
          {films.map((film) => (
            <option key={film.id} value={film.id}>
              {film.title}
            </option>
          ))}
        </select>

        {selectedFilm && (
          <p className="mt-3 text-sm text-zinc-500">
            Showing submissions and opportunities for{" "}
            <strong>{selectedFilm.title}</strong>
          </p>
        )}
      </section>

      {/* Your submissions */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">
            Your submissions
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Opportunities currently being tracked for this film.
          </p>
        </div>

        {trackedOpportunities.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center">
            <p className="font-medium">
              No submissions tracked yet
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Start a submission from the opportunities below.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {trackedOpportunities.map((opportunity) => {
              const submission =
                selectedFilmSubmissions.find(
                  (item) =>
                    item.opportunityId === opportunity.id
                );

              return (
                <div
                  key={opportunity.id}
                  className="rounded-lg border border-zinc-200 bg-white p-6"
                >
                  <p className="text-sm font-medium text-zinc-500">
                    {opportunity.event.name}
                  </p>

                  <h3 className="mt-1 text-xl font-semibold">
                    {opportunity.name}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm">
                    <span className="rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-700">
                      Status:{" "}
                      {submission?.submissionStatus ??
                        "interested"}
                    </span>

                    {submission?.selectionStatus && (
                      <span className="rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-700">
                        Selection:{" "}
                        {submission.selectionStatus}
                      </span>
                    )}
                  </div>

                  {opportunity.submissionUrl && (
                    <a
                      href={opportunity.submissionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-block text-sm font-medium underline"
                    >
                      View submission page
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* All opportunities */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">
            All opportunities
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Browse every opportunity currently available in Blink.
          </p>
        </div>

        <div className="space-y-4">
          {opportunities.map((opportunity) => {
            const alreadyTracked =
              trackedOpportunityIds.has(opportunity.id);

            return (
              <div
                key={opportunity.id}
                className="rounded-lg border border-zinc-200 bg-white p-6"
              >
                <p className="text-sm font-medium text-zinc-500">
                  {opportunity.event.name}
                </p>

                <h3 className="mt-1 text-xl font-semibold">
                  {opportunity.name}
                </h3>

                {(opportunity.event.city ||
                  opportunity.event.country) && (
                  <p className="mt-1 text-sm text-zinc-500">
                    {[
                      opportunity.event.city,
                      opportunity.event.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}

                {opportunity.phaseOfDistribution && (
                  <p className="mt-3 text-sm text-zinc-700">
                    {opportunity.phaseOfDistribution}
                  </p>
                )}

                {opportunity.description && (
                  <p className="mt-2 text-sm text-zinc-500">
                    {opportunity.description}
                  </p>
                )}

                <div className="mt-5 flex flex-wrap gap-3">
                  {opportunity.submissionUrl && (
                    <a
                      href={opportunity.submissionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50"
                    >
                      View submission page
                    </a>
                  )}

                  {alreadyTracked ? (
                    <span className="rounded bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-600">
                      Tracking
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        startSubmission(opportunity.id)
                      }
                      disabled={
                        busyOpportunityId ===
                        opportunity.id
                      }
                      className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                    >
                      {busyOpportunityId ===
                      opportunity.id
                        ? "Adding..."
                        : "Start submission"}
                    </button>
                  )}
                </div>

                {messages[opportunity.id] && (
                  <p className="mt-3 text-sm text-zinc-600">
                    {messages[opportunity.id]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}