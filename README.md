# Gradient Grove

> Rigor through intuition, not rigor through proof.

A SciML (Scientific Machine Learning) learning platform built with Next.js, Pyodide, and interactive visualizations.

## Quick Start

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

| Tool | Role |
| --- | --- |
| Next.js 14 (App Router) | React framework |
| Tailwind CSS | Styling |
| TypeScript | Type safety |
| Monaco Editor | In-browser code editor (VS Code) |
| Pyodide | Python in the browser via WebAssembly |
| Lucide React | Icons |

## The Four-Step Pipeline

Every lesson follows this pedagogical flow:

1. **Pencil** - Hand-written math on a grid canvas (think first)
2. **Blocks** - Drag-and-drop logic that generates Python
3. **Code** - Monaco editor plus Pyodide (real Python in the browser)
4. **SciML App** - A scientific application (crop yield, gradient hiker, edge detection)

## Available Lessons

| Lesson | Slug | Track | Concept |
| --- | --- | --- | --- |
| Area of a Square | `area-of-a-square` | Explorer | Numerical integration, pixel counting |
| Slope of a Curve | `slope-of-a-curve` | Builder | Derivatives, gradient descent |
| Patterns in Grids | `patterns-in-grids` | Explorer | Convolution, edge detection |

## Adding a New Lesson

1. Edit `lib/lessons.ts` and add a new `Lesson` object.
2. Implement the SciML app in `components/SciMLApp.tsx`.
3. Test at `/learn/YOUR-LESSON-SLUG`.

## Deployment

See [DEPLOY.md](./DEPLOY.md) for setup steps. Live site: [learn.hirpadata.com](https://learn.hirpadata.com).

## Roadmap

### Phase 1: Core Loop (Now)

- [x] Four-panel layout
- [x] Scratchpad (canvas drawing)
- [x] Block builder (drag-and-drop)
- [x] Code editor (Monaco + Pyodide)
- [x] Three lessons

### Phase 2: Polish (Next)

- [ ] User auth and progress tracking (Supabase)
- [ ] Full Excalidraw integration
- [ ] Full Blockly integration
- [ ] Math OCR (convert drawings to LaTeX)
- [ ] Auto-grading system

### Phase 3: Scale (Future)

- [ ] 10+ lessons across all tracks
- [ ] Community challenges
- [ ] Mobile optimization
- [ ] Multi-language support

## License

MIT License. Built with ❤️ for SciML education.

## Author

Sileshi Hirpa  
Portfolio: [hirpadata.com](https://hirpadata.com)
