"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "@/components/SupabaseProvider";

export default function NewFilmPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const session = useSession();

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
    worldPremiereStatus: searchParams.get("worldPremiereStatus") ?? "",
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
      alert("Failed");
      return;
    }

    router.push(`/films/${data.id}`);
  }

  return (
    <main className="p-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">Create Film</h1>

      <form onSubmit={submitFilm} className="space-y-10">
        {/* BASIC INFORMATION */}

        <section>
          <h2 className="text-xl font-semibold mb-5">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  className="block mb-2 text-sm font-medium"
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
                  className="border border-zinc-300 p-3 w-full rounded"
                />
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCTION */}

        <section>
          <h2 className="text-xl font-semibold mb-5">
            Production
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  className="block mb-2 text-sm font-medium"
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
                  className="border border-zinc-300 p-3 w-full rounded"
                />
              </div>
            ))}
          </div>
        </section>

        {/* STORY */}

        <section>
          <h2 className="text-xl font-semibold mb-5">
            Story
          </h2>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="logline"
                className="block mb-2 text-sm font-medium"
              >
                Logline
              </label>

              <textarea
                id="logline"
                name="logline"
                value={form.logline}
                onChange={updateField}
                rows={4}
                className="border border-zinc-300 p-3 w-full rounded"
              />
            </div>

            <div>
              <label
                htmlFor="shortSynopsis"
                className="block mb-2 text-sm font-medium"
              >
                Short Synopsis
              </label>

              <textarea
                id="shortSynopsis"
                name="shortSynopsis"
                value={form.shortSynopsis}
                onChange={updateField}
                rows={7}
                className="border border-zinc-300 p-3 w-full rounded"
              />
            </div>
          </div>
        </section>

        {/* FESTIVAL INFORMATION */}

        <section>
          <h2 className="text-xl font-semibold mb-5">
            Festival Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              "worldPremiereStatus",
              "internationalPremiereStatus",
              "previousFestivalSelections",
            ].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block mb-2 text-sm font-medium"
                >
                  {formatLabel(field)}
                </label>

                <input
                  id={field}
                  name={field}
                  type="text"
                  value={form[field as keyof typeof form]}
                  onChange={updateField}
                  className="border border-zinc-300 p-3 w-full rounded"
                />
              </div>
            ))}
          </div>
        </section>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded font-medium hover:bg-zinc-800"
        >
          Save Film
        </button>
      </form>
    </main>
  );
}