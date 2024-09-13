import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LandingPage from '../components/LandingPage/LandingPage';
import QuestionList from '../components/Questions/QuestionList';
import EditQuestionCommentModal from '../components/EditComment/EditComment';
import DeleteQuestionCommentModal from '../components/DeleteQuestionCommentModal/DeleteQuestionCommentModal';
import QuestionDetails from '../components/Questions/QuestionDetails';
import QuestionCreatePage from '../components/QuestionCreatePage';
import Followings from '../components/FollowingPage/FollowingPage';
import Layout from './Layout';
import ProfilePage from '../components/ProfilePage/ProfilePage';

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
        element: <EditQuestionCommentModal/>
      },
      {
        path: "questions/saved/current",
        element: <Followings />
      },
      {
        path: "users/:userId",
        element: <ProfilePage />
      },
      {
        path: "questions/:commentId/saved",
        element: <DeleteQuestionCommentModal />
      }
    ],
  },
]);
