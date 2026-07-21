import { prisma } from "@/lib/prisma";
import EditFilmForm from "./EditFilmForm";
import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase-server";

export default async function EditFilmPage({
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
          <h1 className="text-3xl font-bold">Sign in to edit this film</h1>
          <p className="mt-3 text-zinc-600">
            You must be signed in to edit your film.
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

  return <EditFilmForm film={film} />;
}