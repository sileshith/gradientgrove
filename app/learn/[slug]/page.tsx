import { getLesson, lessons } from "@/lib/lessons";
import LessonLayout from "@/components/LessonLayout";
import Scratchpad from "@/components/Scratchpad";
import BlockBuilder from "@/components/BlockBuilder";
import CodeEditor from "@/components/CodeEditor";
import SciMLApp from "@/components/SciMLApp";
import Link from "next/link";

export function generateStaticParams() {
  return lessons.map((lesson) => ({
    slug: lesson.slug,
  }));
}

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = getLesson(params.slug);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-grove-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">Lesson not found.</p>
          <Link href="/learn" className="text-grove-accent hover:underline">
            Back to lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <LessonLayout
      title={lesson.title}
      subtitle={lesson.subtitle}
      track={lesson.track}
      scratchpad={<Scratchpad task={lesson.pencilTask} />}
      blocks={<BlockBuilder blocks={lesson.blocks} />}
      code={
        <CodeEditor
          template={lesson.codeTemplate}
          solution={lesson.codeSolution}
          tests={lesson.codeTests}
        />
      }
      sciml={
        <SciMLApp slug={lesson.slug} description={lesson.scimlDescription} />
      }
    />
  );
}
