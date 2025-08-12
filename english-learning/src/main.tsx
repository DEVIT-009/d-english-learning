import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { store } from './store/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/quizzes',
    lazy: async () => ({ Component: (await import('./pages/Quizzes')).default }),
  },
  {
    path: '/quizzes/:quizId',
    lazy: async () => ({ Component: (await import('./pages/QuizDetail')).default }),
  },
  {
    path: '/dashboard',
    lazy: async () => ({ Component: (await import('./pages/Dashboard')).default }),
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
