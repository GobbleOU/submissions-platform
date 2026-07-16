"use client";

import { useState } from "react";

export default function EditFilmForm({
  film,
}: {
  film: any;
}) {
  const [form, setForm] = useState({
  title: film.title ?? "",
  originalTitle: film.originalTitle ?? "",
  year: String(film.year ?? ""),
  runtime: String(film.runtime ?? ""),
  genre: film.genre ?? "",
  format: film.format ?? "",
  countryProduction: film.countryProduction ?? "",
  languages: film.languages ?? "",
  director: film.director ?? "",
  productionCompany: film.productionCompany ?? "",
  completionDate: film.completionDate
    ? film.completionDate.toISOString().split("T")[0]
    : "",
  worldPremiereStatus: film.worldPremiereStatus ?? "",
  internationalPremiereStatus:
    film.internationalPremiereStatus ?? "",
  previousFestivalSelections:
    film.previousFestivalSelections ?? "",
  logline: film.logline ?? "",
  shortSynopsis: film.shortSynopsis ?? "",
});

function updateField(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
}

  return (
  <main className="p-8 max-w-5xl">
    <form>
    <h1 className="text-3xl font-bold mb-6">
      Edit {film.title}
    </h1>

    <h2 className="text-xl font-semibold">
      Basic Information
    </h2>

    <div className="grid grid-cols-2 gap-4 mt-4">

      {[
        "title",
        "originalTitle",
        "year",
        "runtime",
        "genre",
        "format",
      ].map((field) => (
        <input
          key={field}
          name={field}
          type={
            field === "year" || field === "runtime"
              ? "number"
              : "text"
          }
          value={form[field as keyof typeof form]}
          onChange={updateField}
          className="border p-2 w-full rounded"
        />
      ))}

    </div>

    <h2 className="text-xl font-semibold mt-8">
  Synopsis
</h2>

<textarea
  name="logline"
  placeholder="Logline"
  value={form.logline}
  onChange={updateField}
  className="border p-2 w-full rounded mt-4"
/>

<textarea
  name="shortSynopsis"
  placeholder="Short Synopsis"
  value={form.shortSynopsis}
  onChange={updateField}
  className="border p-2 w-full rounded"
/>


<h2 className="text-xl font-semibold mt-8">
  Production
</h2>

<div className="grid grid-cols-2 gap-4 mt-4">

  {[
    "countryProduction",
    "languages",
    "director",
    "productionCompany",
    "completionDate",
  ].map((field) => (
    <input
      key={field}
      name={field}
      type="text"
      value={form[field as keyof typeof form]}
      onChange={updateField}
      className="border p-2 w-full rounded"
    />
  ))}

</div>

<h2 className="text-xl font-semibold mt-8">
  Festival Information
</h2>

<div className="grid grid-cols-2 gap-4 mt-4">

  {[
    "worldPremiereStatus",
    "internationalPremiereStatus",
    "previousFestivalSelections",
  ].map((field) => (
    <input
      key={field}
      name={field}
      type="text"
      value={form[field as keyof typeof form]}
      onChange={updateField}
      className="border p-2 w-full rounded"
    />
  ))}

</div>

<button
  className="bg-black text-white px-4 py-2 rounded mt-6"
>
  Save Changes
</button>
</form>
  </main>
     
);
}