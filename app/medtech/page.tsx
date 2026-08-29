import Link from "next/link";
import SiteNav from "@/components/SiteNav";

const companies = [
  {
    name: "Tempus",
    focus: "Oncology data and AI diagnostics",
    math: "Matrices of patient features; linear models for risk scores",
  },
  {
    name: "PathAI",
    focus: "Pathology image recognition",
    math: "Convolution on tissue slides (same idea as fruit edges)",
  },
  {
    name: "Aidoc",
    focus: "ER imaging triage",
    math: "Classifiers that rank scans, like apple-or-orange scoring",
  },
  {
    name: "Recursion",
    focus: "Drug discovery from cell images",
    math: "Huge image matrices + learned weights",
  },
  {
    name: "Butterfly Network",
    focus: "Handheld ultrasound + AI",
    math: "Pixels as numbers, then convolution for structure",
  },
];

const slides = [
  {
    title: "Convolution",
    body: "A tiny window slides over an image and multiplies neighbors. That is how edges, vessels, and tumors get outlined.",
    href: "/learn/fruit-edges",
    link: "Try it on fruit edges",
  },
  {
    title: "U-Net",
    body: "A U-Net is a stack of convolutions that labels every pixel (organ vs background). It starts from the same RGB grid as Lesson 1.",
    href: "/learn/pixels-are-just-numbers",
    link: "See pixels as numbers",
  },
  {
    title: "PINNs",
    body: "Physics-Informed Neural Networks add calculus: the model must also obey a derivative equation, not just fit labels.",
    href: "/lab",
    link: "Open the Math Lab",
  },
];

export default function MedTechPage() {
  return (
    <div className="min-h-screen bg-grove-dark">
      <SiteNav note="MedTech" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">
          Application track
        </p>
        <h1 className="text-3xl font-bold text-white mb-3">
          5 medical AI companies hiring, and the exact math you need
        </h1>
        <p className="text-slate-400 mb-10">
          Slide 1 is the company list. Slides 2 to 4 are the concepts, each
          linked to a live lesson.
        </p>

        <h2 className="text-xl font-semibold text-white mb-4">
          Slide 1: Company list
        </h2>
        <div className="space-y-3 mb-12">
          {companies.map((company, i) => (
            <div
              key={company.name}
              className="bg-grove-panel border border-grove-border rounded-xl p-4"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-math-purple font-bold">{i + 1}</span>
                <h3 className="text-white font-semibold">{company.name}</h3>
              </div>
              <p className="text-sm text-slate-300 mt-1">{company.focus}</p>
              <p className="text-xs text-slate-500 mt-2">{company.math}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-white mb-4">
          Slides 2 to 4: The concepts
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {slides.map((slide) => (
            <div
              key={slide.title}
              className="bg-grove-panel border border-grove-border rounded-xl p-5"
            >
              <h3 className="text-code-cyan font-semibold mb-2">{slide.title}</h3>
              <p className="text-sm text-slate-400 mb-4">{slide.body}</p>
              <Link href={slide.href} className="text-sm text-sciml-green hover:underline">
                {slide.link}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
