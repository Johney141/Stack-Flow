import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LandingPage from '../components/LandingPage/LandingPage';
import QuestionList from '../components/Questions/QuestionList';
import EditCommentForm from '../components/EditComment/EditComment';
import QuestionDetails from '../components/Questions/QuestionDetails';
import QuestionCreatePage from '../components/QuestionCreatePage';
import Followings from '../components/FollowingPage/FollowingPage';
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
        path: "questions/ask",
        element: <QuestionCreatePage />
      },
      {
        path: "questions/:id",
        element: <QuestionDetails />
      },
      {
        path: "questions/comments/current",
        element: <QuestionList />
      },
      {
        path: "questions/comments/:commentId/edit",
        element: <EditCommentForm />
      },
      {
        path: "questions/saved/current",
        element: <Followings />
      }
    ],
  },
]);
