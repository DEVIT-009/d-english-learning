import React, { useEffect, useMemo, useState } from 'react';
import type { Quiz, QuizQuestion } from '../types/quiz';
import { useAppDispatch } from '../hooks';
import { addQuizAttempt } from '../features/progressSlice';

export type QuizEngineProps = {
  quiz: Quiz;
};

type UserAnswerMap = Record<string, unknown>;

type QuestionResult = {
  correct: boolean;
  explanation?: string;
};

function evaluateQuestion(question: QuizQuestion, value: unknown): QuestionResult {
  switch (question.type) {
    case 'multiple_choice': {
      const idx = typeof value === 'number' ? value : -1;
      const correct = idx === question.answerIndex;
      return { correct, explanation: question.explanation };
    }
    case 'fill_blank': {
      const text = String(value ?? '').trim().toLowerCase();
      const correct = text === question.answerText.trim().toLowerCase();
      return { correct, explanation: question.explanation };
    }
    case 'listening': {
      const text = String(value ?? '').trim().toLowerCase();
      const correct = text === question.answerText.trim().toLowerCase();
      return { correct, explanation: question.explanation };
    }
    default:
      return { correct: false };
  }
}

export const QuizEngine: React.FC<QuizEngineProps> = ({ quiz }) => {
  const dispatch = useAppDispatch();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswerMap>({});
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});
  const [startedAt] = useState<string>(new Date().toISOString());
  const currentQuestion = quiz.questions[currentIdx];

  const results = useMemo(() => {
    return quiz.questions.map((q) => evaluateQuestion(q, userAnswers[q.id]));
  }, [quiz.questions, userAnswers]);

  const correctCount = results.filter((r) => r.correct).length;
  const score = Math.round((correctCount / quiz.questions.length) * 100);

  useEffect(() => {
    setShowFeedback({});
  }, [quiz.id]);

  const handleAnswer = (questionId: string, value: unknown) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleCheck = () => {
    setShowFeedback((prev) => ({ ...prev, [currentQuestion.id]: true }));
  };

  const handleNext = () => {
    setCurrentIdx((i) => Math.min(i + 1, quiz.questions.length - 1));
  };

  const handlePrev = () => {
    setCurrentIdx((i) => Math.max(i - 1, 0));
  };

  const handleFinish = () => {
    const finishedAt = new Date().toISOString();
    dispatch(
      addQuizAttempt({
        quizId: quiz.id,
        quizTitle: quiz.title,
        totalQuestions: quiz.questions.length,
        correctCount,
        score,
        startedAt,
        finishedAt,
        answers: quiz.questions.map((q, idx) => ({
          questionId: q.id,
          userAnswer: userAnswers[q.id],
          correct: results[idx].correct,
        })),
      })
    );
    alert(`Score: ${score}% (${correctCount}/${quiz.questions.length})`);
  };

  const renderQuestion = (question: QuizQuestion) => {
    const feedbackVisible = showFeedback[question.id];

    if (question.type === 'multiple_choice') {
      const selected = (userAnswers[question.id] as number | undefined) ?? -1;
      return (
        <div>
          <p>{question.prompt}</p>
          <ul>
            {question.choices.map((choice, idx) => (
              <li key={idx}>
                <label style={{ display: 'block', marginBottom: 4 }}>
                  <input
                    type="radio"
                    name={question.id}
                    checked={selected === idx}
                    onChange={() => handleAnswer(question.id, idx)}
                  />
                  <span style={{ marginLeft: 8 }}>{choice}</span>
                </label>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 8 }}>
            <button onClick={handleCheck}>Check</button>
          </div>
          {feedbackVisible && (
            <div style={{ marginTop: 8 }}>
              {results[currentIdx].correct ? (
                <div style={{ color: 'green' }}>Correct!</div>
              ) : (
                <div style={{ color: 'red' }}>Incorrect.</div>
              )}
              {question.explanation && <div>{question.explanation}</div>}
            </div>
          )}
        </div>
      );
    }

    if (question.type === 'fill_blank') {
      const val = (userAnswers[question.id] as string | undefined) ?? '';
      return (
        <div>
          <p>{question.prompt}</p>
          <input
            type="text"
            value={val}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
          />
          <div style={{ marginTop: 8 }}>
            <button onClick={handleCheck}>Check</button>
          </div>
          {feedbackVisible && (
            <div style={{ marginTop: 8 }}>
              {results[currentIdx].correct ? (
                <div style={{ color: 'green' }}>Correct!</div>
              ) : (
                <div style={{ color: 'red' }}>Incorrect.</div>
              )}
              {question.explanation && <div>{question.explanation}</div>}
            </div>
          )}
        </div>
      );
    }

    if (question.type === 'listening') {
      const val = (userAnswers[question.id] as string | undefined) ?? '';
      return (
        <div>
          <p>{question.prompt}</p>
          <audio controls src={question.audioUrl} />
          {question.transcript && (
            <details style={{ marginTop: 8 }}>
              <summary>Show transcript</summary>
              <div>{question.transcript}</div>
            </details>
          )}
          <input
            type="text"
            value={val}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
          />
          <div style={{ marginTop: 8 }}>
            <button onClick={handleCheck}>Check</button>
          </div>
          {feedbackVisible && (
            <div style={{ marginTop: 8 }}>
              {results[currentIdx].correct ? (
                <div style={{ color: 'green' }}>Correct!</div>
              ) : (
                <div style={{ color: 'red' }}>Incorrect.</div>
              )}
              {question.explanation && <div>{question.explanation}</div>}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <h2>{quiz.title}</h2>
      <div style={{ marginBottom: 12 }}>
        Question {currentIdx + 1} of {quiz.questions.length}
      </div>
      <div>{renderQuestion(currentQuestion)}</div>
      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <button onClick={handlePrev} disabled={currentIdx === 0}>
          Previous
        </button>
        {currentIdx < quiz.questions.length - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleFinish}>Finish</button>
        )}
      </div>
    </div>
  );
};

export default QuizEngine;
