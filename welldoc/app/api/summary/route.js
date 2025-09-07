export async function POST(request) {
  const { patient } = await request.json();
  const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!key) {
    const text = `Patient ${patient.name} (${patient.id}), ${patient.age} years, ${patient.diagnosis}. Recent WBC ${patient.vitals.wbc.at(-1)}, Hb ${patient.vitals.hb.at(-1)}, Platelets ${patient.vitals.platelets.at(-1)}. Risk drivers: ${patient.riskDrivers.join(', ')}.`;
    return Response.json({ result: `• ${text}\n• Clinical status appears ${patient.risk.level} risk (${Math.round(patient.risk.probability*100)}%).\n• Consider close monitoring and labs.` });
  }
  try {
    const prompt = `Create a concise, point-wise clinical summary for a hematology patient. Include: demographics, diagnosis, recent vitals (WBC, Hb, Platelets), and key risk drivers. Keep it under 5 bullets.\n\nData:\nName: ${patient.name}\nID: ${patient.id}\nAge: ${patient.age}\nGender: ${patient.gender}\nDx: ${patient.diagnosis}\nWBC: ${patient.vitals.wbc.at(-1)}\nHb: ${patient.vitals.hb.at(-1)}\nPlatelets: ${patient.vitals.platelets.at(-1)}\nRisk: ${patient.risk.level} (${Math.round(patient.risk.probability*100)}%)\nRisk drivers: ${patient.riskDrivers.join(', ')}`;
    const res = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + key, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Summary not available.";
    return Response.json({ result: text });
  } catch (e) {
    return Response.json({ result: "AI service failed. Please try again later." });
  }
}


