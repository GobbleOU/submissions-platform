import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteFilmButton from "@/components/DeleteFilmButton";
import { createServerSupabase } from "@/lib/supabase-server";

export default async function FilmPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return (
      <main className="mx-auto w-full max-w-6xl p-8">
        <div className="rounded-lg border border-dashed border-zinc-300 p-10 text-center">
          <h1 className="text-3xl font-bold">Sign in to see this film</h1>
          <p className="mt-3 text-zinc-600">
            You must be signed in to view film details.
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

  const film = await prisma.film.findUnique({
    where: {
      id: BigInt(id),
    },
  });

  if (!film || film.ownerId !== session.user.id) {
    return (
      <main className="mx-auto w-full max-w-6xl p-8">
        <div className="rounded-lg border border-dashed border-zinc-300 p-10 text-center">
          <h1 className="text-3xl font-bold">Film not found</h1>
          <p className="mt-3 text-zinc-600">
            This film is not available on your account.
          </p>
          <Link
            href="/films"
            className="mt-6 inline-block rounded bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-700"
          >
            Back to films
          </Link>
        </div>
      </main>
    );
  }

  return (
  <main className="mx-auto w-full max-w-6xl p-8">
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <Link
          href="/films"
          className="text-sm text-zinc-500 hover:text-zinc-900"
        >
          ← Back to films
        </Link>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          {film.title}
        </h1>

        <p className="mt-2 text-zinc-600">
          {film.year} · {film.runtime} min · {film.genre}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/films/${film.id}/edit`}
          className="rounded bg-zinc-900 px-4 py-2 font-medium text-white hover:bg-zinc-700"
        >
          Edit film
        </Link>

        <DeleteFilmButton filmId={film.id.toString()} />
      </div>
    </div>

    <nav className="mb-8 flex gap-6 border-b border-zinc-200 text-sm font-medium">
      <span className="border-b-2 border-zinc-900 pb-3">
        Overview
      </span>

      <Link
  href={`/films/${film.id}/allversions`}
  className="pb-3 text-zinc-500 hover:text-zinc-900"
>
  AllVersions
</Link>

      <span className="pb-3 text-zinc-400">
        Opportunities
      </span>

      <span className="pb-3 text-zinc-400">
        Submissions
      </span>
    </nav>

    <div className="grid gap-6 lg:grid-cols-3">
      <section className="rounded-lg border border-zinc-200 p-6 lg:col-span-2">
        <h2 className="text-xl font-semibold">Film overview</h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Detail label="Original title" value={film.originalTitle} />
          <Detail label="Director" value={film.director} />
          <Detail label="Production company" value={film.productionCompany} />
          <Detail label="Country" value={film.countryProduction} />
          <Detail label="Languages" value={film.languages} />
          <Detail label="Format" value={film.format} />
          <Detail
            label="Completion date"
            value={film.completionDate?.toISOString().split("T")[0]}
          />
          <Detail
            label="World premiere"
            value={film.worldPremiereStatus}
          />
        </div>
      </section>

      <aside className="rounded-lg border border-zinc-200 p-6">
        <h2 className="text-xl font-semibold">AllVersions</h2>

        <p className="mt-3 text-sm text-zinc-600">
          Manage the full film dossier, upload newer versions and prepare a
          shareable document.
        </p>

        <Link
  href={`/films/${film.id}/allversions`}
  className="mt-6 block w-full rounded bg-zinc-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-zinc-700"
>
  Open AllVersions
</Link>
      </aside>

      <section className="rounded-lg border border-zinc-200 p-6 lg:col-span-3">
        <h2 className="text-xl font-semibold">Synopsis</h2>

        <div className="mt-5 space-y-5">
          <div>
            <p className="text-sm font-medium text-zinc-500">Logline</p>
            <p className="mt-1">{film.logline}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-500">
              Short synopsis
            </p>
            <p className="mt-1 leading-7">{film.shortSynopsis}</p>
          </div>
        </div>
      </section>
    </div>
  </main>
);

function Detail({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-zinc-500">{label}</p>
      <p className="mt-1">{value || "Not provided"}</p>
    </div>
  );
}

}
