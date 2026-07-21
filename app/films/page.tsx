import Link from "next/link";

import DeleteFilmButton from "@/components/DeleteFilmButton";
import { prisma } from "@/lib/prisma";
import { createServerSupabase } from "@/lib/supabase-server";

export default async function FilmsDashboardPage() {
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return (
      <main className="mx-auto w-full max-w-6xl p-8">
        <div className="rounded-lg border border-dashed border-zinc-300 p-10 text-center">
          <h1 className="text-3xl font-bold">Sign in to see your films</h1>
          <p className="mt-3 text-zinc-600">
            You need to be signed in to access your dashboard.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-700"
          >
            Sign in
          </Link>
        </div>
      </main>
    );
  }

const films = await prisma.film.findMany({
  where: { ownerId: session.user.id },
  orderBy: { created_at: "desc" },
});

  return (
    <main className="mx-auto w-full max-w-6xl p-8">
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">Projects</p>
          <h1 className="text-3xl font-bold tracking-tight">Your films</h1>
          <p className="mt-2 text-zinc-600">
            Keep each film&apos;s submission information in one place.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/films/new"
            className="rounded bg-zinc-900 px-4 py-2 font-medium text-white hover:bg-zinc-700"
          >
            Create manually
          </Link>
          <Link
            href="/films/new/upload"
            className="rounded border border-zinc-300 px-4 py-2 font-medium hover:bg-zinc-100"
          >
            Upload dossier
          </Link>
        </div>
      </div>

      {films.length === 0 ? (
        <section className="rounded-lg border border-dashed border-zinc-300 p-10 text-center">
          <h2 className="text-xl font-semibold">No films yet</h2>
          <p className="mt-2 text-zinc-600">
            Create a film manually or upload an AllVersions document to get started.
          </p>
        </section>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {films.map((film) => (
            <article
              key={film.id.toString()}
              className="rounded-lg border border-zinc-200 p-5"
            >
              <Link
                href={`/films/${film.id}`}
                className="block transition hover:text-zinc-600"
              >
                <p className="text-sm text-zinc-500">{film.year}</p>
                <h2 className="mt-1 text-xl font-semibold">{film.title}</h2>
                <p className="mt-3 line-clamp-2 text-sm text-zinc-600">
                  {film.logline}
                </p>
                <div className="mt-5 flex items-center justify-between text-sm text-zinc-500">
                  <span>{film.genre}</span>
                  <span>{film.runtime} min</span>
                </div>
              </Link>
              <div className="mt-5 border-t border-zinc-100 pt-4">
                <DeleteFilmButton filmId={film.id.toString()} />
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
