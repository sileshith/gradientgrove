"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { CheckCircle, Loader2, Play, RotateCcw, XCircle } from "lucide-react";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

type PyodideLike = {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (opts: { batched: (text: string) => void }) => void;
  loadPackage: (names: string[]) => Promise<void>;
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
      const py = await loader({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/",
      });
      await py.loadPackage(["numpy"]);
      return py;
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
  tests: string;
}) {
  const [code, setCode] = useState(template);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [passed, setPassed] = useState<boolean | null>(null);
  const pyRef = useRef<PyodideLike | null>(null);

  useEffect(() => {
    loadPy()
      .then((py) => {
        pyRef.current = py;
        setReady(true);
      })
      .catch((err) => setError(String(err)));
  }, []);

  async function run() {
    if (!pyRef.current) return;
    setBusy(true);
    setOutput("");
    setError(null);
    setPassed(null);
    try {
      let captured = "";
      pyRef.current.setStdout({
        batched: (text) => {
          captured += `${text}\n`;
        },
      });
      await pyRef.current.runPythonAsync(code);
      setOutput(captured.trim());
      if (tests.trim()) {
        try {
          await pyRef.current.runPythonAsync(tests);
          setPassed(true);
        } catch (testError) {
          setPassed(false);
          setError(`Test failed: ${String(testError)}`);
        }
      }
    } catch (runError) {
      setError(runError instanceof Error ? runError.message : String(runError));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-grove-border">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={run}
            disabled={!ready || busy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sciml-green text-grove-dark disabled:bg-slate-700 disabled:text-slate-500"
          >
            {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            {busy ? "Running..." : "Run Code"}
          </button>
          <button
            type="button"
            onClick={() => {
              setCode(template);
              setOutput("");
              setError(null);
              setPassed(null);
            }}
            className="flex items-center gap-1 px-2 py-1.5 text-xs text-slate-500 hover:text-white"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Show the solution? Try it yourself first.")) {
                setCode(solution);
              }
            }}
            className="px-2 py-1.5 text-xs text-slate-500 hover:text-intuition-amber"
          >
            Solution
          </button>
        </div>
        <div className="text-xs">
          {!ready && (
            <span className="text-intuition-amber flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" /> Loading Python + NumPy...
            </span>
          )}
          {passed === true && (
            <span className="text-sciml-green flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Tests passed
            </span>
          )}
          {passed === false && (
            <span className="text-red-400 flex items-center gap-1">
              <XCircle className="w-3 h-3" /> Tests failed
            </span>
          )}
        </div>
      </div>
      <div className="flex-1 min-h-[220px]">
        <Editor
          value={code}
          onChange={(value) => setCode(value || "")}
          language="python"
          theme="vs-dark"
          options={{
            fontSize: 13,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
      <div className="h-36 border-t border-grove-border bg-grove-dark/80 overflow-auto p-3">
        {error ? (
          <pre className="text-xs text-red-400 whitespace-pre-wrap">{error}</pre>
        ) : output ? (
          <pre className="text-xs text-slate-300 whitespace-pre-wrap">{output}</pre>
        ) : (
          <p className="text-xs text-slate-600">Run your code to see output here.</p>
        )}
      </div>
    </div>
  );
}
