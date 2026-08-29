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

## The Three-Step Pipeline

Every lesson follows this pedagogical flow:

1. **Pencil** - Draw and write first
2. **Code** - Monaco editor plus Pyodide (Python and NumPy in the browser)
3. **SciML App** - Pixel Painter, Fruit Edge Detector, or Fruit Classifier

## Available Lessons

| Lesson | Slug | App |
| --- | --- | --- |
| Pixels Are Just Numbers | `pixels-are-just-numbers` | Pixel Painter |
| Finding the Edge of a Fruit | `fruit-edges` | Fruit Edge Detector |
| Apple or Orange? | `fruit-classifier` | Fruit Classifier |

Also: [Math Lab](https://learn.hirpadata.com/lab) and [MedTech hiring map](https://learn.hirpadata.com/medtech).

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
