import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { message, documentContext, history } = await request.json();

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `<s>[INST] You are CivicEase Assistant, a helpful guide for Indian government documents and legal procedures. Document context: ${documentContext}. User question: ${message} [/INST]`,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.7,
            return_full_text: false
          }
        })
      }
    );
    
    // Attempt to parse JSON response
    let data;
    try {
      data = await response.json();
    } catch (e) {
      console.error("Failed to parse JSON from HuggingFace:", await response.text());
      return NextResponse.json({ reply: "Service is temporarily unavailable or overloaded. Please try again later." }, { status: 503 });
    }

    const reply = (Array.isArray(data) ? data[0]?.generated_text : data?.generated_text) || "Sorry, I could not process that.";
    
    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ reply: "I encountered an error connecting to my services. Please try again." }, { status: 500 });
  }
}
