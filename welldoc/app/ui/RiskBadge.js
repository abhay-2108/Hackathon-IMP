export default function RiskBadge({ level, probability }) {
  const cls = level === "High" ? "badge-high" : level === "Medium" ? "badge-medium" : "badge-low";
  const icon = level === "High" ? "▲" : level === "Medium" ? "◆" : "●";
  return (
    <span className={`badge ${cls}`} aria-label={`Risk ${level} ${(probability * 100).toFixed(0)} percent`}>
      <span aria-hidden>{icon}</span>
      <span>{level}</span>
    </span>
  );
}


