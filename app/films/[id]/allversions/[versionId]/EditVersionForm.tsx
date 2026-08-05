"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type EditVersionFormProps = {
  filmId: string;
  versionId: string;
  initialData: {
    title: string;
    logline: string | null;
    shortSynopsis: string | null;
    longSynopsis: string | null;
    directorStatement: string | null;
    producerStatement: string | null;
    trailerUrl: string | null;
  };
};

export default function EditVersionForm({
  filmId,
  versionId,
  initialData,
}: EditVersionFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: initialData.title ?? "",
    logline: initialData.logline ?? "",
    shortSynopsis: initialData.shortSynopsis ?? "",
    longSynopsis: initialData.longSynopsis ?? "",
    directorStatement: initialData.directorStatement ?? "",
    producerStatement: initialData.producerStatement ?? "",
    trailerUrl: initialData.trailerUrl ?? "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function saveVersion(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setIsSaving(true);
      setError("");

      const response = await fetch(
        `/api/films/${filmId}/allversions/${versionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to save version"
        );
      }

      router.push(
        `/films/${filmId}/allversions/${versionId}`
      );

      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to save version"
      );

      setIsSaving(false);
    }
  }

  return (
    <form
      onSubmit={saveVersion}
      className="mt-8 space-y-8"
    >
      <section className="rounded-lg border border-zinc-200 p-6">
        <h2 className="text-xl font-semibold">
          Version information
        </h2>

        <div className="mt-5">
          <label
            htmlFor="title"
            className="text-sm font-medium text-zinc-700"
          >
            Version title
          </label>

          <input
            id="title"
            name="title"
            value={form.title}
            onChange={updateField}
            className="mt-2 w-full rounded border border-zinc-300 px-3 py-2"
          />
        </div>
      </section>

      <section className="rounded-lg border border-zinc-200 p-6">
        <h2 className="text-xl font-semibold">
          Synopsis
        </h2>

        <div className="mt-5 space-y-5">
          <Field
            label="Logline"
            name="logline"
            value={form.logline}
            onChange={updateField}
            rows={3}
          />

          <Field
            label="Short synopsis"
            name="shortSynopsis"
            value={form.shortSynopsis}
            onChange={updateField}
            rows={5}
          />

          <Field
            label="Long synopsis"
            name="longSynopsis"
            value={form.longSynopsis}
            onChange={updateField}
            rows={10}
          />
        </div>
      </section>

      <section className="rounded-lg border border-zinc-200 p-6">
        <h2 className="text-xl font-semibold">
          Statements
        </h2>

        <div className="mt-5 space-y-5">
          <Field
            label="Director statement"
            name="directorStatement"
            value={form.directorStatement}
            onChange={updateField}
            rows={8}
          />

          <Field
            label="Producer statement"
            name="producerStatement"
            value={form.producerStatement}
            onChange={updateField}
            rows={8}
          />
        </div>
      </section>

      <section className="rounded-lg border border-zinc-200 p-6">
        <h2 className="text-xl font-semibold">
          Links
        </h2>

        <div className="mt-5">
          <label
            htmlFor="trailerUrl"
            className="text-sm font-medium text-zinc-700"
          >
            Trailer URL
          </label>

          <input
            id="trailerUrl"
            name="trailerUrl"
            type="url"
            value={form.trailerUrl}
            onChange={updateField}
            className="mt-2 w-full rounded border border-zinc-300 px-3 py-2"
          />
        </div>
      </section>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSaving}
        className="rounded bg-zinc-900 px-5 py-2.5 font-medium text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSaving ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  rows,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  rows: number;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-sm font-medium text-zinc-700"
      >
        {label}
      </label>

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="mt-2 w-full rounded border border-zinc-300 px-3 py-2"
      />
    </div>
  );
}