// Simple mock data for demo and scaffolding
export const mockPatients = Array.from({ length: 12 }).map((_, i) => {
  const id = `P-${(i + 1).toString().padStart(3, "0")}`;
  const age = 30 + ((i * 7) % 40);
  const genders = ["Male", "Female"];
  const gender = genders[i % 2];
  const prob = Math.max(0.05, Math.min(0.95, 0.2 + (12 - i) * 0.05));
  const level = prob > 0.7 ? "High" : prob > 0.3 ? "Medium" : "Low";
  const points = 14;
  const series = (base) => Array.from({ length: points }).map((__, d) => {
    const v = base + Math.sin(d / 2 + i) * base * 0.1 + d * 0.7;
    return Math.max(1, Math.round(v));
  });
  const rbcSeries = Array.from({ length: points }).map((__, d) => {
    const v = 4.0 + (i%3)*0.2 + Math.sin(d/3+i)*0.2 + d*0.02;
    return Math.round(v * 10)/10;
  });
  return {
    id,
    name: `Patient ${i + 1}`,
    age,
    gender,
    bloodGroup: ["A+","B+","O+","AB+"][i % 4],
    height: 160 + (i % 10),
    weight: 60 + (i % 15),
    diagnosis: ["AML","CML","MDS"][i % 3],
    symptoms: ["Fatigue","Fever","Bruising","Weight loss","Night sweats"].slice(0, (i % 5) + 1),
    risk: { probability: prob, level },
    vitals: {
      wbc: series(6),
      hb: series(12),
      rbc: rbcSeries,
      platelets: series(200),
      dates: Array.from({ length: points }).map((__, d) => `Day ${d + 1}`),
    },
    riskDrivers: ["High Blast Percentage","NPM1 Mutation","Low Platelets"].slice(0, (i % 3) + 1),
    labs: { ldh: 250 + i * 5, calcium: 9 + (i % 3) * 0.2, albumin: 4 - (i % 3) * 0.1 },
  };
});


