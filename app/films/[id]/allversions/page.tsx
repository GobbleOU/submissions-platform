import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createServerSupabase } from "@/lib/supabase-server";

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
    return null;
  }

  const film = await prisma.film.findUnique({
    where: {
      id: BigInt(id),
    },
  });

  if (!film || film.ownerId !== session.user.id) {
    return null;
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
        <p className="text-sm font-medium text-zinc-500">AllVersions</p>

        <h1 className="mt-1 text-4xl font-bold tracking-tight">
          {film.title}
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-600">
          Manage the complete film dossier, update its information and prepare
          shareable versions.
        </p>
      </div>

      <div className="mt-10 rounded-lg border border-dashed border-zinc-300 p-10 text-center">
        <h2 className="text-xl font-semibold">
          AllVersions workspace
        </h2>

        <p className="mt-2 text-zinc-600">
          The document editor will be added here.
        </p>
      </div>
    </main>
  );
}