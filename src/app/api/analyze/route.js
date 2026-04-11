import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_TOKEN || "");

export async function POST(req) {
  try {
    const body = await req.json();
    const { text, language, forceLanguage } = body;
    const targetLanguage = forceLanguage === "English" ? "English" : language;

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { success: false, error: "Text and language are required" },
        { status: 400 }
      );
    }

    const prompt = `
You are CivilEase, an AI expert in Indian government procedures.
Analyze the following document and extract all relevant information precisely into the specified JSON structure.

Rules for extraction:
1. Identify the document type, authority, and jurisdiction.
2. Extract all monetary values (demand, penalties, interest).
3. List all required documents and steps.
4. Identify deadlines and consequences of non-compliance.
5. Provide a 'simplified_summary' in plain language.
6. Return ONLY valid JSON matching this exact structure:

{
  "document_identity": {
    "issuing_authority": "string",
    "department": "string",
    "document_type": "string",
    "reference_number": "string",
    "issue_date": "string",
    "jurisdiction": "string"
  },
  "monetary_elements": {
    "amount_demand": 0,
    "currency": "string",
    "breakdown": { "item": 0 },
    "payment_deadline": "string",
    "late_fee_structure": "string"
  },
  "procedural_requirements": {
    "mandatory_documents": ["string"],
    "optional_documents": ["string"],
    "verification_steps": ["step (max 15 words)"],
    "physical_visit_required": false,
    "visit_location": "string",
    "estimated_processing_time": "string"
  },
  "legal_consequences": {
    "non_payment_penalty": "string",
    "appeal_available": false,
    "appeal_deadline": "string",
    "appeal_authority": "string"
  },
  "contact_information": {
    "helpline": "string",
    "email": "string",
    "ward_officer": "string"
  },
  "simplified_summary": "plain language summary",
  "language": "${targetLanguage}",
  "mermaid": "valid mermaid.js flowchart. Rules: 1. Use short text. 2. ALWAYS wrap node labels in double quotes like A[\"Label\"]. 3. Do not use markdown inside."
}
IMPORTANT: You MUST respond entirely in ${targetLanguage}. 
Every single field in the JSON — summary, steps, documents_required, authority — 
must be written in ${targetLanguage} script. 
Do not use English at all if the language is not English.
IMPORTANT: DO NOT use markdown code blocks like \`\`\`json. Return raw JSON text only.

Document text to analyze:
"""
${text}
"""
`;

    // Using Llama-3.3-70B-Instruct or Qwen2.5-72B-Instruct since they are exceptional at JSON parsing
    const response = await hf.chatCompletion({
      model: "Qwen/Qwen2.5-72B-Instruct",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
      temperature: 0.4
    });

    let responseText = response.choices[0].message.content;
    
    // Safer JSON Parser
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");
    
    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error("AI returned malformed data:", responseText);
      return NextResponse.json({ success: false, error: "The AI returned malformed data. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: parsed });

  } catch (error) {
    console.error("HuggingFace API Error:", error);
    if (!process.env.HF_TOKEN) {
      return NextResponse.json(
        { success: false, error: "HF_TOKEN missing in .env.local! Please add your free Hugging Face API key." },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || "Failed to analyze document via Hugging Face" },
      { status: 500 }
    );
  }
}
