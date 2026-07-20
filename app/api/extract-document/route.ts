import { NextResponse } from "next/server";

export const runtime = "nodejs";

import mammoth from "mammoth";
import pdf from "pdf-parse/lib/pdf-parse.js";

// This file extracts information from uploaded DOCX and PDF files
// and turns it into raw text data for the AI to read.

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const isDocx =
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.toLowerCase().endsWith(".docx");

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    // DOCX extraction
    if (isDocx) {
      const result = await mammoth.extractRawText({ buffer });

      console.log("DOCX text length:", result.value.length);
      console.log(result.value.slice(0, 500));

      return NextResponse.json({
        success: true,
        text: result.value,
        messages: result.messages,
      });
    }

    // PDF extraction
    if (isPdf) {
      const result = await pdf(buffer);

      console.log("PDF text length:", result.text.length);
      console.log(result.text.slice(0, 500));

      return NextResponse.json({
        success: true,
        text: result.text,
        messages: [],
      });
    }

    return NextResponse.json(
      {
        error: "Only PDF and DOCX files are supported",
      },
      { status: 400 }
    );

  } catch (error) {
    console.error("Extraction error:", error);

    return NextResponse.json(
      {
        error: "Extraction failed",
      },
      { status: 500 }
    );
  }
}