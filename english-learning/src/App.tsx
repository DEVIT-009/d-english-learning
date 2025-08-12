import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div style={{ padding: 16 }}>
      <h1>English Learning</h1>
      <nav style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <Link to="/">Home</Link>
        <Link to="/quizzes">Quizzes</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <p>Welcome! Choose Quizzes to get started.</p>
    </div>
  );
}

export default App;
