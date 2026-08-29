import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Code, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-grove-dark">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Image
              src="/logo.png"
              alt="Gradient Grove logo"
              width={56}
              height={56}
              className="rounded-2xl"
              priority
            />
            Gradient Grove
          </h1>
          <p className="text-xl text-slate-300 italic mb-4">
            Rigor through intuition, not rigor through proof.
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Learn Scientific Machine Learning from the ground up. From middle
            school to advanced undergrad, discover ML through interactive
            visualization, hands-on coding, and real scientific applications.
          </p>
        </section>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <FeatureCard
            icon={<BookOpen className="text-math-purple" size={32} />}
            title="Math-First Learning"
            description="Build intuition through hand-drawn math visualizations, and physical analogies before touching code."
          />
          <FeatureCard
            icon={<Code className="text-code-cyan" size={32} />}
            title="Code-Second Approach"
            description="Drag-and-drop blocks and simple Python code that actually runs in your browser - no installation needed."
          />
          <FeatureCard
            icon={<Sparkles className="text-sciml-green" size={32} />}
            title="Real SciML Applications"
            description="Apply what you learn to real scientific problems: crop yield prediction, gradient descent hikers, and more."
          />
        </div>

        <div className="text-center">
          <Link
            href="/learn"
            className="inline-block bg-math-purple hover:bg-purple-600 text-white font-bold text-lg px-8 py-4 rounded-lg"
          >
            Start Learning -&gt;
          </Link>
        </div>
      </div>

      <footer className="border-t border-slate-800 py-8 text-center text-slate-500">
        {"© 2026 Gradient Grove. Built with ❤️ for SciML education."}
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-grove-panel p-8 rounded-lg hover:bg-grove-panel/80 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}
