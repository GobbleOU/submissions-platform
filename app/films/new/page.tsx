"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "@/components/SupabaseProvider";

export default function NewFilmPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <NewFilmForm />
    </Suspense>
  );
}

function NewFilmForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const session = useSession();

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (session === null) {
      router.push("/login");
    }
  }, [router, session]);

  const [form, setForm] = useState({
    title: searchParams.get("title") ?? "",
    originalTitle: searchParams.get("originalTitle") ?? "",
    year: searchParams.get("year") ?? "",
    runtime: searchParams.get("runtime") ?? "",
    genre: searchParams.get("genre") ?? "",
    format: searchParams.get("format") ?? "",
    countryProduction: searchParams.get("countryProduction") ?? "",
    languages: searchParams.get("languages") ?? "",
    director: searchParams.get("director") ?? "",
    productionCompany: searchParams.get("productionCompany") ?? "",
    logline: searchParams.get("logline") ?? "",
    shortSynopsis: searchParams.get("shortSynopsis") ?? "",
    completionDate: searchParams.get("completionDate") ?? "",
    worldPremiereStatus:
      searchParams.get("worldPremiereStatus") ?? "",
    internationalPremiereStatus:
      searchParams.get("internationalPremiereStatus") ?? "",
    previousFestivalSelections:
      searchParams.get("previousFestivalSelections") ?? "",
  });

  function updateField(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function formatLabel(field: string) {
    return field
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }

  async function submitFilm(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsSaving(true);

      console.log("Submitting film", form);

      const res = await fetch("/api/films", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          year: Number(form.year),
          runtime: Number(form.runtime),
        }),
      });

      const data = await res.json();

      console.log("Response:", res.status, data);

      if (!res.ok) {
        alert("Failed to save film.");
        return;
      }

      router.push(`/films/${data.id}`);
    } catch (error) {
      console.error("Save film error:", error);
      alert("Something went wrong while saving the film.");
    } finally {
      setIsSaving(false);
    }
  }

  const inputClassName =
    "w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-3 text-zinc-900 shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30";

  return (
    <main className="min-h-[calc(100vh-64px)] bg-zinc-50">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-primary">
            Film profile
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Review film information
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
            Review the extracted information and correct anything that
            needs adjusting before saving the film.
          </p>
        </div>

        <form onSubmit={submitFilm} className="space-y-6">
          {/* Basic Information */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-zinc-900">
                Basic information
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Core information used to identify the film.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {[
                "title",
                "originalTitle",
                "year",
                "runtime",
                "genre",
                "format",
              ].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="mb-2 block text-sm font-medium text-zinc-700"
                  >
                    {formatLabel(field)}
                  </label>

                  <input
                    id={field}
                    name={field}
                    type={
                      field === "year" || field === "runtime"
                        ? "number"
                        : "text"
                    }
                    value={form[field as keyof typeof form]}
                    onChange={updateField}
                    className={inputClassName}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Production */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-zinc-900">
                Production
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Production details, languages, people, and completion
                information.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {[
                "countryProduction",
                "languages",
                "director",
                "productionCompany",
                "completionDate",
              ].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="mb-2 block text-sm font-medium text-zinc-700"
                  >
                    {formatLabel(field)}
                  </label>

                  <input
                    id={field}
                    name={field}
                    type={
                      field === "completionDate"
                        ? "date"
                        : "text"
                    }
                    value={form[field as keyof typeof form]}
                    onChange={updateField}
                    className={inputClassName}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Story */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-zinc-900">
                Story
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Review the extracted descriptive material.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="logline"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Logline
                </label>

                <textarea
                  id="logline"
                  name="logline"
                  value={form.logline}
                  onChange={updateField}
                  rows={4}
                  className={`${inputClassName} resize-y`}
                />
              </div>

              <div>
                <label
                  htmlFor="shortSynopsis"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Short Synopsis
                </label>

                <textarea
                  id="shortSynopsis"
                  name="shortSynopsis"
                  value={form.shortSynopsis}
                  onChange={updateField}
                  rows={7}
                  className={`${inputClassName} resize-y`}
                />
              </div>
            </div>
          </section>

          {/* Festival Information */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-zinc-900">
                Festival information
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Premiere status and previous festival activity.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {[
                "worldPremiereStatus",
                "internationalPremiereStatus",
                "previousFestivalSelections",
              ].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="mb-2 block text-sm font-medium text-zinc-700"
                  >
                    {formatLabel(field)}
                  </label>

                  <input
                    id={field}
                    name={field}
                    type="text"
                    value={form[field as keyof typeof form]}
                    onChange={updateField}
                    className={inputClassName}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Save */}
          <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-500">
              You can edit this information again later.
            </p>

            <button
              type="submit"
              disabled={isSaving}
              className="
                min-w-36 rounded-lg
                bg-primary px-6 py-3
                font-medium text-primary-foreground
                shadow-sm transition-all
                hover:bg-primary/90
                hover:shadow
                focus:outline-none
                focus:ring-2
                focus:ring-ring
                focus:ring-offset-2
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isSaving ? "Saving..." : "Save film"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}