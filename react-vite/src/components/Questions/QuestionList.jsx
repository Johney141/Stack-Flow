import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllQuestionsThunk} from "../../redux/questions";
import {getAllTagsThunk} from "../../redux/tags";
import QuestionListItem from './QuestionListItem';
import {useNavigate} from "react-router-dom";
import QuestionCreatePage from "../QuestionCreatePage/QuestionCreatePage";
import LoginFormModal from "../LoginFormModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
// import { useNavigate } from "react-router-dom";

const QuestionList = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const questions = useSelector(state => state.questionState.allQuestions);
    const sessionUser = useSelector(state => state.session.user);
    const user = sessionUser ? sessionUser.id : null
    // const comments =  useSelector(state => state.questionState)


    const dispatch = useDispatch();
    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        const getQuestions = async () => {
            await dispatch(getAllQuestionsThunk())
            await dispatch(getAllTagsThunk())
            setIsLoaded(true);
        }

        // will move when the question file is created.
        // const getComments = async () => {
        //     await dispatch(fetchComments())
        //     setIsLoaded(true)
        // }

        // will move when the question file is created.
        // const editComment = (commentId) => {
        //     navigate(`/questions/comments/${commentId}/edit`)
        // }

        if(!isLoaded) {
            Promise.all([
                getQuestions()
            ]).then(() => setIsLoaded(true));
        }
    }, [navigate, dispatch, isLoaded])

    if(!isLoaded) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
      <div className="question-page">
        <div className="question-title">
          <h3>All Questions</h3>
          <OpenModalMenuItem
            itemText="Add a question"
            onItemClick={closeMenu}
            modalComponent={user ? <QuestionCreatePage/> : <LoginFormModal/>}
          />
        </div>
        <div className="question-list">
          {questions.map((question_obj, idx)=>{
            return (<QuestionListItem key={idx} question={{question_obj}}/>)
          })}
        </div>
      </div>


    )
}

export default QuestionList
