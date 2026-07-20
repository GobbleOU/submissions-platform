import { NextResponse } from "next/server";

import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";
/// This is the file for extracting the information from the uploaded docx and pdf files and turning it into a raw data file for the AI to read. 

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

    if (isDocx) {
      const result = await mammoth.extractRawText({ buffer });

      return NextResponse.json({
        success: true,
        text: result.value,
        messages: result.messages,
      });
    }

    if (isPdf) {
      const parser = new PDFParse({ data: buffer });

      try {
        const result = await parser.getText();

        return NextResponse.json({
          success: true,
          text: result.text,
          messages: [],
        });
      } finally {
        await parser.destroy();
      }
    }

    return NextResponse.json(
      { error: "Only PDF and DOCX files are supported" },
      { status: 400 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Extraction failed" },
      { status: 500 }
    );
  }
}
