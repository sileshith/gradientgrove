import { getLesson } from "@/lib/lessons";
import LessonLayout from "@/components/LessonLayout";
import Scratchpad from "@/components/Scratchpad";
import CodeEditor from "@/components/CodeEditor";
import SciMLApp from "@/components/SciMLApp";

export default function LessonView({ slug }: { slug: string }) {
  const lesson = getLesson(slug);
  if (!lesson) {
    return (
      <div className="min-h-screen bg-grove-dark flex items-center justify-center text-slate-500">
        Lesson not found
      </div>
    );
  }

  return (
    <LessonLayout
      title={lesson.title}
      subtitle={lesson.subtitle}
      track={lesson.track}
      scratchpad={<Scratchpad task={lesson.pencilTask} />}
      code={
        <CodeEditor
          template={lesson.codeTemplate}
          solution={lesson.codeSolution}
          tests={lesson.codeTests}
        />
      }
      sciml={<SciMLApp slug={lesson.slug} description={lesson.scimlDescription} />}
    />
  );
}
