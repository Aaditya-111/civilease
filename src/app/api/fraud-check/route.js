import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_TOKEN || "");

export async function POST(req) {
  try {
    const body = await req.json();
    const { text, language } = body;

    if (!text) {
      return NextResponse.json(
        { success: false, error: "Document text is required for fraud analysis" },
        { status: 400 }
      );
    }

    const prompt = `
You are CivilEase FraudShield, an advanced AI forensic document analyst specialized in Indian government documents.
Perform a comprehensive fraud and authenticity analysis on the following document text.

Your analysis must cover:
1. **Authenticity Markers**: Check for official letterheads, seal references, proper formatting, official language tone.
2. **Inconsistency Detection**: Look for conflicting dates, mismatched reference numbers, illogical sequences, unusual jurisdictions.
3. **Language Analysis**: Check for grammar inconsistencies typical of fraudulent documents, unusual phrasing, or non-official language patterns.
4. **Financial Red Flags**: Check if monetary demands seem unusual, if payment methods are suspicious (e.g. personal bank accounts, UPI to individuals).
5. **Authority Verification**: Check if the cited authorities, departments, and officers seem legitimate for the document type.
6. **Legal Framework Check**: Verify if cited laws, sections, and acts are real and applicable.
7. **Urgency Manipulation**: Check if the document uses excessive urgency, threats, or emotional manipulation.

Return ONLY valid JSON matching this exact structure:
{
  "overall_risk_score": 0,
  "risk_level": "LOW | MEDIUM | HIGH | CRITICAL",
  "confidence_percentage": 0,
  "verdict": "short one-line verdict",
  "authenticity_analysis": {
    "official_formatting": { "score": 0, "details": "string" },
    "language_quality": { "score": 0, "details": "string" },
    "authority_legitimacy": { "score": 0, "details": "string" },
    "legal_references": { "score": 0, "details": "string" }
  },
  "red_flags": [
    { "severity": "LOW | MEDIUM | HIGH | CRITICAL", "category": "string", "description": "string", "evidence": "string" }
  ],
  "green_flags": [
    { "category": "string", "description": "string" }
  ],
  "financial_risk": {
    "suspicious_payments": false,
    "unusual_amounts": false,
    "details": "string"
  },
  "urgency_manipulation": {
    "detected": false,
    "tactics": ["string"],
    "details": "string"
  },
  "recommendations": [
    "string"
  ],
  "detailed_summary": "A comprehensive paragraph explaining the fraud analysis findings",
  "what_to_do_next": ["step 1", "step 2"]
}

Score explanation: 0-25 = LOW risk (likely authentic), 26-50 = MEDIUM risk (some concerns), 51-75 = HIGH risk (likely fraudulent), 76-100 = CRITICAL risk (almost certainly fraudulent).
Each sub-score in authenticity_analysis should be 0-100 where 100 = perfectly authentic and 0 = completely fraudulent.

IMPORTANT: You MUST respond entirely in ${language || "English"}.
Every field in the JSON must be written in ${language || "English"} script.
IMPORTANT: DO NOT use markdown code blocks like \`\`\`json. Return raw JSON text only.

Document text to analyze:
"""
${text}
"""
`;

    if (!process.env.HF_TOKEN) {
      return NextResponse.json(
        { success: false, error: "HF_TOKEN missing in .env.local! Please add your free Hugging Face API key." },
        { status: 500 }
      );
    }

    const response = await hf.chatCompletion({
      model: "Qwen/Qwen2.5-72B-Instruct",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 3000,
      temperature: 0.3
    });

    let responseText = response.choices[0].message.content;

    let cleanedText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const startIndex = cleanedText.indexOf('{');
    const endIndex = cleanedText.lastIndexOf('}');
    
    if (startIndex !== -1 && endIndex !== -1) {
      cleanedText = cleanedText.slice(startIndex, endIndex + 1);
    }

    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("AI returned malformed fraud data:", responseText);
      const isTruncated = !responseText.trim().endsWith("}");
      const errorMessage = isTruncated 
        ? "The AI's response got cut off due to length limits. Please try a shorter document."
        : "The AI returned malformed data. Check the server console.";
        
      return NextResponse.json(
        { success: false, error: errorMessage, raw_output: responseText },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: parsed });

  } catch (error) {
    console.error("Fraud Check API Error:", error);
    if (!process.env.HF_TOKEN) {
      return NextResponse.json(
        { success: false, error: "HF_TOKEN missing in .env.local! Please add your free Hugging Face API key." },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || "Failed to perform fraud analysis" },
      { status: 500 }
    );
  }
}
