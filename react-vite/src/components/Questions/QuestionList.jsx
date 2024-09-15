import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllQuestionsThunk} from "../../redux/questions";
import {getAllTagsThunk} from "../../redux/tags";
import QuestionListItem from './QuestionListItem';
import {useNavigate} from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const QuestionList = () => {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const questions = useSelector(state => state.questionState.allQuestions)
    // const comments =  useSelector(state => state.questionState)


    const dispatch = useDispatch();

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
    console.log("all questions: ", questions)
    return (
        <div className="question-list">
            {questions.map((question_obj)=>{
                return (<QuestionListItem key={question_obj.id} question={{question_obj}}/>)
            })}

        </div>

    )
}

export default QuestionList
