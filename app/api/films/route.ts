import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createServerSupabase } from "@/lib/supabase-server";

export async function POST(request: Request) {
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const film = await prisma.film.create({
      data: {
        ownerId: session.user.id,
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

        worldPremiereStatus: body.worldPremiereStatus || null,
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
      { error: "Failed to create film" },
      { status: 500 }
    );
  }
}