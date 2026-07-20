import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Received body:", body);

    const text = body.text;

    if (typeof text !== "string" || text.trim() === "") {
      return NextResponse.json(
        {
          error: "Missing or invalid 'text' field.",
          received: body,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      title: "Coastline",
      originalTitle: "Ligne de Côte",
      year: 2025,
      runtime: 97,
      genre: "Drama",
      format: "DCP",
      countryProduction: "France, Belgium",
      languages: "French (English subtitles)",
      completionDate: "2025-03-15",
      worldPremiereStatus: "World Premiere",
      internationalPremiereStatus: "N/A",
      previousFestivalSelections: "None to date",
      director: "Amélie Fontaine",
      productionCompany: "Marée Basse Films",
      logline:
        "A retired lighthouse keeper confronts a lifetime of secrets when a stranger washes ashore.",
      shortSynopsis:
        "On a remote stretch of the Brittany coast, an aging lighthouse keeper...",

      sourceLength: text.length,
    });
  } catch (error) {
    console.error("extract-film error:", error);

    return NextResponse.json(
      {
        error: "Invalid request body.",
      },
      { status: 400 }
    );
  }
}