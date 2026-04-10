import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function analyzeDocument(text, language) {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in the environment.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are an expert legal and administrative assistant.
Analyze the following document and provide a structured action plan.
Respond ONLY with valid JSON matching this exact structure:
{
  "summary": "plain language summary",
  "steps": ["step 1", "step 2"],
  "documents_required": ["doc 1", "doc 2"],
  "authority": "name of issuing or responsible authority",
  "mermaid": "valid mermaid flowchart string representing the process flow",
  "language": "the language you responded in"
}

Instructions:
1. Simplify the document's meaning.
2. Extract actionable steps.
3. List required documents.
4. Identify the issuing or relevant authority.
5. Generate a valid Mermaid flowchart string depicting the process flow. Do not wrap mermaid inside markdown blocks within the JSON string.
6. The entire JSON response MUST be naturally translated into the requested language: ${language}.
7. Do not return any other text, warnings, or markdown outside the JSON block.

Document text to analyze:
"""
${text}
"""
`;

  const result = await model.generateContent(prompt);
  let responseText = result.response.text();
  
  // Strip markdown fences before parse (e.g. ```json ... ```)
  responseText = responseText.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/```\s*$/, '').trim();

  const parsed = JSON.parse(responseText);
  return parsed;
}
