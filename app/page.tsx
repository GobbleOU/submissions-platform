import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 bg-zinc-50">
      <section className="mx-auto flex w-full max-w-6xl flex-col justify-center px-8 py-20 sm:py-32">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Film submissions, simplified
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Keep every film ready for its next opportunity.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          Organize your film details, production information, and festival-ready materials in one workspace.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/films" className="rounded bg-zinc-900 px-5 py-3 font-medium text-white hover:bg-zinc-700">
            View your films
          </Link>
          <Link href="/films/new" className="rounded border border-zinc-300 bg-white px-5 py-3 font-medium hover:bg-zinc-100">
            Create a film
          </Link>
        </div>
        <div className="mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">
          <article className="rounded-lg border border-zinc-200 bg-white p-5">
            <h2 className="font-semibold">Film profiles</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">Keep technical, production, and premiere information together.</p>
          </article>
          <article className="rounded-lg border border-zinc-200 bg-white p-5">
            <h2 className="font-semibold">Dossier upload</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">Store your AllVersions documents alongside each project.</p>
          </article>
          <article className="rounded-lg border border-zinc-200 bg-white p-5">
            <h2 className="font-semibold">Submission-ready</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">Build a reliable base for upcoming festival submissions.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
