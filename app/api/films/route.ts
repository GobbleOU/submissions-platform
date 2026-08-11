import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createServerSupabase } from "@/lib/supabase-server";

/// This is for connections and user authentication
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

    // Make sure the authenticated Supabase user
    // exists in our Prisma users table
    const user = await prisma.user.upsert({
      where: {
        id: session.user.id,
      },
      update: {
        email: session.user.email,
      },
      create: {
        id: session.user.id,
        email: session.user.email,
      },
    });

    const film = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const createdFilm = await tx.film.create({
          data: {
            ownerId: user.id,

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

        await tx.allVersion.create({
          data: {
            filmId: createdFilm.id,
            version: 1,
            title: createdFilm.title,
            logline: createdFilm.logline,
            shortSynopsis: createdFilm.shortSynopsis,
          },
        });

        return createdFilm;
      }
    );

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