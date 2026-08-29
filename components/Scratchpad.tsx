"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Eraser, Download, Grid3X3 } from "lucide-react";

interface ScratchpadProps {
  task: string;
}

export default function Scratchpad({ task }: ScratchpadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [color, setColor] = useState("#e2e8f0");
  const [notes, setNotes] = useState("");

  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }, []);

  const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const { x, y } = getPos(e);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
  }, [getPos]);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const { x, y } = getPos(e);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.lineTo(x, y);
    ctx.strokeStyle = tool === "eraser" ? "#1e293b" : color;
    ctx.lineWidth = tool === "eraser" ? 20 : 2.5;
    ctx.lineCap = "round";
    ctx.stroke();
  }, [isDrawing, getPos, tool, color]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.closePath();
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (showGrid) drawGrid(ctx, canvas.width, canvas.height);
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 0.5;
    const step = 20;
    for (let x = 0; x <= w; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y <= h; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "my-math-drawing.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    clearCanvas();
  }, []);

  useEffect(() => { clearCanvas(); }, [showGrid]);

  return (
    <div className="h-full flex flex-col">
      {/* Task bar */}
      <div className="px-4 py-3 border-b border-grove-border bg-grove-dark/50">
        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{task}</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-grove-border bg-grove-dark/30">
        <button onClick={() => setTool("pen")} className={`p-1.5 rounded text-xs ${tool === "pen" ? "bg-pink-400/20 text-pink-400" : "text-slate-500"}`}>✏️ Pen</button>
        <button onClick={() => setTool("eraser")} className={`p-1.5 rounded text-xs ${tool === "eraser" ? "bg-pink-400/20 text-pink-400" : "text-slate-500"}`}><Eraser className="w-3 h-3 inline"/> Erase</button>
        <div className="w-px h-4 bg-grove-border mx-1" />
        {["#e2e8f0", "#ef4444", "#22c55e", "#eab308", "#f97316", "#38bdf8"].map((c) => (
          <button key={c} onClick={() => { setColor(c); setTool("pen"); }} className={`w-5 h-5 rounded-full border-2 ${color === c ? "border-white" : "border-transparent"}`} style={{ backgroundColor: c }} />
        ))}
        <div className="flex-1" />
        <button onClick={() => setShowGrid(!showGrid)} className={`p-1.5 rounded text-xs flex items-center gap-1 ${showGrid ? "text-sky-400" : "text-slate-500"}`}>
          <Grid3X3 className="w-3 h-3" /> Grid
        </button>
        <button onClick={clearCanvas} className="p-1.5 rounded text-xs text-slate-500 hover:text-red-400">Clear</button>
        <button onClick={downloadCanvas} className="p-1.5 rounded text-xs text-slate-500 hover:text-grove-accent flex items-center gap-1">
          <Download className="w-3 h-3" /> Save
        </button>
      </div>

      {/* Canvas + Notepad */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 relative min-h-0">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
        <div className="h-28 border-t border-grove-border shrink-0">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your answers, formulas, and discoveries here..."
            className="w-full h-full bg-grove-dark/50 p-3 text-sm text-slate-300 placeholder-slate-600 resize-none outline-none font-mono"
          />
        </div>
      </div>
    </div>
  );
}
