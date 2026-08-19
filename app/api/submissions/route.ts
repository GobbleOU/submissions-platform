import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createServerSupabase } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabase();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const filmId = BigInt(body.filmId);
    const opportunityId = BigInt(body.opportunityId);

    // Make sure the film belongs to the logged-in user.
    const film = await prisma.film.findFirst({
      where: {
        id: filmId,
        ownerId: user.id,
      },
    });

    if (!film) {
      return NextResponse.json(
        {
          error:
            "Film not found or you do not have permission to use it.",
        },
        { status: 404 }
      );
    }

    // Make sure the submission opportunity actually exists.
    const opportunity =
      await prisma.submissionOpportunity.findUnique({
        where: {
          id: opportunityId,
        },
      });

    if (!opportunity) {
      return NextResponse.json(
        { error: "Submission opportunity not found." },
        { status: 404 }
      );
    }

    // Prevent the same film being added to the same opportunity twice.
    const existingSubmission =
      await prisma.submission.findFirst({
        where: {
          filmId,
          opportunityId,
        },
      });

    if (existingSubmission) {
      return NextResponse.json(
        {
          error:
            "This film is already tracking this submission opportunity.",
        },
        { status: 409 }
      );
    }

    const submission = await prisma.submission.create({
      data: {
        filmId,
        opportunityId,
        submissionStatus: "interested",
      },
      include: {
        film: true,
        opportunity: {
          include: {
            event: true,
          },
        },
      },
    });

    return NextResponse.json(
      JSON.parse(
        JSON.stringify(submission, (_, value) =>
          typeof value === "bigint"
            ? value.toString()
            : value
        )
      ),
      { status: 201 }
    );
  } catch (error) {
    console.error("Create submission error:", error);

    return NextResponse.json(
      {
        error: "Failed to create submission.",
      },
      { status: 500 }
    );
  }
}