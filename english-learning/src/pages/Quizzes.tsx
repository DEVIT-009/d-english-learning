import { useMemo, useState } from 'react';
import quizzesData from '../data/quizzes.json';
import type { Quiz } from '../types/quiz';
import { Link } from 'react-router-dom';

export default function Quizzes() {
  const [query, setQuery] = useState('');
  const quizzes = quizzesData as unknown as Quiz[];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return quizzes;
    return quizzes.filter((z) =>
      [z.title, z.category ?? ''].some((t) => t.toLowerCase().includes(q))
    );
  }, [quizzes, query]);

  return (
    <div style={{ padding: 16 }}>
      <h1>Quizzes</h1>
      <input
        type="text"
        placeholder="Search quizzes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: 12 }}
      />
      <ul>
        {filtered.map((q) => (
          <li key={q.id} style={{ marginBottom: 8 }}>
            <Link to={`/quizzes/${q.id}`}>{q.title}</Link>
            {q.category && <span style={{ marginLeft: 8, opacity: 0.7 }}>({q.category})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
