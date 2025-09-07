export default function SimpleBarChart({ labels, values }) {
  const nums = values.map((v) => Number(v));
  const maxAbs = Math.max(...nums.map((v) => Math.abs(isFinite(v) ? v : 0)), 1);
  return (
    <div className="grid grid-cols-3 gap-3 items-end h-32">
      {nums.map((raw, i) => {
        const v = isFinite(raw) ? raw : 0;
        const pct = (Math.abs(v) / maxAbs) * 100;
        const heightPct = Math.max(pct, v === 0 ? 2 : 6); // ensure visibility
        const color = v > 0 ? 'var(--success)' : v < 0 ? 'var(--danger)' : 'color-mix(in srgb, var(--foreground) 30%, transparent)';
        return (
          <div key={i} className="flex flex-col items-center gap-1" aria-label={`${labels[i]} delta ${v}`}>
            <div
              className="w-8"
              style={{ height: `${heightPct}%`, background: color, borderRadius: 4 }}
              title={`${labels[i]}: ${v}`}
            />
            <div className="text-[10px] opacity-70 text-center">{labels[i]}</div>
          </div>
        );
      })}
    </div>
  );
}


