"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Panels = {
  scratchpad: ReactNode;
  blocks: ReactNode;
  code: ReactNode;
  sciml: ReactNode;
};

const TABS = [
  { id: "scratchpad", label: "Pencil" },
  { id: "blocks", label: "Blocks" },
  { id: "code", label: "Code" },
  { id: "sciml", label: "SciML App" },
] as const;

export default function LessonLayout({
  title,
  subtitle,
  track,
  scratchpad,
  blocks,
  code,
  sciml,
}: {
  title: string;
  subtitle: string;
  track: string;
} & Panels) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("scratchpad");
  const panels: Panels = { scratchpad, blocks, code, sciml };

  return (
    <div className="min-h-screen bg-grove-dark text-white">
      <header className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/learn"
            className="text-slate-400 hover:text-white text-sm inline-flex items-center gap-2 mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to lessons
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Gradient Grove logo"
                width={36}
                height={36}
                className="rounded-lg shrink-0"
              />
              <div>
                <h1 className="text-2xl font-display font-bold">{title}</h1>
                <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
              </div>
            </div>
            <span className="text-xs uppercase tracking-wider text-slate-500">
              {track}
            </span>
          </div>
        </div>
      </header>

      <div className="lg:hidden border-b border-slate-800 px-4">
        <div className="flex gap-1 overflow-x-auto py-2">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap ${
                tab === item.id
                  ? "bg-math-purple text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="lg:hidden bg-grove-panel rounded-xl p-4 min-h-[70vh]">
          {panels[tab]}
        </div>
        <div className="hidden lg:grid grid-cols-2 grid-rows-2 gap-4 min-h-[80vh]">
          <Panel title="Pencil">{scratchpad}</Panel>
          <Panel title="Blocks">{blocks}</Panel>
          <Panel title="Code">{code}</Panel>
          <Panel title="SciML App">{sciml}</Panel>
        </div>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-grove-panel rounded-xl p-4 flex flex-col min-h-[360px] overflow-hidden">
      <h2 className="text-xs uppercase tracking-wider text-slate-500 mb-3">
        {title}
      </h2>
      <div className="flex-1 min-h-0">{children}</div>
    </section>
  );
}
