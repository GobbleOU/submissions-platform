import { NextResponse } from "next/server";

export const runtime = "nodejs";

import mammoth from "mammoth";
import pdf from "pdf-parse/lib/pdf-parse.js";

import { validateDocument } from "@/lib/document-validation";

// This file extracts information from uploaded DOCX and PDF files,
// then validates the extracted document before it can continue
// to the AI extraction step.
// This is still a work in progress but we are trying to bypass a double call to the ai every time. 

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

    // Reject anything that is not PDF or DOCX
    if (!isDocx && !isPdf) {
      return NextResponse.json(
        {
          error: "Only PDF and DOCX files are supported.",
        },
        { status: 400 }
      );
    }

    let extractedText = "";
    let messages: unknown[] = [];

    // DOCX extraction
    if (isDocx) {
      const result = await mammoth.extractRawText({ buffer });

      extractedText = result.value;
      messages = result.messages;

      console.log("DOCX text length:", extractedText.length);
      console.log(extractedText.slice(0, 500));
    }

    // PDF extraction
    if (isPdf) {
      const result = await pdf(buffer);

      extractedText = result.text;
      messages = [];

      console.log("PDF text length:", extractedText.length);
      console.log(extractedText.slice(0, 500));
    }

    // Free server-side validation.
    // No OpenAI request happens here.
    const validation = validateDocument({
      fileName: file.name,
      mimeType: file.type,
      fileSize: file.size,
      extractedText,
    });

    console.log("Document validation:", validation);

    // Stop the document here if it fails validation.
    // The frontend will never receive text to send to Luna.
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.reason,
          warnings: validation.warnings,
        },
        { status: 400 }
      );
    }

    // Document passed validation.
    return NextResponse.json({
      success: true,
      text: extractedText,
      messages,
      warnings: validation.warnings,
    });
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