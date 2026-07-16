"use client";


import { useState } from "react";
import { useSearchParams } from "next/navigation";
export default function NewFilmPage() {
  const searchParams = useSearchParams();

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
internationalPremiereStatus: searchParams.get("internationalPremiereStatus") ?? "",
previousFestivalSelections: searchParams.get("previousFestivalSelections") ?? "",
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

  alert("Film created!");
}

  return (
    <main className="p-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">
        Create Film
      </h1>

      <form onSubmit={submitFilm} className="space-y-8">

  <div className="grid grid-cols-2 gap-4">

    {[
      "title",
      "originalTitle",
      "year",
      "runtime",
      "genre",
      "format",
      "countryProduction",
      "languages",
      "director",
      "productionCompany",
      "completionDate",
      "worldPremiereStatus",
      "internationalPremiereStatus",
      "previousFestivalSelections",
    ].map((field) => (
      <input
        key={field}
        name={field}
        type={
          field === "year" || field === "runtime"
            ? "number"
            : "text"
        }
        placeholder={formatLabel(field)}
        value={form[field as keyof typeof form]}
        onChange={updateField}
        className="border p-2 w-full rounded"
      />
    ))}

  </div>

        <textarea
          name="logline"
          placeholder="Logline"
          value={form.logline}
          onChange={updateField}
          className="border p-2 w-full rounded"
        />

        <textarea
          name="shortSynopsis"
          placeholder="Short Synopsis"
          value={form.shortSynopsis}
          onChange={updateField}
          className="border p-2 w-full rounded"
        />

        <button
          className="bg-black text-white px-4 py-2 rounded"
        >
          Save Film
        </button>

      </form>
    </main>
  );
}