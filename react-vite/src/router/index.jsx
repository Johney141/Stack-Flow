import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LandingPage from '../components/LandingPage/LandingPage';
import QuestionList from '../components/Questions/QuestionList';
import EditCommentForm from '../components/EditComment/EditComment';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "questions",
        element: <QuestionList />
      },
      {
        path: "questions/comments/current",
        element: <QuestionList />
      },
      {
        path: "questions/comments/:commentId/edit",
        element: <EditCommentForm />
      }
    ],
  },
]);
