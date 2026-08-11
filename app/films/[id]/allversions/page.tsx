import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createServerSupabase } from "@/lib/supabase-server";
import NewVersionButton from "./NewVersionButton";

export default async function AllVersionsPage({
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
          <h1 className="text-3xl font-bold">
            Sign in to view AllVersions
          </h1>

          <p className="mt-3 text-zinc-600">
            You must be signed in to view this film.
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
    include: {
      allVersions: {
        orderBy: {
          version: "asc",
        },
      },
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
      <Link
        href={`/films/${film.id}`}
        className="text-sm text-zinc-500 hover:text-zinc-900"
      >
        ← Back to {film.title}
      </Link>

      <div className="mt-6">
        <p className="text-sm font-medium text-zinc-500">
          AllVersions
        </p>

        <h1 className="mt-1 text-4xl font-bold tracking-tight">
          {film.title}
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-600">
          View and manage every saved version of the film dossier.
        </p>
      </div>

      <div className="mt-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">
            Versions
          </h2>

          <NewVersionButton filmId={film.id.toString()} />
        </div>

        {film.allVersions.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-300 p-10 text-center">
            <h3 className="text-lg font-semibold">
              No versions yet
            </h3>

            <p className="mt-2 text-zinc-600">
              Create the first AllVersions document for this film.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {film.allVersions.map((allVersion: {
  id: bigint;
  version: number;
  title: string;
  updatedAt: Date;
}) => (
              <Link
                key={allVersion.id.toString()}
                href={`/films/${film.id}/allversions/${allVersion.id}`}
                className="rounded-lg border border-zinc-200 p-5 transition hover:border-zinc-900 hover:shadow-sm"
              >
                <p className="text-sm font-medium text-zinc-500">
                  Version {allVersion.version}
                </p>

                <h3 className="mt-2 text-lg font-semibold">
                  {allVersion.title}
                </h3>

                <p className="mt-4 text-sm text-zinc-500">
                  Last updated{" "}
                  {allVersion.updatedAt.toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}