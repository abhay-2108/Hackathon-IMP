"use client";
// Lightweight inline SVG line chart with multiple series
export default function SimpleLineChart({ labels, series }) {
  const width = 520;
  const height = 160;
  const padding = 24;
  const maxY = Math.max(...series.flatMap(s => s.data));
  const minY = Math.min(...series.flatMap(s => s.data));
  const rangeY = maxY - minY || 1;
  const color = ["#2563eb", "#16a34a", "#db2777", "#f59e0b"]; // blue, green, pink, amber

  const x = (i, n) => padding + (i * (width - 2 * padding)) / Math.max(1, n - 1);
  const y = (v) => height - padding - ((v - minY) * (height - 2 * padding)) / rangeY;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <rect x="0" y="0" width={width} height={height} fill="transparent" />
      {/* axes */}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#999" strokeWidth="0.5" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#999" strokeWidth="0.5" />
      {series.map((s, si) => {
        const d = s.data.map((v, i) => `${i === 0 ? "M" : "L"}${x(i, s.data.length)},${y(v)}`).join(" ");
        return (
          <g key={s.name}>
            <path d={d} fill="none" stroke={color[si % color.length]} strokeWidth="2" />
            {s.data.map((v, i) => (
              <circle key={i} cx={x(i, s.data.length)} cy={y(v)} r="2" fill={color[si % color.length]} />
            ))}
            <text x={width - padding} y={padding - 6 + 12 * (si + 1)} fontSize="10" textAnchor="end" fill={color[si % color.length]}>
              {s.name}
            </text>
          </g>
        );
      })}
      {/* x-axis labels */}
      {labels.map((l, i) => (
        <text key={i} x={x(i, labels.length)} y={height - 6} fontSize="9" textAnchor="middle" fill="#999">{l}</text>
      ))}
    </svg>
  );
}


