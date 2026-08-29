"use client";

import { useMemo, useState } from "react";

const SIZE = 12;

function emptyGrid() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

export default function SciMLApp({
  slug,
  description,
}: {
  slug: string;
  description: string;
}) {
  return (
    <div className="h-full flex flex-col gap-3 text-sm">
      <p className="text-slate-300">{description}</p>
      {slug === "area-of-a-square" && <CropYield />}
      {slug === "slope-of-a-curve" && <Hiker />}
      {slug === "patterns-in-grids" && <EdgeDetect />}
    </div>
  );
}

function CropYield() {
  const [grid, setGrid] = useState(emptyGrid);
  const painted = grid.flat().filter(Boolean).length;
  const yieldCount = painted * 10;

  function toggle(i: number, j: number) {
    setGrid((prev) =>
      prev.map((row, r) =>
        row.map((cell, c) => (r === i && c === j ? (cell ? 0 : 1) : cell))
      )
    );
  }

  return (
    <div>
      <Grid cells={grid} onToggle={toggle} />
      <p className="mt-3 text-sciml-green">
        Area: {painted} units · Predicted yield: {yieldCount} crops
      </p>
    </div>
  );
}

function Hiker() {
  const [start, setStart] = useState(6);
  const [rate, setRate] = useState(0.15);
  const path = useMemo(() => {
    const points = [start];
    let x = start;
    for (let i = 0; i < 18; i += 1) {
      const slope = 2 * (x - 6);
      x -= rate * slope;
      points.push(x);
    }
    return points;
  }, [start, rate]);
  const last = path[path.length - 1];

  return (
    <div className="space-y-3">
      <label className="block text-slate-400">
        Start x: {start.toFixed(1)}
        <input
          type="range"
          min={0}
          max={12}
          step={0.1}
          value={start}
          onChange={(event) => setStart(Number(event.target.value))}
          className="w-full"
        />
      </label>
      <label className="block text-slate-400">
        Learning rate: {rate.toFixed(2)}
        <input
          type="range"
          min={0.02}
          max={0.8}
          step={0.01}
          value={rate}
          onChange={(event) => setRate(Number(event.target.value))}
          className="w-full"
        />
      </label>
      <div className="h-32 bg-grove-dark rounded-lg relative overflow-hidden">
        {path.map((x, i) => (
          <span
            key={i}
            className="absolute w-2 h-2 rounded-full bg-intuition-amber"
            style={{
              left: `${(x / 12) * 100}%`,
              top: `${100 - Math.max(8, 100 - (x - 6) * (x - 6) * 4)}%`,
            }}
          />
        ))}
      </div>
      <p className="text-sciml-green">
        Hiker ends near x = {last.toFixed(2)} (valley is x = 6)
      </p>
    </div>
  );
}

function EdgeDetect() {
  const [grid, setGrid] = useState(emptyGrid);
  const edges = useMemo(() => {
    const next = emptyGrid();
    for (let i = 0; i < SIZE; i += 1) {
      for (let j = 0; j < SIZE; j += 1) {
        let sum = 0;
        for (const di of [-1, 0, 1]) {
          for (const dj of [-1, 0, 1]) {
            const ni = i + di;
            const nj = j + dj;
            if (ni < 0 || nj < 0 || ni >= SIZE || nj >= SIZE) continue;
            const kernel = di === 0 && dj === 0 ? 8 : -1;
            sum += grid[ni][nj] * kernel;
          }
        }
        next[i][j] = Math.abs(sum) > 0 ? 1 : 0;
      }
    }
    return next;
  }, [grid]);

  function toggle(i: number, j: number) {
    setGrid((prev) =>
      prev.map((row, r) =>
        row.map((cell, c) => (r === i && c === j ? (cell ? 0 : 1) : cell))
      )
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <p className="text-xs text-slate-500 mb-2">Draw</p>
        <Grid cells={grid} onToggle={toggle} />
      </div>
      <div>
        <p className="text-xs text-slate-500 mb-2">Edges</p>
        <Grid cells={edges} />
      </div>
    </div>
  );
}

function Grid({
  cells,
  onToggle,
}: {
  cells: number[][];
  onToggle?: (i: number, j: number) => void;
}) {
  return (
    <div
      className="grid gap-px bg-slate-700 p-px rounded-md w-fit"
      style={{ gridTemplateColumns: `repeat(${SIZE}, 14px)` }}
    >
      {cells.map((row, i) =>
        row.map((cell, j) => (
          <button
            key={`${i}-${j}`}
            type="button"
            onClick={() => onToggle?.(i, j)}
            className={`w-[14px] h-[14px] ${
              cell ? "bg-sciml-green" : "bg-grove-dark"
            }`}
            disabled={!onToggle}
          />
        ))
      )}
    </div>
  );
}
