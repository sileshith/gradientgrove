import SiteNav from "@/components/SiteNav";
import MathLab from "@/components/MathLab";

export default function LabPage() {
  return (
    <div className="min-h-screen bg-grove-dark">
      <SiteNav note="Math Lab" />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-white mb-3">
          Linear algebra + matrices + calculus, in harmony
        </h1>
        <p className="text-slate-400 mb-8">
          The same three tools show up in house prices, medical flags, fraud,
          credit decisions, and lane keeping. Drag the sliders. Watch the
          prediction change.
        </p>
        <MathLab />
      </div>
    </div>
  );
}
