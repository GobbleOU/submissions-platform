import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createServerSupabase } from "@/lib/supabase-server";

const ALLOWED_SUBMISSION_STATUSES = [
  "interested",
  "preparing",
  "submitted",
  "withdrawn",
];

const ALLOWED_SELECTION_STATUSES = [
  "pending",
  "selected",
  "rejected",
  "waitlisted",
];

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

    if (!body.filmId || !body.opportunityId) {
      return NextResponse.json(
        {
          error: "filmId and opportunityId are required.",
        },
        { status: 400 }
      );
    }

    const filmId = BigInt(body.filmId);
    const opportunityId = BigInt(body.opportunityId);

    // Make sure this film belongs to the logged-in user.
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

    // Make sure the opportunity exists.
    const opportunity =
      await prisma.submissionOpportunity.findUnique({
        where: {
          id: opportunityId,
        },
      });

    if (!opportunity) {
      return NextResponse.json(
        {
          error: "Submission opportunity not found.",
        },
        { status: 404 }
      );
    }

    // Prevent duplicate film/opportunity combinations.
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

export async function PATCH(request: Request) {
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

    if (!body.submissionId) {
      return NextResponse.json(
        {
          error: "submissionId is required.",
        },
        { status: 400 }
      );
    }

    const submissionId = BigInt(body.submissionId);

    // Find the submission and confirm that its film
    // belongs to the current user.
    const existingSubmission =
      await prisma.submission.findFirst({
        where: {
          id: submissionId,
          film: {
            ownerId: user.id,
          },
        },
      });

    if (!existingSubmission) {
      return NextResponse.json(
        {
          error:
            "Submission not found or you do not have permission to edit it.",
        },
        { status: 404 }
      );
    }

    const updateData: {
      submissionStatus?: string;
      selectionStatus?: string | null;
      notes?: string | null;
      submittedAt?: Date | null;
    } = {};

    // Submission status
    if (body.submissionStatus !== undefined) {
      if (
        !ALLOWED_SUBMISSION_STATUSES.includes(
          body.submissionStatus
        )
      ) {
        return NextResponse.json(
          {
            error: "Invalid submission status.",
          },
          { status: 400 }
        );
      }

      updateData.submissionStatus =
        body.submissionStatus;

      // Automatically set submittedAt when the
      // submission becomes submitted.
      if (
        body.submissionStatus === "submitted" &&
        !existingSubmission.submittedAt
      ) {
        updateData.submittedAt = new Date();
      }

      // Clear submittedAt if it is moved back out
      // of submitted status.
      if (
        body.submissionStatus !== "submitted" &&
        existingSubmission.submissionStatus ===
          "submitted"
      ) {
        updateData.submittedAt = null;
      }
    }

    // Selection status
    if (body.selectionStatus !== undefined) {
      if (
        body.selectionStatus !== null &&
        body.selectionStatus !== "" &&
        !ALLOWED_SELECTION_STATUSES.includes(
          body.selectionStatus
        )
      ) {
        return NextResponse.json(
          {
            error: "Invalid selection status.",
          },
          { status: 400 }
        );
      }

      updateData.selectionStatus =
        body.selectionStatus || null;
    }

    // Notes
    if (body.notes !== undefined) {
      updateData.notes =
        typeof body.notes === "string" &&
        body.notes.trim() !== ""
          ? body.notes.trim()
          : null;
    }

    const submission =
      await prisma.submission.update({
        where: {
          id: submissionId,
        },
        data: updateData,
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
      )
    );
  } catch (error) {
    console.error("Update submission error:", error);

    return NextResponse.json(
      {
        error: "Failed to update submission.",
      },
      { status: 500 }
    );
  }
}