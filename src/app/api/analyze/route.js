import { NextResponse } from "next/server";
import { analyzeDocument } from "@/lib/gemini";


export async function POST(req) {
  try {
    const body = await req.json();
    const { text, language } = body;

    if (!text || !language) {
      return NextResponse.json(
        { success: false, error: "Text and language are required" },
        { status: 400 }
      );
    }

    const data = await analyzeDocument(text, language);

    const response = {
      success: true,
      data,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error analyzing document:", error);
    const response = {
      success: false,
      error: error.message || "Failed to analyze document",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
