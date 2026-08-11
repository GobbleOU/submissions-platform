import Link from "next/link";

export default function NewFilmStartPage() {
  return (
    <main className="mx-auto w-full max-w-5xl p-8">
      <div className="mb-10">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          New film
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          How would you like to create your film?
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-600">
          Upload an existing AllVersions document or start with an empty film
          profile.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/films/new/upload"
          className="group rounded-xl border border-zinc-300 p-8 transition hover:border-zinc-900 hover:shadow-sm"
        >
          <p className="text-sm font-medium text-zinc-500">
            Recommended
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Upload AllVersions
          </h2>

          <p className="mt-4 leading-7 text-zinc-600">
            Drag and drop your DOCX or PDF and we&apos;ll extract the film
            information for you.
          </p>

          <div className="mt-8 inline-flex rounded bg-zinc-900 px-4 py-2 font-medium text-white group-hover:bg-zinc-700">
            Upload document
          </div>
        </Link>

        <Link
          href="/films/new"
          className="group rounded-xl border border-zinc-300 p-8 transition hover:border-zinc-900 hover:shadow-sm"
        >
          <p className="text-sm font-medium text-zinc-500">
            Start from scratch
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Create manually
          </h2>

          <p className="mt-4 leading-7 text-zinc-600">
            Start with an empty film profile and enter the information
            yourself.
          </p>

          <div className="mt-8 inline-flex rounded border border-zinc-300 px-4 py-2 font-medium group-hover:bg-zinc-100">
            Create manually
          </div>
        </Link>
      </div>

      <div className="mt-8">
        <Link
          href="/films"
          className="text-sm text-zinc-500 hover:text-zinc-900"
        >
          ← Back to films
        </Link>
      </div>
    </main>
  );
}