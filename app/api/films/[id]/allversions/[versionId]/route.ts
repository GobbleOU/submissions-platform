import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createServerSupabase } from "@/lib/supabase-server";

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
      versionId: string;
    }>;
  }
) {
  const { id, versionId } = await params;

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

    const existingVersion = await prisma.allVersion.findFirst({
      where: {
        id: BigInt(versionId),
        filmId: BigInt(id),
        film: {
          ownerId: session.user.id,
        },
      },
    });

    if (!existingVersion) {
      return NextResponse.json(
        { error: "Version not found" },
        { status: 404 }
      );
    }

    const updatedVersion = await prisma.allVersion.update({
      where: {
        id: existingVersion.id,
      },
      data: {
        title: body.title,
        logline: body.logline || null,
        shortSynopsis: body.shortSynopsis || null,
        longSynopsis: body.longSynopsis || null,
        directorStatement: body.directorStatement || null,
        producerStatement: body.producerStatement || null,
        trailerUrl: body.trailerUrl || null,
      },
    });

    return NextResponse.json(
      JSON.parse(
        JSON.stringify(updatedVersion, (_, value) =>
          typeof value === "bigint"
            ? value.toString()
            : value
        )
      )
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update version" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
      versionId: string;
    }>;
  }
) {
  const { id, versionId } = await params;

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
    const existingVersion = await prisma.allVersion.findFirst({
      where: {
        id: BigInt(versionId),
        filmId: BigInt(id),
        film: {
          ownerId: session.user.id,
        },
      },
    });

    if (!existingVersion) {
      return NextResponse.json(
        { error: "Version not found" },
        { status: 404 }
      );
    }

    await prisma.allVersion.delete({
      where: {
        id: existingVersion.id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Failed to delete version:", error);

    return NextResponse.json(
      { error: "Failed to delete version" },
      { status: 500 }
    );
  }
}