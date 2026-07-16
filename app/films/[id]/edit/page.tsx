import { prisma } from "@/lib/prisma";
import EditFilmForm from "./EditFilmForm";

export default async function EditFilmPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const film = await prisma.film.findUnique({
    where: {
      id: BigInt(id),
    },
  });

  if (!film) {
    return <div>Film not found</div>;
  }

  return <EditFilmForm film={film} />;
}