import Link from "next/link";

export default function SubmissionsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl p-8">
      <p className="text-sm font-medium text-zinc-500">Workspace</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">Submissions</h1>
      <p className="mt-2 text-zinc-600">
        Track festival and funding applications for all your films.
      </p>

      <section className="mt-10 rounded-lg border border-dashed border-zinc-300 p-10 text-center">
        <h2 className="text-xl font-semibold">No submissions yet</h2>
        <p className="mt-2 text-zinc-600">
          Submission tracking will appear here once you add opportunities to a film.
        </p>
        <Link
          href="/films"
          className="mt-6 inline-block rounded bg-zinc-900 px-4 py-2 font-medium text-white hover:bg-zinc-700"
        >
          View your films
        </Link>
      </section>
    </main>
  );
}
