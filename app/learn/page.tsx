import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getLessons } from "@/lib/lessons";

export default function LessonsPage() {
  const lessons = getLessons();

  return (
    <div className="min-h-screen bg-grove-dark">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="text-slate-400 hover:text-white text-sm mb-8 inline-block"
        >
          ← Back to home
        </Link>
        <h1 className="text-4xl font-display font-bold text-white mb-4">
          Learning Paths
        </h1>
        <p className="text-slate-400 text-lg mb-12 max-w-2xl">
          Choose a lesson to start your journey into Scientific Machine Learning.
          Each lesson follows our four-step pipeline: Pencil → Blocks → Code → SciML App.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/learn/${lesson.slug}`}
              className="bg-grove-panel rounded-xl p-6 hover:bg-grove-panel/80 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-math-purple/20 rounded-lg">
                  <BookOpen className="w-6 h-6 text-math-purple" />
                </div>
                <span className="text-xs text-slate-500 uppercase tracking-wider">
                  {lesson.track}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-math-purple transition-colors">
                {lesson.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4">{lesson.subtitle}</p>
              <div className="flex items-center text-code-cyan font-medium text-sm">
                Start Lesson
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
