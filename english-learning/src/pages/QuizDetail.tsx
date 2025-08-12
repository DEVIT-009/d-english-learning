import { useParams } from 'react-router-dom';
import quizzesData from '../data/quizzes.json';
import type { Quiz } from '../types/quiz';
import QuizEngine from '../components/QuizEngine';

export default function QuizDetail() {
  const { quizId } = useParams<{ quizId: string }>();
  const quiz = (quizzesData as unknown as Quiz[]).find((q) => q.id === quizId);

  if (!quiz) {
    return <div>Quiz not found.</div>;
  }

  return (
    <div style={{ padding: 16 }}>
      <QuizEngine quiz={quiz} />
    </div>
  );
}
