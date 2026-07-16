import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { text } = await request.json();

  // Later this will be replaced by OpenAI
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
}