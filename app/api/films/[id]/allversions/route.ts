import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createServerSupabase } from "@/lib/supabase-server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;

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

    const film = await prisma.film.findFirst({
      where: {
        id: BigInt(id),
        ownerId: session.user.id,
      },
      include: {
        allVersions: {
          orderBy: {
            version: "desc",
          },
          take: 1,
        },
      },
    });

    if (!film) {
      return NextResponse.json(
        { error: "Film not found" },
        { status: 404 }
      );
    }

    const latestVersion = film.allVersions[0];

    const newVersionNumber = latestVersion
      ? latestVersion.version + 1
      : 1;

    const newVersion = await prisma.allVersion.create({
      data: {
        filmId: film.id,
        version: newVersionNumber,
        title: latestVersion?.title ?? film.title,

        logline: latestVersion?.logline ?? film.logline,
        shortSynopsis:
          latestVersion?.shortSynopsis ?? film.shortSynopsis,
        longSynopsis: latestVersion?.longSynopsis ?? null,
        directorStatement:
          latestVersion?.directorStatement ?? null,
        producerStatement:
          latestVersion?.producerStatement ?? null,
        trailerUrl: latestVersion?.trailerUrl ?? null,

        cast: latestVersion?.cast ?? undefined,
        crew: latestVersion?.crew ?? undefined,
        technicalSpecs:
          latestVersion?.technicalSpecs ?? undefined,
        festivals: latestVersion?.festivals ?? undefined,
        awards: latestVersion?.awards ?? undefined,
        stills: latestVersion?.stills ?? undefined,
        poster: latestVersion?.poster ?? undefined,
        budget: latestVersion?.budget ?? undefined,
        financing: latestVersion?.financing ?? undefined,
      },
    });

    return NextResponse.json({
      id: newVersion.id.toString(),
      version: newVersion.version,
    });
  } catch (error) {
    console.error("Failed to create AllVersion:", error);

    return NextResponse.json(
      { error: "Failed to create version" },
      { status: 500 }
    );
  }
}