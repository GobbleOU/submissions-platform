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

    console.log("Sending document to OpenAI. Text length:", text.length);

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",

      reasoning: {
        effort: "low",
      },

      input: [
        {
          role: "system",
          content:
            "You extract film information from production documents. Only use information supported by the supplied document. Do not invent missing information.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    console.log("OpenAI response received.");

    return NextResponse.json({
      result: response.output_text,
      sourceLength: text.length,
    });
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