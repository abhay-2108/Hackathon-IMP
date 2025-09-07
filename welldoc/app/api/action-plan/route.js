export async function POST(request) {
  const { patient } = await request.json();
  const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!key) {
    const risk = Math.round(patient.risk.probability * 100);
    const actions = [
      `Schedule weekly CBC and metabolic panel for next 4 weeks (risk ${risk}%).`,
      "Initiate risk-adapted supportive care: transfusions, infection prophylaxis.",
      "Arrange hematology consult to refine treatment over next 90 days."
    ];
    return Response.json({ actions });
  }
  try {
    const prompt = `Propose three specific, actionable interventions over the next 90 days for a hematology patient given diagnosis, risk, and vitals. Return a numbered list.\n\nData:\nDx: ${patient.diagnosis}\nRisk: ${patient.risk.level} (${Math.round(patient.risk.probability*100)}%)\nWBC: ${patient.vitals.wbc.at(-1)}\nHb: ${patient.vitals.hb.at(-1)}\nPlatelets: ${patient.vitals.platelets.at(-1)}`;
    const res = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + key, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const actions = text
      .split(/\n+/)
      .map((l) => l.replace(/^\d+[\).]\s*/, "").trim())
      .filter(Boolean)
      .slice(0, 3);
    return Response.json({ actions });
  } catch (e) {
    return Response.json({ actions: ["AI service failed. Please try again later."] });
  }
}


