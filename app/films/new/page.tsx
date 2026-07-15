"use client";

import { useState } from "react";
export default function NewFilmPage() {
  const [form, setForm] = useState({
    title: "",
    originalTitle: "",
    year: "",
    runtime: "",
    genre: "",
    format: "",
    countryProduction: "",
    languages: "",
    director: "",
    productionCompany: "",
    logline: "",
    shortSynopsis: "",
  });

  function updateField(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
    <main className="p-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">
        Create Film
      </h1>

      <form onSubmit={submitFilm} className="space-y-4">

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
        ].map((field) => (
          <input
  key={field}
  name={field}
  type={
    field === "year" || field === "runtime"
      ? "number"
      : "text"
  }
  placeholder={field}
  value={(form as any)[field]}
  onChange={updateField}
  className="border p-2 w-full rounded"
/>
        ))}

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