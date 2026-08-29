import Link from "next/link";
import { ArrowRight, Apple, BookOpen, Code2 } from "lucide-react";
import { getLessons } from "@/lib/lessons";
import SiteNav from "@/components/SiteNav";

const icons = [BookOpen, Code2, Apple];

export default function LearnPage() {
  const lessons = getLessons();

  return (
    <div className="min-h-screen bg-grove-dark">
      <SiteNav note="Fruit Vision" />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">
          Fruit Vision Lessons
        </h1>
        <p className="text-slate-400 mb-8">
          Learn how computers recognize fruit, from pixels to classification.
          Start with Lesson 1.
        </p>
        <div className="space-y-4">
          {lessons.map((lesson, i) => {
            const Icon = icons[i] ?? BookOpen;
            return (
              <Link
                key={lesson.slug}
                href={`/learn/${lesson.slug}`}
                className="block bg-grove-panel p-5 rounded-xl border border-grove-border hover:border-math-purple/50 group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-sciml-green" />
                      <span className="text-xs uppercase tracking-wider text-slate-500">
                        Lesson {i + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-math-purple">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">{lesson.subtitle}</p>
                    <p className="text-xs text-slate-500 mt-3">{lesson.scimlApp}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-math-purple mt-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
