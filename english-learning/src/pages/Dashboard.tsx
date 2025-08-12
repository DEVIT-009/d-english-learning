import { useAppSelector } from '../hooks';

export default function Dashboard() {
  const attempts = useAppSelector((s) => s.progress.quizAttempts);

  return (
    <div style={{ padding: 16 }}>
      <h1>Dashboard</h1>
      <h2>Quiz History</h2>
      {attempts.length === 0 ? (
        <div>No quiz attempts yet.</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Quiz</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Score</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Correct</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((a) => (
              <tr key={`${a.quizId}-${a.finishedAt}`}>
                <td style={{ borderBottom: '1px solid #eee' }}>{a.quizTitle}</td>
                <td style={{ borderBottom: '1px solid #eee' }}>{a.score}%</td>
                <td style={{ borderBottom: '1px solid #eee' }}>{a.correctCount}/{a.totalQuestions}</td>
                <td style={{ borderBottom: '1px solid #eee' }}>{new Date(a.finishedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
