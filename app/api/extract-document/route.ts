import { NextResponse } from "next/server";

import mammoth from "mammoth";


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

    if (
  file.type ===
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
) {
  const result = await mammoth.extractRawText({
    buffer,
  });

  return NextResponse.json({
    success: true,
    text: result.value,
    messages: result.messages,
  });
}
    console.log("Received:", file.name);
    console.log("Type:", file.type);
    console.log("Size:", file.size);

    return NextResponse.json({
      success: true,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Extraction failed" },
      { status: 500 }
    );
  }
}