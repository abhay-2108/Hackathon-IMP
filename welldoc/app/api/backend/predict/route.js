export async function POST(request) {
  try {
    const body = await request.json();

    // Extract with safe defaults
    const age = Number(body.age_numeric ?? 60);
    const timeInHospital = Number(body.time_in_hospital ?? 3);
    const numMeds = Number(body.num_medications ?? 10);
    const inpatientVisits = Number(body.number_inpatient ?? 0);
    const emergencyRatio = Number(body.emergency_ratio ?? 0);
    const a1c = Number(body.A1Cresult_encoded ?? 1); // rough categorical numeric
    const insulin = Number(body.insulin_binary ?? 0);

    // Simple heuristic scoring to mimic a calibrated probability (0..1)
    // This is a placeholder model implemented in JS to avoid a separate Python service.
    let score = 0;
    score += (timeInHospital - 3) * 0.08;
    score += (numMeds - 10) * 0.02;
    score += inpatientVisits * 0.15;
    score += emergencyRatio * 0.3;
    score += (a1c >= 2 ? 0.15 : 0); // elevated A1C
    score += insulin ? 0.1 : 0;
    score += (age >= 75 ? 0.07 : 0);

    // logistic squashing to (0,1)
    const logistic = (x) => 1 / (1 + Math.exp(-x));
    const probability = Math.max(0, Math.min(1, logistic(score)));

    let risk_level = "Low";
    if (probability >= 0.7) risk_level = "High";
    else if (probability >= 0.3) risk_level = "Medium";

    const prediction = probability >= 0.5 ? 1 : 0;

    return Response.json({
      prediction,
      probability,
      risk_level,
      model_version: "heuristic_js_v1.0"
    });
  } catch (e) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}


