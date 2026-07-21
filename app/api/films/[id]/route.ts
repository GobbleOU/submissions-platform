import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createServerSupabase } from "@/lib/supabase-server";

async function authorizeFilm(id: string) {
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return { status: 401, body: { error: "Unauthorized" } };
  }

  const film = await prisma.film.findUnique({
    where: { id: BigInt(id) },
  });

  if (!film || film.ownerId !== session.user.id) {
    return { status: 403, body: { error: "Forbidden" } };
  }

  return { status: 200, body: { session, film } };
}

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;
  const auth = await authorizeFilm(id);

  if (auth.status !== 200) {
    return NextResponse.json(auth.body, { status: auth.status });
  }

  try {
    const body = await request.json();

    const film = await prisma.film.update({
      where: {
        id: BigInt(id),
      },
      data: {
        title: body.title,
        originalTitle: body.originalTitle,

        year: Number(body.year),
        runtime: Number(body.runtime),

        genre: body.genre,
        format: body.format,
        countryProduction: body.countryProduction,
        languages: body.languages,

        completionDate: body.completionDate
          ? new Date(body.completionDate)
          : null,

        worldPremiereStatus:
          body.worldPremiereStatus || null,

        internationalPremiereStatus:
          body.internationalPremiereStatus || null,

        previousFestivalSelections:
          body.previousFestivalSelections || null,

        director: body.director,
        productionCompany: body.productionCompany,

        logline: body.logline,
        shortSynopsis: body.shortSynopsis,
      },
    });

    return NextResponse.json(
      JSON.parse(
        JSON.stringify(film, (_, value) =>
          typeof value === "bigint"
            ? value.toString()
            : value
        )
      )
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update film" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;
  const auth = await authorizeFilm(id);

  if (auth.status !== 200) {
    return NextResponse.json(auth.body, { status: auth.status });
  }

  try {
    await prisma.film.delete({
      where: {
        id: BigInt(id),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to delete film" },
      { status: 500 }
    );
  }
}
