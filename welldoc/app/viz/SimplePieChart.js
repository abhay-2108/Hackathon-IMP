export default function SimplePieChart({ labels, values }) {
  const total = values.reduce((s,v)=>s+v,0) || 1;
  const colors = ["#60a5fa", "#34d399", "#fbbf24", "#fb7185", "#a78bfa", "#f472b6"]; // softer palette
  let start = 0;
  const segments = values.map((v, i) => {
    const frac = v / total;
    const seg = { from: start, to: start + frac, color: colors[i % colors.length], label: labels[i] };
    start += frac;
    return seg;
  });

  const gradient = segments
    .map((s) => `${s.color} ${Math.round(s.from*100)}% ${Math.round(s.to*100)}%`)
    .join(", ");

  return (
    <div className="flex items-center gap-4">
      <div
        role="img"
        aria-label="Pie chart"
        style={{
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: `conic-gradient(${gradient})`,
          boxShadow: "inset 0 0 0 1px var(--border)",
        }}
      />
      <div className="text-xs space-y-1">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-2"><span className="w-3 h-3 inline-block rounded" style={{ background: s.color }}></span>{s.label}</div>
        ))}
      </div>
    </div>
  );
}


