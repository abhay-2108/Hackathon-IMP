"use client";
import { useEffect, useState } from "react";
import { sCacheGet, sCacheSet } from "../../../utils/cache";

export default function BasicLibrary(){
  const [md, setMd] = useState("");
  useEffect(()=>{
    const cached = sCacheGet("md:basic");
    if (cached) { setMd(cached); return; }
    fetch("/scenarios/PATIENT_SCENARIOS.md").then(r=>r.text()).then((t)=>{ setMd(t); sCacheSet("md:basic", t); }).catch(()=>setMd("Failed to load scenarios."));
  },[]);
  const sections = parseMarkdownToSections(md);
  return (
    <div className="space-y-4">
      <div className="font-medium text-lg">Patient Scenarios</div>
      {sections.map((s, idx) => (
        <article key={idx} className="card">
          {s.title && <h2 className="font-semibold mb-2">{s.title}</h2>}
          {s.subtitle && <h3 className="opacity-80 mb-1">{s.subtitle}</h3>}
          {s.paragraphs.map((p, i) => (
            <p key={i} className="text-sm mb-2 opacity-90">{renderInline(p)}</p>
          ))}
          {s.list.length > 0 && (
            <ul className="list-disc list-inside text-sm space-y-1">
              {s.list.map((li, i) => (
                <li key={i}>{renderInline(li)}</li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}

function parseMarkdownToSections(md){
  if (!md) return [];
  const lines = md.split(/\r?\n/);
  const sections = [];
  let current = { title: "", subtitle: "", paragraphs: [], list: [] };
  for (const line of lines){
    if (line.startsWith("## ")){
      if (current.title || current.paragraphs.length || current.list.length){ sections.push(current); }
      current = { title: line.replace(/^##\s+/, ""), subtitle: "", paragraphs: [], list: [] };
    } else if (line.startsWith("### ")){
      current.subtitle = line.replace(/^###\s+/, "");
    } else if (/^\s*[-•]\s+/.test(line)){
      current.list.push(line.replace(/^\s*[-•]\s+/, ""));
    } else if (/^\s*\d+\.\s+/.test(line)){
      current.list.push(line.replace(/^\s*\d+\.\s+/, ""));
    } else if (line.trim().length === 0){
      // paragraph break
    } else {
      current.paragraphs.push(line.trim());
    }
  }
  if (current.title || current.paragraphs.length || current.list.length){ sections.push(current); }
  return sections;
}

function renderInline(text){
  const parts = [];
  const regex = /(P-\d{3})/g;
  let lastIndex = 0; let m;
  while ((m = regex.exec(text))){
    const before = text.slice(lastIndex, m.index);
    if (before) parts.push(before);
    const id = m[1];
    parts.push(<a key={parts.length} className="link" href={`/?patient=${id}`}>{id}</a>);
    lastIndex = regex.lastIndex;
  }
  const rest = text.slice(lastIndex);
  if (rest) parts.push(rest);
  return <>{parts}</>;
}
