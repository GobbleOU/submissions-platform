import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createServerSupabase } from "@/lib/supabase-server";
import EditVersionForm from "./EditVersionForm";

export default async function AllVersionDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
    versionId: string;
  }>;
}) {
  const { id, versionId } = await params;

  const supabase = await createServerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return (
      <main className="mx-auto w-full max-w-6xl p-8">
        <div className="rounded-lg border border-dashed border-zinc-300 p-10 text-center">
          <h1 className="text-3xl font-bold">
            Sign in to view this version
          </h1>

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

  const allVersion = await prisma.allVersion.findFirst({
    where: {
      id: BigInt(versionId),
      filmId: BigInt(id),
      film: {
        ownerId: session.user.id,
      },
    },
    include: {
      film: true,
    },
  });

  if (!allVersion) {
    return (
      <main className="mx-auto w-full max-w-6xl p-8">
        <h1 className="text-3xl font-bold">
          Version not found
        </h1>

        <Link
          href={`/films/${id}/allversions`}
          className="mt-6 inline-block text-zinc-600 hover:text-zinc-900"
        >
          ← Back to versions
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl p-8">
      <Link
        href={`/films/${allVersion.filmId}/allversions`}
        className="text-sm text-zinc-500 hover:text-zinc-900"
      >
        ← Back to versions
      </Link>

      <div className="mt-6 border-b border-zinc-200 pb-6">
        <p className="text-sm font-medium text-zinc-500">
          Version {allVersion.version}
        </p>

        <h1 className="mt-1 text-4xl font-bold tracking-tight">
          {allVersion.title}
        </h1>

        <p className="mt-2 text-zinc-600">
          {allVersion.film.title}
        </p>
      </div>

      <EditVersionForm
        filmId={allVersion.filmId.toString()}
        versionId={allVersion.id.toString()}
        initialData={{
          title: allVersion.title,
          logline: allVersion.logline,
          shortSynopsis: allVersion.shortSynopsis,
          longSynopsis: allVersion.longSynopsis,
          directorStatement: allVersion.directorStatement,
          producerStatement: allVersion.producerStatement,
          trailerUrl: allVersion.trailerUrl,
        }}
      />
    </main>
  );
}