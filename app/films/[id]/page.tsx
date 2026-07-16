import { prisma } from "@/lib/prisma";

export default async function FilmPage({
  params,
}: {
  params: { id: string };
}) {
  const film = await prisma.film.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!film) {
    return <div>Film not found</div>;
  }

  return (
    <main className="p-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">
        {film.title}
      </h1>

      <div className="space-y-4">

        <p>
          <strong>Director:</strong> {film.director}
        </p>

        <p>
          <strong>Year:</strong> {film.year}
        </p>

        <p>
          <strong>Runtime:</strong> {film.runtime} minutes
        </p>

        <p>
          <strong>Genre:</strong> {film.genre}
        </p>

        <p>
          <strong>Production Company:</strong>{" "}
          {film.productionCompany}
        </p>

        <hr />

        <h2 className="text-xl font-semibold">
          Logline
        </h2>

        <p>
          {film.logline}
        </p>

        <h2 className="text-xl font-semibold">
          Short Synopsis
        </h2>

        <p>
          {film.shortSynopsis}
        </p>

      </div>
    </main>
  );
}