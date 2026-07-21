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
    <main className="p-8 max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-3xl font-bold">
          {film.title}
        </h1>

        <div className="flex gap-3">
          <Link
            href="/films"
            className="border border-zinc-300 px-4 py-2 rounded"
          >
            All films
          </Link>
          <Link
            href={`/films/${film.id}/edit`}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Edit Film
          </Link>
          <DeleteFilmButton filmId={film.id.toString()} />
        </div>
      </div>

      <div className="space-y-4">

        <p>
          <strong>Original Title:</strong>{" "}
          {film.originalTitle}
        </p>

        <p>
          <strong>Director:</strong>{" "}
          {film.director}
        </p>

        <p>
          <strong>Year:</strong>{" "}
          {film.year}
        </p>

        <p>
          <strong>Runtime:</strong>{" "}
          {film.runtime} minutes
        </p>

        <p>
          <strong>Genre:</strong>{" "}
          {film.genre}
        </p>

        <p>
          <strong>Format:</strong>{" "}
          {film.format}
        </p>

        <p>
          <strong>Country Production:</strong>{" "}
          {film.countryProduction}
        </p>

        <p>
          <strong>Languages:</strong>{" "}
          {film.languages}
        </p>

        <p>
          <strong>Production Company:</strong>{" "}
          {film.productionCompany}
        </p>

        <p>
          <strong>Completion Date:</strong>{" "}
          {film.completionDate?.toISOString().split("T")[0]}
        </p>

        <hr />

        <h2 className="text-xl font-semibold">
          Festival Information
        </h2>

        <p>
          <strong>World Premiere:</strong>{" "}
          {film.worldPremiereStatus}
        </p>

        <p>
          <strong>International Premiere:</strong>{" "}
          {film.internationalPremiereStatus}
        </p>

        <p>
          <strong>Previous Festival Selections:</strong>{" "}
          {film.previousFestivalSelections}
        </p>

        <hr />

        <h2 className="text-xl font-semibold">
          Synopsis
        </h2>

        <p>
          <strong>Logline:</strong>
        </p>

        <p>
          {film.logline}
        </p>

        <p>
          <strong>Short Synopsis:</strong>
        </p>

        <p>
          {film.shortSynopsis}
        </p>

      </div>
    </main>
  );
}
