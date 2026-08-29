"use client";

import { useState } from "react";
import type { Block } from "@/lib/lessons";

const TYPE_COLOR: Record<Block["type"], string> = {
  math: "bg-math-purple/20 text-math-purple",
  data: "bg-code-cyan/20 text-code-cyan",
  ml: "bg-sciml-green/20 text-sciml-green",
  control: "bg-intuition-amber/20 text-intuition-amber",
};

export default function BlockBuilder({
  blocks,
  onCodeChange,
}: {
  blocks: Block[];
  onCodeChange?: (code: string) => void;
}) {
  const [stack, setStack] = useState<Block[]>([]);
  const [inputs, setInputs] = useState<Record<string, string>>({});

  function codeFrom(next: Block[], nextInputs: Record<string, string>) {
    return next
      .map((block) => {
        const value = nextInputs[block.id] ?? "1";
        return block.pythonCode.replaceAll("{input}", value);
      })
      .join("\n");
  }

  function add(block: Block) {
    const next = [...stack, block];
    setStack(next);
    onCodeChange?.(codeFrom(next, inputs));
  }

  function updateInput(id: string, value: string) {
    const nextInputs = { ...inputs, [id]: value };
    setInputs(nextInputs);
    onCodeChange?.(codeFrom(stack, nextInputs));
  }

  function clear() {
    setStack([]);
    onCodeChange?.("");
  }

  const generated = codeFrom(stack, inputs);

  return (
    <div className="h-full flex flex-col gap-3 text-sm">
      <div className="flex flex-wrap gap-2">
        {blocks.map((block) => (
          <button
            key={block.id}
            type="button"
            onClick={() => add(block)}
            className={`px-3 py-2 rounded-lg ${TYPE_COLOR[block.type]} hover:opacity-80`}
          >
            {block.label}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-[120px] rounded-lg border border-slate-700 p-3 space-y-2 overflow-auto">
        {stack.length === 0 && (
          <p className="text-slate-500">Click blocks to stack them.</p>
        )}
        {stack.map((block, index) => (
          <div
            key={`${block.id}-${index}`}
            className="flex items-center gap-2 bg-grove-dark rounded-md px-3 py-2"
          >
            <span className="text-slate-200">{block.label}</span>
            {block.inputs?.includes("number") && (
              <input
                type="text"
                value={inputs[block.id] ?? ""}
                placeholder="value"
                onChange={(event) => updateInput(block.id, event.target.value)}
                className="w-24 bg-slate-800 text-white rounded px-2 py-1 text-xs"
              />
            )}
          </div>
        ))}
      </div>

      <pre className="text-xs text-code-cyan bg-grove-dark rounded-lg p-3 overflow-auto min-h-[72px]">
        {generated || "# generated Python appears here"}
      </pre>
      <button
        type="button"
        onClick={clear}
        className="self-start text-xs text-slate-400 hover:text-white"
      >
        Clear blocks
      </button>
    </div>
  );
}
