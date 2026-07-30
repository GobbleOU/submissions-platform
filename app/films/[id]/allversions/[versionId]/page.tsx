import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createServerSupabase } from "@/lib/supabase-server";

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
    return null;
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
        <h1 className="text-3xl font-bold">Version not found</h1>

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
    <main className="mx-auto w-full max-w-6xl p-8">
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

        <h1 className="mt-1 text-4xl font-bold">
          {allVersion.title}
        </h1>

        <p className="mt-2 text-zinc-600">
          {allVersion.film.title}
        </p>
      </div>

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-xl font-semibold">Logline</h2>
          <p className="mt-3 leading-7 text-zinc-700">
            {allVersion.logline || "Not added yet"}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            Short synopsis
          </h2>
          <p className="mt-3 leading-7 text-zinc-700">
            {allVersion.shortSynopsis || "Not added yet"}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            Long synopsis
          </h2>
          <p className="mt-3 whitespace-pre-wrap leading-7 text-zinc-700">
            {allVersion.longSynopsis || "Not added yet"}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            Director statement
          </h2>
          <p className="mt-3 whitespace-pre-wrap leading-7 text-zinc-700">
            {allVersion.directorStatement || "Not added yet"}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            Producer statement
          </h2>
          <p className="mt-3 whitespace-pre-wrap leading-7 text-zinc-700">
            {allVersion.producerStatement || "Not added yet"}
          </p>
        </section>
      </div>
    </main>
  );
}