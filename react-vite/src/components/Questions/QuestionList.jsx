import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { getAllQuestionsThunk } from "../../redux/questions";
import QuestionListItem from './QuestionListItem';

const QuestionList = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const questions = useSelector(state => state.questionState.allQuestions)
    const dispatch = useDispatch();

    useEffect(() => {
        const getQuestions = async () => {
            await dispatch(getAllQuestionsThunk())
            setIsLoaded(true);
        }

        if(!isLoaded) {
            getQuestions()

        }
    }, [isLoaded, dispatch])

    if(!isLoaded) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <div className="question-list">
            {questions.map((question_obj, idx)=>{
                return (<QuestionListItem key={idx} question={{question_obj}}/>)
            })}
        </div>

    )
}

export default QuestionList
