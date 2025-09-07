"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle(){
  const [theme, setTheme] = useState("dark");
  useEffect(()=>{
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const t = saved || "dark";
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t === "light" ? "light" : "dark");
  },[]);
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (typeof window !== "undefined") localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next === "light" ? "light" : "dark");
  };
  return (
    <button className="btn" aria-label="Toggle theme" onClick={toggle}>{theme === "light" ? "🌞" : "🌙"}</button>
  );
}


