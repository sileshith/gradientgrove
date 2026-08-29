"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Monaco = dynamic(() => import("@monaco-editor/react"), { ssr: false });

type PyodideLike = {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (opts: { batched: (text: string) => void }) => void;
};

let pyodidePromise: Promise<PyodideLike> | null = null;

async function loadPy(): Promise<PyodideLike> {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js";
      document.body.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Pyodide"));
      });
      const loader = (
        window as unknown as {
          loadPyodide: (opts: { indexURL: string }) => Promise<PyodideLike>;
        }
      ).loadPyodide;
      return loader({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/",
      });
    })();
  }
  return pyodidePromise;
}

export default function CodeEditor({
  template,
  solution,
  tests,
}: {
  template: string;
  solution: string;
  tests: string[];
}) {
  const [code, setCode] = useState(template);
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);

  async function run(extra = "") {
    setBusy(true);
    setOutput("Loading Python in the browser...");
    try {
      const py = await loadPy();
      let stdout = "";
      py.setStdout({
        batched: (text) => {
          stdout += text;
        },
      });
      await py.runPythonAsync(`${code}\n${extra}`);
      setOutput(stdout.trim() || "Ran with no printed output.");
    } catch (error) {
      setOutput(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="h-full flex flex-col gap-3 min-h-[280px]">
      <div className="flex-1 min-h-[180px] rounded-lg overflow-hidden border border-slate-700">
        <Monaco
          height="100%"
          defaultLanguage="python"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value ?? "")}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            scrollBeyondLastLine: false,
          }}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => run()}
          disabled={busy}
          className="px-3 py-1.5 rounded-lg bg-code-cyan text-grove-dark text-sm font-medium disabled:opacity-50"
        >
          {busy ? "Running..." : "Run"}
        </button>
        <button
          type="button"
          onClick={() => run(tests.join("\n") + '\nprint("All tests passed")')}
          disabled={busy}
          className="px-3 py-1.5 rounded-lg bg-sciml-green/20 text-sciml-green text-sm"
        >
          Run tests
        </button>
        <button
          type="button"
          onClick={() => setCode(solution)}
          className="px-3 py-1.5 rounded-lg text-slate-400 text-sm hover:text-white"
        >
          Show solution
        </button>
      </div>
      <pre className="text-xs text-slate-300 bg-grove-dark rounded-lg p-3 overflow-auto min-h-[72px] max-h-32">
        {output || "Output appears here."}
      </pre>
    </div>
  );
}
