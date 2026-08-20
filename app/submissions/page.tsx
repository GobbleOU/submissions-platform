import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import SubmissionsWorkspace from "./SubmissionsWorkspace";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  const pageStart = performance.now();

  const requestHeaders = await headers();
  const userId = requestHeaders.get("x-user-id");

  const authEnd = performance.now();

  const [films, opportunities, submissions] = await Promise.all([
    userId
      ? prisma.film.findMany({
          where: {
            ownerId: userId,
          },
          select: {
            id: true,
            title: true,
          },
          orderBy: {
            title: "asc",
          },
        })
      : Promise.resolve([]),

    prisma.submissionOpportunity.findMany({
      include: {
        event: true,
      },
      orderBy: {
        name: "asc",
      },
    }),

    userId
      ? prisma.submission.findMany({
          where: {
            film: {
              ownerId: userId,
            },
          },
          include: {
            opportunity: {
              include: {
                event: true,
              },
            },
          },
        })
      : Promise.resolve([]),
  ]);

  const databaseEnd = performance.now();

  console.log(
    "[submissions] Header auth:",
    Math.round(authEnd - pageStart),
    "ms"
  );

  console.log(
    "[submissions] Parallel database queries:",
    Math.round(databaseEnd - authEnd),
    "ms"
  );

  console.log(
    "[submissions] Total server work:",
    Math.round(databaseEnd - pageStart),
    "ms"
  );

  return (
    <main className="mx-auto w-full max-w-6xl p-8">
      <p className="text-sm font-medium text-zinc-500">
        Workspace
      </p>

      <h1 className="mt-1 text-3xl font-bold tracking-tight">
        Submissions
      </h1>

      <p className="mt-2 text-zinc-600">
        Select a film to explore and track submission opportunities.
      </p>

      <SubmissionsWorkspace
        films={films.map((film) => ({
          id: film.id.toString(),
          title: film.title,
        }))}
        opportunities={opportunities.map((opportunity) => ({
          id: opportunity.id.toString(),
          name: opportunity.name,
          description: opportunity.description,
          phaseOfDistribution:
            opportunity.phaseOfDistribution,
          submissionUrl: opportunity.submissionUrl,
          event: {
            name: opportunity.event.name,
            city: opportunity.event.city,
            country: opportunity.event.country,
          },
        }))}
        submissions={submissions.map((submission) => ({
          id: submission.id.toString(),
          filmId: submission.filmId.toString(),
          opportunityId:
            submission.opportunityId.toString(),
          submissionStatus:
            submission.submissionStatus,
          selectionStatus:
            submission.selectionStatus,
          notes: submission.notes,
          submittedAt:
            submission.submittedAt?.toISOString() ?? null,
        }))}
      />
    </main>
  );
}