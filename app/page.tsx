import Image from "next/image";
import Link from "next/link";
import { Apple, ArrowRight, BookOpen, Code2 } from "lucide-react";
import SiteNav from "@/components/SiteNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-grove-dark">
      <SiteNav />

      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="Hirpa SciML Academy logo"
            width={72}
            height={72}
            className="rounded-2xl"
            priority
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          How do computers <span className="text-sciml-green">see fruit?</span>
        </h1>
        <p className="text-lg text-slate-300 italic mb-3">
          Rigor through intuition, not rigor through proof.
        </p>
        <p className="text-slate-400 max-w-xl mx-auto mb-8">
          A 3-lesson adventure. Learn how a phone recognizes apples, oranges,
          and bananas using simple math, a pencil, and a browser.
        </p>
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 bg-sciml-green text-grove-dark px-8 py-3 rounded-lg font-semibold"
        >
          Start Learning <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-center mb-8 text-white">
          3 lessons. Zero installs.
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              num: "1",
              icon: BookOpen,
              title: "Pixels Are Just Numbers",
              desc: "Draw an apple on a grid. Then see it stored as [255, 0, 0].",
            },
            {
              num: "2",
              icon: Code2,
              title: "Finding the Edge of a Fruit",
              desc: "Slide a 3x3 math window. Where numbers jump, that is an edge.",
            },
            {
              num: "3",
              icon: Apple,
              title: "Apple or Orange?",
              desc: "Score redness, roundness, and stems. Highest score wins.",
            },
          ].map((step) => (
            <div
              key={step.num}
              className="bg-grove-panel p-5 rounded-xl border border-grove-border text-center"
            >
              <div className="text-3xl font-bold text-math-purple mb-2">
                {step.num}
              </div>
              <step.icon className="w-7 h-7 text-code-cyan mx-auto mb-3" />
              <div className="font-semibold text-white mb-2">{step.title}</div>
              <div className="text-sm text-slate-400">{step.desc}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-slate-500 mt-6">
          Pencil → Code → SciML App. No blocks.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-4">
        <Link
          href="/lab"
          className="bg-grove-panel rounded-xl border border-grove-border p-6 hover:border-math-purple/50"
        >
          <h3 className="text-white font-bold mb-2">Math Lab</h3>
          <p className="text-sm text-slate-400">
            See linear algebra, matrices, and calculus work together on house
            prices, cancer flags, fraud, credit, and self-driving.
          </p>
        </Link>
        <Link
          href="/medtech"
          className="bg-grove-panel rounded-xl border border-grove-border p-6 hover:border-code-cyan/50"
        >
          <h3 className="text-white font-bold mb-2">MedTech hiring map</h3>
          <p className="text-sm text-slate-400">
            Five medical AI companies and the exact math (convolution, U-Net,
            PINNs) linked to these lessons.
          </p>
        </Link>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-grove-panel rounded-xl border border-intuition-amber/20 p-6 text-center">
          <h3 className="text-lg font-bold text-intuition-amber mb-2">
            Continue to the Full Fruit Vision Course
          </h3>
          <p className="text-sm text-slate-400 mb-4">
            More lessons coming: neural nets, training your own classifier, and
            a real fruit recognition app.
          </p>
          <a
            href="mailto:hirpast@gmail.com?subject=Fruit%20Vision%20waitlist"
            className="inline-block bg-intuition-amber text-grove-dark px-6 py-2 rounded-lg font-semibold text-sm"
          >
            Join waitlist
          </a>
        </div>
      </section>

      <footer className="border-t border-grove-border py-8 text-center text-slate-500">
        © 2026 Hirpa SciML Academy. Built with ❤️ for SciML education.
      </footer>
    </div>
  );
}
