import { useParams } from "react-router-dom";

export default function LessonDetail() {
  const { lessonId } = useParams();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Lesson Detail</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-300">
        Lesson ID: {lessonId}
      </p>
    </div>
  );
}
