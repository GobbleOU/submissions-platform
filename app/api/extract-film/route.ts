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
          content: `
You extract factual film information from production dossiers.

Only use information explicitly supported by the supplied document.
Never invent missing information.
If a value is not available, return null.

IMPORTANT FIELD DEFINITIONS:

GENRE
Genre describes the creative/content category of the film.

Examples:
- Drama
- Comedy
- Thriller
- Horror
- Romance
- Documentary
- Animation
- Experimental
- Science Fiction
- Fantasy

If multiple genres are explicitly stated, preserve them in a concise string.

FORMAT
Format describes the overall project type or length category.

Return ONLY one of:
- Feature Film
- Short Film
- Series
- null

Use the following rules:

Feature Film:
A standalone feature-length film.

Short Film:
A standalone short-length film.

Series:
A television, streaming, episodic, or web series.

Do NOT use technical delivery or exhibition specifications as Format.

The following are NOT valid Format values:
- DCP
- 2K
- 4K
- 24 fps
- 25 fps
- ProRes
- H.264
- 5.1
- Stereo
- aspect ratio
- screening format
- projection format

If the document gives only technical specifications and does not clearly
identify whether the project is a Feature Film, Short Film, or Series,
return null for format.

A documentary can still be a Feature Film or Short Film.
For example:
Genre: Documentary
Format: Feature Film

Animation is normally a genre/style rather than a Format.
For example:
Genre: Animation
Format: Short Film
          `.trim(),
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
                description:
                  "Runtime in whole minutes. Return null if not explicitly supported.",
              },

              genre: {
                type: ["string", "null"],
                description:
                  "Creative/content genre, for example Drama, Documentary, Animation, Thriller or Comedy.",
              },

              format: {
                anyOf: [
                  {
                    type: "string",
                    enum: [
                      "Feature Film",
                      "Short Film",
                      "Series",
                    ],
                  },
                  {
                    type: "null",
                  },
                ],
                description:
                  "Project type only. Never return technical delivery specifications such as DCP, 2K, 4K or fps.",
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

    const inputTokens = response.usage?.input_tokens ?? 0;
    const outputTokens = response.usage?.output_tokens ?? 0;
    const totalTokens = response.usage?.total_tokens ?? 0;

    const inputCost =
      (inputTokens / 1_000_000) * 1;

    const outputCost =
      (outputTokens / 1_000_000) * 6;

    const totalCost =
      inputCost + outputCost;

    console.log("========== AI EXTRACTION ==========");
    console.log("Model: gpt-5.6-luna");
    console.log("Source characters:", text.length);
    console.log("Input tokens:", inputTokens);
    console.log("Output tokens:", outputTokens);
    console.log("Total tokens:", totalTokens);
    console.log(
      "Input cost: $",
      inputCost.toFixed(6)
    );
    console.log(
      "Output cost: $",
      outputCost.toFixed(6)
    );
    console.log(
      "TOTAL COST: $",
      totalCost.toFixed(6)
    );
    console.log(
      "Extracted film:",
      extractedFilm
    );
    console.log("===================================");

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