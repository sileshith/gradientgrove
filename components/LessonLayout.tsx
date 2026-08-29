"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LessonLayout({
  title,
  subtitle,
  track,
  scratchpad,
  code,
  sciml,
}: {
  title: string;
  subtitle: string;
  track: string;
  scratchpad: ReactNode;
  code: ReactNode;
  sciml: ReactNode;
}) {
  const [tab, setTab] = useState<"scratchpad" | "code" | "sciml">("scratchpad");
  const tabs = [
    { id: "scratchpad" as const, label: "Pencil", cls: "text-pink-400 bg-pink-400/10 border-pink-400/30" },
    { id: "code" as const, label: "Code", cls: "text-sky-400 bg-sky-400/10 border-sky-400/30" },
    { id: "sciml" as const, label: "SciML App", cls: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30" },
  ];
  const panels = { scratchpad, code, sciml };

  return (
    <div className="min-h-screen bg-grove-dark flex flex-col text-white">
      <header className="border-b border-grove-border bg-grove-panel/80 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/learn"
            className="text-slate-400 hover:text-white text-sm inline-flex items-center gap-2 mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to lessons
          </Link>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Gradient Grove logo"
                width={36}
                height={36}
                className="rounded-lg shrink-0"
              />
              <div>
                <h1 className="text-xl font-bold">{title}</h1>
                <p className="text-sm text-slate-400">{subtitle}</p>
              </div>
            </div>
            <span className="text-xs uppercase tracking-wider text-slate-500">
              {track}
            </span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-4 gap-4">
        <div className="flex gap-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border ${
                tab === item.id
                  ? item.cls
                  : "bg-grove-panel text-slate-500 border-transparent"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex-1 bg-grove-panel rounded-xl border border-grove-border overflow-hidden min-h-[600px]">
          <div className={`h-full ${tab === "scratchpad" ? "block" : "hidden"}`}>
            {panels.scratchpad}
          </div>
          <div className={`h-full ${tab === "code" ? "block" : "hidden"}`}>
            {panels.code}
          </div>
          <div className={`h-full ${tab === "sciml" ? "block" : "hidden"}`}>
            {panels.sciml}
          </div>
        </div>
      </div>
    </div>
  );
}
