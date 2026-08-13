import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const text = body.text;

    if (typeof text !== "string" || text.trim() === "") {
      return NextResponse.json(
        { error: "Missing or invalid 'text' field." },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",

      reasoning: {
        effort: "low",
      },

      input: [
        {
          role: "system",
          content:
            "You extract factual film information from production dossiers. Only use information explicitly supported by the supplied document. Never invent missing information. If a value is not available, return null.",
        },
        {
          role: "user",
          content: text,
        },
      ],

      text: {
        format: {
          type: "json_schema",
          name: "film_extraction",
          strict: true,
          schema: {
            type: "object",
            properties: {
              title: {
                type: ["string", "null"],
              },
              originalTitle: {
                type: ["string", "null"],
              },
              year: {
                type: ["integer", "null"],
              },
              runtime: {
                type: ["integer", "null"],
              },
              genre: {
                type: ["string", "null"],
              },
              format: {
                type: ["string", "null"],
              },
              countryProduction: {
                type: ["string", "null"],
              },
              languages: {
                type: ["string", "null"],
              },
              completionDate: {
                type: ["string", "null"],
                description:
                  "Return as YYYY-MM-DD when the document provides a date.",
              },
              worldPremiereStatus: {
                type: ["string", "null"],
              },
              internationalPremiereStatus: {
                type: ["string", "null"],
              },
              previousFestivalSelections: {
                type: ["string", "null"],
              },
              director: {
                type: ["string", "null"],
              },
              productionCompany: {
                type: ["string", "null"],
              },
              logline: {
                type: ["string", "null"],
              },
              shortSynopsis: {
                type: ["string", "null"],
              },
            },

            required: [
              "title",
              "originalTitle",
              "year",
              "runtime",
              "genre",
              "format",
              "countryProduction",
              "languages",
              "completionDate",
              "worldPremiereStatus",
              "internationalPremiereStatus",
              "previousFestivalSelections",
              "director",
              "productionCompany",
              "logline",
              "shortSynopsis",
            ],

            additionalProperties: false,
          },
        },
      },
    });

    if (!response.output_text) {
      return NextResponse.json(
        { error: "OpenAI returned no extraction result." },
        { status: 500 }
      );
    }

    const extractedFilm = JSON.parse(response.output_text);

    console.log("AI film extraction:", extractedFilm);
    console.log("OpenAI usage:", response.usage);

    return NextResponse.json(extractedFilm);
  } catch (error) {
    console.error("extract-film error:", error);

    return NextResponse.json(
      {
        error: "Film extraction failed.",
      },
      { status: 500 }
    );
  }
}