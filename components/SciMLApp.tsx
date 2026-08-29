"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { RotateCcw, Info, Play, Lightbulb } from "lucide-react";

interface SciMLAppProps {
  slug: string;
  description: string;
}

// ==================== LESSON 1: PIXEL PAINTER ====================
function PixelPainterApp() {
  const gridSize = 8;
  const cellSize = 40;
  const colors: Record<string, [number, number, number]> = {
    red: [255, 0, 0],
    green: [0, 255, 0],
    yellow: [255, 255, 0],
    orange: [255, 165, 0],
    white: [255, 255, 255],
    brown: [139, 69, 19],
  };
  const colorNames = ["red", "green", "yellow", "orange", "white", "brown"] as const;
  type ColorName = typeof colorNames[number];

  const [grid, setGrid] = useState<ColorName[][]>(() =>
    Array(gridSize).fill(null).map(() => Array(gridSize).fill("white"))
  );
  const [activeColor, setActiveColor] = useState<ColorName>("red");
  const [showNumbers, setShowNumbers] = useState(false);

  const paintCell = (r: number, c: number) => {
    setGrid((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = activeColor;
      return next;
    });
  };

  const clearGrid = () => setGrid(Array(gridSize).fill(null).map(() => Array(gridSize).fill("white")));

  const rgbString = (name: ColorName) => {
    const [r, g, b] = colors[name];
    return `rgb(${r},${g},${b})`;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-grove-border">
        <h3 className="text-sm font-bold text-grove-accent">🎨 Pixel Painter</h3>
        <p className="text-xs text-slate-500 mt-1">Click cells to paint. Each color is stored as 3 numbers [R, G, B].</p>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 border-b border-grove-border bg-grove-dark/30 flex-wrap">
        {colorNames.map((c) => (
          <button key={c} onClick={() => setActiveColor(c)} className={`px-2 py-1 rounded text-xs capitalize border ${activeColor === c ? "border-white text-white" : "border-transparent text-slate-500"}`} style={{ backgroundColor: rgbString(c) === "rgb(255,255,255)" ? "#334155" : rgbString(c), color: c === "white" || c === "yellow" ? "#0f172a" : "#fff" }}>
            {c}
          </button>
        ))}
        <div className="flex-1" />
        <button onClick={() => setShowNumbers(!showNumbers)} className={`text-xs px-2 py-1 rounded ${showNumbers ? "bg-sky-400/20 text-sky-400" : "text-slate-500"}`}><Lightbulb className="w-3 h-3 inline mr-1"/>{showNumbers ? "Hide" : "Show"} Numbers</button>
        <button onClick={clearGrid} className="text-xs text-slate-500 hover:text-red-400"><RotateCcw className="w-3 h-3 inline mr-1"/>Clear</button>
      </div>

      <div className="flex-1 overflow-auto p-4 flex flex-col items-center gap-4">
        {/* The grid */}
        <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)` }}>
          {grid.map((row, r) => row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => paintCell(r, c)}
              className="rounded-sm border border-grove-border flex items-center justify-center text-[9px] font-mono hover:opacity-90 transition-opacity"
              style={{ width: cellSize, height: cellSize, backgroundColor: rgbString(cell), color: cell === "white" || cell === "yellow" ? "#0f172a" : "#fff" }}
            >
              {showNumbers ? `[${colors[cell].join(",")}]` : ""}
            </button>
          )))}
        </div>

        {/* The matrix view */}
        <div className="w-full max-w-md bg-grove-dark rounded-lg border border-grove-border p-3">
          <div className="text-xs font-semibold text-slate-500 mb-2">Computer View (RGB Matrix)</div>
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
            {grid.map((row, r) => row.map((cell, c) => (
              <div key={`m-${r}-${c}`} className="text-[8px] font-mono text-center text-slate-400 bg-grove-panel rounded py-1">
                {colors[cell].join(",")}
              </div>
            )))}
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-grove-border bg-grove-dark/50">
        <div className="text-xs text-slate-600">
          <Info className="w-3 h-3 inline mr-1" />
          Your phone camera stores every photo exactly like this — a giant grid of [R,G,B] numbers. 
          A 12-megapixel photo = 12 million sets of 3 numbers!
        </div>
      </div>
    </div>
  );
}

// ==================== LESSON 2: FRUIT EDGE DETECTOR ====================
function FruitEdgeApp() {
  const [fruitType, setFruitType] = useState<"apple" | "orange" | "banana">("apple");
  const [showKernel, setShowKernel] = useState(false);
  const [applied, setApplied] = useState(false);

  const fruitImages: Record<string, number[][]> = {
    apple: [
      [0,0,0,1,1,0,0,0],
      [0,0,1,1,1,1,0,0],
      [0,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,0],
      [0,0,1,1,1,1,0,0],
      [0,0,0,1,1,0,0,0],
      [0,0,0,0,0,0,0,0],
    ],
    orange: [
      [0,0,1,1,1,1,0,0],
      [0,1,1,1,1,1,1,0],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [0,1,1,1,1,1,1,0],
      [0,0,1,1,1,1,0,0],
    ],
    banana: [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,1,1],
      [0,0,0,0,1,1,1,0],
      [0,0,0,1,1,1,0,0],
      [0,0,1,1,1,0,0,0],
      [0,1,1,1,0,0,0,0],
      [1,1,1,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
    ],
  };

  const kernel = [
    [-1,-1,-1],
    [-1, 8,-1],
    [-1,-1,-1],
  ];

  const convolve = (img: number[][]) => {
    const out = img.map((row) => [...row]);
    for (let i = 1; i < 7; i++) {
      for (let j = 1; j < 7; j++) {
        let sum = 0;
        for (let ki = -1; ki <= 1; ki++) {
          for (let kj = -1; kj <= 1; kj++) {
            sum += img[i+ki][j+kj] * kernel[ki+1][kj+1];
          }
        }
        out[i][j] = sum > 0 ? 1 : 0;
      }
    }
    return out;
  };

  const current = fruitImages[fruitType];
  const edges = applied ? convolve(current) : current;

  const cellClass = (v: number) => v ? "bg-emerald-400" : "bg-grove-dark border border-grove-border";

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-grove-border">
        <h3 className="text-sm font-bold text-grove-accent">🔍 Fruit Edge Detector</h3>
        <p className="text-xs text-slate-500 mt-1">Pick a fruit, then apply the edge detector kernel to find its outline!</p>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 border-b border-grove-border bg-grove-dark/30">
        {(["apple", "orange", "banana"] as const).map((f) => (
          <button key={f} onClick={() => { setFruitType(f); setApplied(false); }} className={`px-3 py-1 rounded text-xs capitalize ${fruitType === f ? "bg-grove-accent text-grove-dark font-semibold" : "text-slate-500 border border-grove-border"}`}>
            {f}
          </button>
        ))}
        <div className="flex-1" />
        <button onClick={() => setShowKernel(!showKernel)} className={`text-xs px-2 py-1 rounded ${showKernel ? "bg-sky-400/20 text-sky-400" : "text-slate-500"}`}><Lightbulb className="w-3 h-3 inline mr-1"/>Kernel</button>
      </div>

      <div className="flex-1 overflow-auto p-4 flex flex-col items-center gap-4">
        {/* Original vs Edge side by side */}
        <div className="flex gap-6 items-start">
          <div className="text-center">
            <div className="text-xs text-slate-500 mb-2">Original Fruit</div>
            <div className="grid grid-cols-8 gap-0.5">
              {current.map((row, r) => row.map((v, c) => (
                <div key={`o-${r}-${c}`} className={`w-6 h-6 rounded-sm ${v ? "bg-amber-400" : "bg-grove-dark border border-grove-border"}`} />
              )))}
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs text-slate-500 mb-2">{applied ? "Edges Found!" : "After Edge Detection"}</div>
            <div className="grid grid-cols-8 gap-0.5">
              {edges.map((row, r) => row.map((v, c) => (
                <div key={`e-${r}-${c}`} className={`w-6 h-6 rounded-sm ${v ? "bg-pink-400" : "bg-grove-dark border border-grove-border"}`} />
              )))}
            </div>
          </div>
        </div>

        {/* Kernel visualization */}
        {showKernel && (
          <div className="bg-grove-dark rounded-lg border border-grove-border p-3">
            <div className="text-xs text-slate-500 mb-2">The 3×3 Edge Detector Kernel</div>
            <div className="grid grid-cols-3 gap-1 w-fit mx-auto">
              {kernel.flat().map((v, i) => (
                <div key={i} className="w-10 h-10 rounded flex items-center justify-center text-xs font-mono bg-grove-panel text-sky-400 border border-grove-border">
                  {v}
                </div>
              ))}
            </div>
            <div className="text-[10px] text-slate-600 mt-2 text-center">Center = 8, Neighbors = -1. Sum = 0 if all same, ≠0 if edge!</div>
          </div>
        )}

        <button onClick={() => setApplied(!applied)} className="px-6 py-2 rounded-lg text-sm font-semibold bg-grove-accent text-grove-dark hover:bg-emerald-400 transition-colors">
          {applied ? "🔄 Reset" : "⚡ Find Edges!"}
        </button>
      </div>

      <div className="px-4 py-3 border-t border-grove-border bg-grove-dark/50">
        <div className="text-xs text-slate-600">
          <Info className="w-3 h-3 inline mr-1" />
          The kernel slides over every pixel. If a pixel and its neighbors are all the same (inside the fruit), they cancel out (sum = 0). 
          At the EDGE, neighbors are different, so the sum is NOT zero. That's how the computer finds the outline!
        </div>
      </div>
    </div>
  );
}

// ==================== LESSON 3: FRUIT CLASSIFIER ====================
function FruitClassifierApp() {
  const [weights, setWeights] = useState({
    red: 10, round: 5, stem: 3,
    orange: 10, bumpy: 4,
    yellow: 10, long: 8,
  });

  const fruits = [
    { name: "Mystery A", features: { red: 9, round: 5, stem: 3, orange: 0, bumpy: 0, yellow: 0, long: 0 } },
    { name: "Mystery B", features: { red: 0, round: 7, stem: 0, orange: 9, bumpy: 4, yellow: 0, long: 0 } },
    { name: "Mystery C", features: { red: 0, round: 0, stem: 0, orange: 0, bumpy: 0, yellow: 9, long: 8 } },
    { name: "Mystery D", features: { red: 5, round: 6, stem: 2, orange: 3, bumpy: 1, yellow: 1, long: 2 } },
  ];

  const score = (fruit: typeof fruits[0]) => {
    const apple = fruit.features.red * weights.red + fruit.features.round * weights.round + fruit.features.stem * weights.stem;
    const orange = fruit.features.orange * weights.orange + fruit.features.round * weights.round + fruit.features.bumpy * weights.bumpy;
    const banana = fruit.features.yellow * weights.yellow + fruit.features.long * weights.long;
    const scores = { Apple: apple, Orange: orange, Banana: banana };
    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
    return { scores, winner: winner[0], winnerScore: winner[1] };
  };

  const weightSlider = (label: string, key: keyof typeof weights, color: string) => (
    <div className="flex items-center gap-2 mb-2">
      <span className="text-xs text-slate-400 w-16">{label}</span>
      <input
        type="range" min="0" max="20" value={weights[key]}
        onChange={(e) => setWeights((w) => ({ ...w, [key]: parseInt(e.target.value) }))}
        className="flex-1 h-1 bg-grove-border rounded-lg appearance-none cursor-pointer"
      />
      <span className={`text-xs font-mono w-6 text-right ${color}`}>{weights[key]}</span>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-grove-border">
        <h3 className="text-sm font-bold text-grove-accent">🍎🍊🍌 Fruit Classifier</h3>
        <p className="text-xs text-slate-500 mt-1">Adjust the feature weights. The computer scores each fruit and picks the winner!</p>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Weight controls */}
        <div className="bg-grove-dark rounded-lg border border-grove-border p-3">
          <div className="text-xs font-semibold text-slate-500 mb-3">Feature Weights (points)</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <div>
              <div className="text-[10px] text-red-400 uppercase tracking-wider mb-1">Apple Features</div>
              {weightSlider("Redness", "red", "text-red-400")}
              {weightSlider("Roundness", "round", "text-slate-300")}
              {weightSlider("Has Stem", "stem", "text-amber-600")}
            </div>
            <div>
              <div className="text-[10px] text-orange-400 uppercase tracking-wider mb-1">Orange Features</div>
              {weightSlider("Orangeness", "orange", "text-orange-400")}
              {weightSlider("Bumpiness", "bumpy", "text-slate-300")}
              <div className="text-[10px] text-yellow-400 uppercase tracking-wider mb-1 mt-2">Banana Features</div>
              {weightSlider("Yellowness", "yellow", "text-yellow-400")}
              {weightSlider("Length", "long", "text-slate-300")}
            </div>
          </div>
        </div>

        {/* Classification results */}
        <div className="space-y-2">
          {fruits.map((fruit) => {
            const result = score(fruit);
            return (
              <div key={fruit.name} className="bg-grove-dark rounded-lg border border-grove-border p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white">{fruit.name}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    result.winner === "Apple" ? "bg-red-400/20 text-red-400" :
                    result.winner === "Orange" ? "bg-orange-400/20 text-orange-400" :
                    "bg-yellow-400/20 text-yellow-400"
                  }`}>{result.winner} ({result.winnerScore} pts)</span>
                </div>
                <div className="flex gap-3 text-xs">
                  <span className="text-slate-500">🍎 {result.scores.Apple}</span>
                  <span className="text-slate-500">🍊 {result.scores.Orange}</span>
                  <span className="text-slate-500">🍌 {result.scores.Banana}</span>
                </div>
                <div className="mt-2 text-[10px] text-slate-600">
                  Features: {Object.entries(fruit.features).filter(([,v]) => v > 0).map(([k,v]) => `${k}=${v}`).join(", ")}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-4 py-3 border-t border-grove-border bg-grove-dark/50">
        <div className="text-xs text-slate-600">
          <Info className="w-3 h-3 inline mr-1" />
          This is a LINEAR CLASSIFIER. Modern neural networks do the same thing — just with millions of features 
          and weights learned automatically from data. You just built the core idea!
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN DISPATCHER ====================
export default function SciMLApp({ slug, description }: SciMLAppProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-hidden">
        {(slug === "pixels-are-just-numbers" || slug === "area-of-a-square") && (
          <PixelPainterApp />
        )}
        {(slug === "fruit-edges" || slug === "slope-of-a-curve") && <FruitEdgeApp />}
        {(slug === "fruit-classifier" || slug === "patterns-in-grids") && (
          <FruitClassifierApp />
        )}
      </div>
      <div className="px-4 py-3 border-t border-grove-border bg-grove-dark/30">
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
